import * as Ansi from './Ansi';
import * as Ascii from './Ascii';
import {commands} from "./commands";
import {Environment} from './environment';

const PREFIX = '$ ';

type Writer = (data: string) => any;

export default class Shell {
  prefix: string = PREFIX;
  cursor: number = 0;
  write: Writer = (data: string) => {};
  hasProcess = false;
  history: string[] = [''];
  historyIndex: number = 0;
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

  private renderLine(line?: string) {
    this.write(Ansi.cursorSavePosition);
    this.write(Ansi.eraseLine);
    this.write(Ascii.CR);
    this.write(this.prefix + (line || this.history[0]));
    this.write(Ansi.cursorRestorePosition);
  }

  handleData(data: string) {
    switch (data) {
      case Ascii.CR:
        if (this.historyIndex !== 0) {
          this.history[0] = this.history[this.historyIndex];
          this.historyIndex = 0;
        }
        let line = this.history[0];
        this.history.unshift('');
        this.prefix = '';
        this.cursor = 0;
        this.write(Ascii.CR + Ascii.LF);
        this.interpretLine(line);
        break;

      case Ascii.ETX:
        this.write('^C\n');
        this.write(Ascii.CR);
        this.cursor = 0;
        this.history.unshift('');
        this.env.put('?', '130');
        this.write(PREFIX);
        break;

      case Ascii.DEL:
      case Ascii.BS:
        if (this.cursor > 0) {
          this.cursor--;
          this.history[0]  = this.history[0].substr(0, this.cursor) + this.history[0].substr(this.cursor + 1);
          this.write('\b');
          this.renderLine();
        } else {
          this.write(Ascii.BEL);
        }
        break;

      case Ansi.CURSOR_FORWARD:
        if (this.cursor < this.history[0].length) {
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
        if (this.historyIndex === this.history.length - 1) {
          this.write(Ascii.BEL);
        }
        this.historyIndex = Math.min(this.history.length - 1, this.historyIndex + 1);
        this.renderLine(this.history[this.historyIndex]);
        this.write(Ascii.CR);
        this.write(Ansi.cursorForward(this.history[this.historyIndex].length + PREFIX.length));
        this.cursor = this.history[this.historyIndex].length;
        break;

      case Ansi.CURSOR_DOWN:
        if (this.historyIndex === 0) {
          this.write(Ascii.BEL);
        }
        this.historyIndex = Math.max(0, this.historyIndex - 1);
        this.renderLine(this.history[this.historyIndex]);
        this.write(Ascii.CR);
        this.write(Ansi.cursorForward(this.history[this.historyIndex].length + PREFIX.length));
        this.cursor = this.history[this.historyIndex].length;
        break;

      default:
        if (this.historyIndex !== 0) {
          this.history[0] = this.history[this.historyIndex];
          this.historyIndex = 0;
        }
        this.history[0] = this.history[0].substr(0, this.cursor) + data + this.history[0].substr(this.cursor);
        this.cursor++;
        this.write(Ansi.CURSOR_FORWARD);
        this.renderLine();
    }
  }

  async read(): Promise<string> {
    return new Promise((resolve => {
      document.addEventListener("shell-return", function(event) {
        resolve((event as CustomEvent).detail);
      },{once : true});
    }))
  }

  private interpretLine(line: string) {
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
          env: this.env,
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
