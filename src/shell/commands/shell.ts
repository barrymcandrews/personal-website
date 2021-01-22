import * as Ansi from '../Ansi';
import * as Ascii from '../Ascii';
import {commands} from "./index";
import {createProcess, IO, Process} from '../proc';

const PREFIX = '$ ';

export default async function sh(args: string[], io: IO): Promise<number> {
  let prefix: string = PREFIX;
  let cursor: number = 0;
  let history: string[] = [''];
  let historyIndex: number = 0;
  let stdin = io.proc.stdin;
  let subprocess: Process | undefined;
  let shouldExit = false;

  // Prints non-user-editable output
  function out(data: string): void {
    io.out(data);
    prefix += data.split('\n').pop();
  }

  function renderLine(line?: string) {
    io.out(Ansi.cursorSavePosition);
    io.out(Ansi.eraseLine);
    io.out(Ascii.CR);
    io.out(prefix + (line || history[0]));
    io.out(Ansi.cursorRestorePosition);
  }

  function handleData(data: string) {
    switch (data) {
      case Ascii.CR:
        if (historyIndex !== 0) {
          history[0] = history[historyIndex];
          historyIndex = 0;
        }
        let line = history[0];
        if (history[0] !== '') {
          history.unshift('');
        }
        prefix = '';
        cursor = 0;
        io.out(Ascii.CR + Ascii.LF);
        interpretLine(line);
        break;

      // Control-C
      case Ascii.ETX:
        if (!subprocess) {
          io.out('^C');
          io.out(Ascii.CR + Ascii.LF);
          cursor = 0;
          if (history[0] !== '') {
            history.unshift('');
          }
          io.env.put('?', '130');
          io.out(PREFIX);
        }
        break;

      // Control-D
      case Ascii.EOT:
        if (!subprocess) {
          io.out('^D');
          io.out(Ascii.CR + Ascii.LF);
          cursor = 0;
          if (history[0] !== '') {
            history.unshift('');
          }
          io.env.put('?', '130');
          io.out(PREFIX);
        }
        break;

      // Control-A
      case Ascii.SOH:
        cursor = 0;
        io.out(Ascii.CR);
        io.out(Ansi.cursorForward(PREFIX.length));
        break;

      // Control-E
      case Ascii.ENQ:
        cursor = history[historyIndex].length;
        io.out(Ascii.CR);
        io.out(Ansi.cursorForward(history[historyIndex].length + PREFIX.length));
        break;

      // Tab
      case Ascii.HT:
        break;

      // Backspace
      case Ascii.DEL:
      case Ascii.BS:
        if (historyIndex !== 0) {
          history[0] = history[historyIndex];
          historyIndex = 0;
        }
        if (cursor > 0) {
          cursor--;
          history[0] = history[0].substr(0, cursor) + history[0].substr(cursor + 1);
          io.out('\b');
          renderLine();
        } else {
          io.out(Ascii.BEL);
        }
        break;

      case Ascii.ACK:
      case Ansi.CURSOR_FORWARD:
        if (cursor < history[historyIndex].length) {
          cursor += 1;
          io.out(Ansi.CURSOR_FORWARD);
        } else {
          io.out(Ascii.BEL);
        }
        break;

      case Ascii.STX:
      case Ansi.CURSOR_BACKWARDS:
        if (cursor > 0) {
          cursor -= 1;
          io.out(Ansi.CURSOR_BACKWARDS);
        } else {
          io.out(Ascii.BEL);
        }
        break;

      case Ansi.CURSOR_UP:
        if (historyIndex === history.length - 1) {
          io.out(Ascii.BEL);
        }
        historyIndex = Math.min(history.length - 1, historyIndex + 1);
        renderLine(history[historyIndex]);
        io.out(Ascii.CR);
        io.out(Ansi.cursorForward(history[historyIndex].length + PREFIX.length));
        cursor = history[historyIndex].length;
        break;

      case Ansi.CURSOR_DOWN:
        if (historyIndex === 0) {
          io.out(Ascii.BEL);
        }
        historyIndex = Math.max(0, historyIndex - 1);
        renderLine(history[historyIndex]);
        io.out(Ascii.CR);
        io.out(Ansi.cursorForward(history[historyIndex].length + PREFIX.length));
        cursor = history[historyIndex].length;
        break;

      default:
        if (historyIndex !== 0) {
          history[0] = history[historyIndex];
          historyIndex = 0;
        }
        history[0] = history[0].substr(0, cursor) + data + history[0].substr(cursor);
        cursor++;
        io.out(Ansi.CURSOR_FORWARD);
        renderLine();
    }
  }

  function interpretLine(line: string) {
    if (subprocess) {
      subprocess.stdin.write(line);
      return;
    }

    // Substitute variables in line
    line = io.env.substitute(line);

    // Handle Environment Variables
    if (/^(\w)+=/.test(line)) {
      let separator = line.indexOf('=');
      io.env.put(line.substring(0, separator), line.substring(separator + 1));
      out(PREFIX);
      return;
    }

    // Split by space, ignoring spaces in quotes
    let args = (line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [''])
      .map(v => (/^(".*")|('.*')$/.test(v)) ? v.slice(1, -1) : v);

    let command = args[0];
    if (command in commands) {

      try {
        let proc = createProcess(commands[command], io.env);
        proc.stdout.onWrite(out);
        proc.stderr.onWrite(out);
        proc.start(args);
        subprocess = proc;
        proc.wait().then((returnCode) => {
          subprocess = undefined;
          io.proc.stdin = stdin;
          io.env.put('?', returnCode.toString());
          out(PREFIX);
        });
      } catch (e) {
        if (process.env.NODE_ENV === 'production') {
          io.out("sh: An unknown error occurred\n");
        } else {
          throw e;
        }
      }

    } else if (command !== '') {
      io.out("command not found: " + command + "\r\n");
      io.env.put('?', '127');
      out(PREFIX);
    } else {
      out(PREFIX);
    }
  }

  while (!shouldExit) {
    handleData(await io.in());
  }

  return 0;
}
