import * as Ansi from './Ansi';
import * as Ascii from './Ascii';

const  PREFIX = '$ ';

export default class Shell {
  constructor() {
    this.input = '';
    this.cursor = 0;
    this.write = (data) => {};
  }

  onWrite(closure) {
    this.write = closure;
  }

  renderLine() {
    this.write(Ansi.cursorSavePosition);
    this.write(Ansi.eraseLine);
    this.write(Ascii.CR);
    this.write(PREFIX);
    this.write(this.input);
    this.write(Ansi.cursorRestorePosition);
  }

  handleData(data) {
    switch (data) {
      case Ascii.CR:
        this.write("\r\ncommand not found: " + this.input + "\r\n");
        this.input = "";
        this.cursor = 0;
        this.write(PREFIX);
        break;

      case Ascii.ETX:
        this.write('^C\n');
        this.write(Ascii.CR);
        this.cursor = 0;
        this.input = '';
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
}
