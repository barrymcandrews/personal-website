const ESC = '\u001B[';
const OSC = '\u001B]';
const SEP = ';';
const BEL = '\u0007';

export const CURSOR_UP = ESC + 'A';
export const CURSOR_DOWN = ESC + 'B';
export const CURSOR_FORWARD = ESC + 'C';
export const CURSOR_BACKWARDS = ESC + 'D';

export let cursorUp = (count = 1) => ESC + count + 'A';
export let cursorDown = (count = 1) => ESC + count + 'B';
export let cursorForward = (count = 1) => ESC + count + 'C';
export let cursorBackward = (count = 1) => ESC + count + 'D';

export let cursorLeft = ESC + 'G';
export let cursorSavePosition = ESC + 's';
export let cursorRestorePosition = ESC + 'u';
export let cursorGetPosition = ESC + '6n';
export let cursorNextLine = ESC + 'E';
export let cursorPrevLine = ESC + 'F';
export let cursorHide = ESC + '?25l';
export let cursorShow = ESC + '?25h';

export let eraseEndLine = ESC + 'K';
export let eraseStartLine = ESC + '1K';
export let eraseLine = ESC + '2K';

export let eraseDown = ESC + 'J';
export let eraseUp = ESC + '1J';
export let eraseScreen = ESC + '2J';
export let scrollUp = ESC + 'S';
export let scrollDown = ESC + 'T';

export let clearScreen = '\u001Bc\n';
export let clearTerminal = `${eraseScreen}${ESC}3J${ESC}H`;

export let beep = BEL;


export function cursorTo(x: any, y: any) {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  if (typeof y !== 'number') {
    return ESC + (x + 1) + 'G';
  }

  return ESC + (y + 1) + ';' + (x + 1) + 'H';
}

export function cursorMove(x: any, y: any) {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  let ret = '';

  if (x < 0) {
    ret += ESC + (-x) + 'D';
  } else if (x > 0) {
    ret += ESC + x + 'C';
  }

  if (y < 0) {
    ret += ESC + (-y) + 'A';
  } else if (y > 0) {
    ret += ESC + y + 'B';
  }

  return ret;
}

export function eraseLines(count: number) {
  let clear = '';

  for (let i = 0; i < count; i++) {
    clear += eraseLine + (i < count - 1 ? cursorUp() : '');
  }

  if (count) {
    clear += cursorLeft;
  }

  return clear;
}

export function link(url: string, text?: string) {
  if (!text) {
    text = url;
  }
  return [
    OSC,
    '8',
    SEP,
    SEP,
    url,
    BEL,
    text,
    OSC,
    '8',
    SEP,
    SEP,
    BEL
  ].join('');
}
