const ESC = '\u001B';
const CSI = ESC + '[';
const OSC = '\u001B]';
const SEP = ';';
const BEL = '\u0007';

export const CURSOR_UP = CSI + 'A';
export const CURSOR_DOWN = CSI + 'B';
export const CURSOR_FORWARD = CSI + 'C';
export const CURSOR_BACKWARDS = CSI + 'D';

export let cursorUp = (count = 1) => CSI + count + 'A';
export let cursorDown = (count = 1) => CSI + count + 'B';
export let cursorForward = (count = 1) => CSI + count + 'C';
export let cursorBackward = (count = 1) => CSI + count + 'D';

export let cursorLeft = CSI + 'G';
export let cursorSavePosition = CSI + 's';
export let cursorRestorePosition = CSI + 'u';
export let cursorGetPosition = CSI + '6n';
export let cursorNextLine = CSI + 'E';
export let cursorPrevLine = CSI + 'F';
export let cursorHide = CSI + '?25l';
export let cursorShow = CSI + '?25h';

export let eraseEndLine = CSI + 'K';
export let eraseStartLine = CSI + '1K';
export let eraseLine = CSI + '2K';

export let eraseDown = CSI + 'J';
export let eraseUp = CSI + '1J';
export let eraseScreen = CSI + '2J';
export let scrollUp = CSI + 'S';
export let scrollDown = CSI + 'T';

export let clearScreen = '\u001Bc\n';
export let clearTerminal = `${eraseScreen}${CSI}3J${CSI}H`;

export let beep = BEL;

export let alternateScreen = CSI + '?1049h';
export let normalScreen = CSI + '?1049l';


export function cursorTo(x: any, y: any) {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  if (typeof y !== 'number') {
    return CSI + (x + 1) + 'G';
  }

  return CSI + (y + 1) + ';' + (x + 1) + 'H';
}

export function cursorMove(x: any, y: any) {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  let ret = '';

  if (x < 0) {
    ret += CSI + (-x) + 'D';
  } else if (x > 0) {
    ret += CSI + x + 'C';
  }

  if (y < 0) {
    ret += CSI + (-y) + 'A';
  } else if (y > 0) {
    ret += CSI + y + 'B';
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
