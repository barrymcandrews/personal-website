import * as Ansi from './Ansi';
import * as Ascii from './Ascii';
import {commands} from "./commands";
import {Environment} from './environment';

const PREFIX = '$ ';

type Writer = (data: string) => any;

export default class Shell {
  prefix: string = PREFIX;
  input: string = '';
  cursor: number = 0;
  write: Writer = (data: string) => {};
  hasProcess = false;
  env = new Environment();

  onWrite(closure: Writer) {
    this.write = closure;
  }

  out(data: string): void {
    this.write(data);
    this.prefix += data.split('\n').pop();
  }

  handleString(str: string) {
    str.split('').forEach(c => this.handleData(c));
  }

  renderLine() {
    this.write(Ansi.cursorSavePosition);
    this.write(Ansi.eraseLine);
    this.write(Ascii.CR);
    this.write(this.prefix + this.input);
    this.write(Ansi.cursorRestorePosition);
  }

  handleData(data: string) {
    switch (data) {
      case Ascii.CR:
        let line = this.input;
        this.input = '';
        this.prefix = '';
        this.cursor = 0;
        this.write(Ascii.CR + Ascii.LF);
        this.interpretLine(line);
        break;

      case Ascii.ETX:
        this.write('^C\n');
        this.write(Ascii.CR);
        this.cursor = 0;
        this.input = '';
        this.env.put('?', '130');
        this.write(PREFIX);
        break;

      case Ascii.DEL:
      case Ascii.BS:
        if (this.cursor > 0) {
          this.cursor--;
          this.input = this.input.substr(0, this.cursor) + this.input.substr(this.cursor + 1);
          this.write('\b');
          this.renderLine();
        } else {
          this.write(Ascii.BEL);
        }
        break;

      case Ansi.CURSOR_FORWARD:
        if (this.cursor < this.input.length) {
          this.cursor += 1;
          this.write(data);
        } else {
          this.write(Ascii.BEL);
        }
        break;

      case Ansi.CURSOR_BACKWARDS:
        if (this.cursor > 0) {
          this.cursor -= 1;
          this.write(data);
        } else {
          this.write(Ascii.BEL);
        }
        break;

      case Ansi.CURSOR_UP:
      case Ansi.CURSOR_DOWN:
        break;

      default:
        this.input = this.input.substr(0, this.cursor) + data + this.input.substr(this.cursor);
        this.cursor++;
        this.write(Ansi.CURSOR_FORWARD);
        this.renderLine();
    }
  }

  async read(): Promise<string> {
    return new Promise((resolve => {
      document.addEventListener("shell-return", function(event) {
        console.log("resolving!")
        resolve((event as CustomEvent).detail);
      },{once : true});
    }))
  }

  interpretLine(line: string) {
    if (this.hasProcess) {
      document.dispatchEvent(new CustomEvent('shell-return', {
        detail: line
      }));
      return;
    }

    // Substitute variables in line
    line = this.env.substitute(line);

    // Handle Environment Variables
    if (/^(\w)+=/.test(line)) {
      let separator = line.indexOf('=');
      this.env.put(line.substring(0, separator), line.substring(separator + 1));
      this.out(PREFIX);
      return;
    }

    // Split by space, ignoring spaces in quotes
    let args = (line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [''])
      .map(v => (/^(".*")|('.*')$/.test(v)) ? v.slice(1, -1) : v);

    let command = args[0];
    if (command in commands) {
      let shell: Shell = this;

      try {
        shell.hasProcess = true;
        commands[command](args, {
          out: (d) => this.out(d),
          in: this.read,
          err: (d) => this.out(d),
        }).then((returnCode) => {
          shell.hasProcess = false;
          this.env.put('?', returnCode.toString());
          this.out(PREFIX);
        });
      } catch (e) {
        if (process.env.NODE_ENV === 'production') {
          this.write("sh: An unknown error occurred\n");
        } else {
          throw e;
        }
      }

    } else if (command !== '') {
      this.write("command not found: " + command + "\r\n");
      this.env.put('?', '127');
      this.out(PREFIX);
    } else {
      this.out(PREFIX);
    }
  }
}
