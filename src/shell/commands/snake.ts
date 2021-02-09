import {IO} from '../proc';
import * as Ansi from '../Ansi';
import * as Ascii from '../Ascii';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

type Pair = [number, number];

const SNAKE_COLOR = '\u001b[32;1m';
const FOOD_COLOR = '\u001b[31m';


export default async function snake(args: string[], io: IO) {

  let direction = Direction.RIGHT;
  let nextDirection = Direction.RIGHT;
  let body: Pair[] = [[3, 2], [2, 2], [1, 2]];
  let food: Pair = [0, 0];
  let cols = parseInt(io.env.get("COLS"));
  let rows = parseInt(io.env.get("ROWS"));
  let cancelled = false;

  function getScore() {
    return (body.length - 3) * 16;
  }

  async function placeFood() {
    function random(): Pair {
      return [
        Math.floor(Math.random() * (cols - 2) + 1),
        Math.floor(Math.random() * (rows - 3) + 1)
      ]
    }
    while (await pairInList(food = random(), body));
    io.out(Ansi.cursorTo(food[0], food[1]));
    io.out(FOOD_COLOR);
    io.out(Ansi.bold);
    io.out('$');
  }

  async function newHead(oldHead: Pair): Promise<Pair> {
    direction = nextDirection;
    let m: { [key: number]: Pair } = {
      [Direction.UP]: [oldHead[0], oldHead[1] - 1],
      [Direction.DOWN]: [oldHead[0], oldHead[1] + 1],
      [Direction.LEFT]: [oldHead[0] - 1, oldHead[1]],
      [Direction.RIGHT]: [oldHead[0] + 1, oldHead[1]],
    }
    return m[direction];
  }

  async function pairInList(pair: Pair, list: Pair[]) {
    for (let p of list) {
      if (p[0] === pair[0] && p[1] === pair[1]) {
        return true;
      }
    }
    return false;
  }

  function padText(text: any, maxWidth: number, ch = ' ') {
    let len = text.toString().length;
    return text + ch.repeat(Math.max(maxWidth - len, 0));
  }

  async function updateHighScore() {
    let score = getScore();
    let data = JSON.parse((io.fs.get('/etc/snake') || '{}') as string);
    let lastScore = data['highscore'] || score;
    let highscore = Math.max(parseInt(lastScore), score);
    io.fs.put('/etc/snake', JSON.stringify({
      highscore: highscore
    }));
    return highscore;
  }

  async function printBoundary() {
    // Top Line
    io.out(Ansi.cursorTo(0, 0));
    io.out("▒".repeat(cols - 1));

    // Bottom Line
    io.out(Ansi.cursorTo(0, rows - 2));
    io.out("▒".repeat(cols - 1 ));

    // Left & Right Lines
    for (let y = 0; y < rows - 1; y++) {
      io.out(Ansi.cursorTo(0, y));
      io.out("▒");
      io.out(Ansi.cursorTo(cols - 1, y));
      io.out("▒");
    }
  }

  async function printScore(causeOfDeath: string) {
    let highscore = await updateHighScore();
    let width = Math.max(
      body.length.toString().length,
      highscore.toString().length,
      causeOfDeath.length,
    ) + 3;
    io.out(Ansi.normalScreen);
    io.out(`┌─ You Died! ───────${padText('─', width, '─')}┐\n`);
    io.out(`│                   ${padText(' ', width)}│\n`);
    io.out(`│       Your Score: ${padText(getScore(), width)}│\n`);
    io.out(`│       High Score: ${padText(highscore, width)}│\n`);
    io.out(`│   Cause of Death: ${padText(causeOfDeath, width)}│\n`);
    io.out(`│                   ${padText(' ', width)}│\n`);
    io.out(`└───────────────────${padText('─', width, '─')}┘\n`);

    // io.out(Ansi.italic + Ansi.faint);
    // io.out(`✨  Even when you make all the right choices,\n     things can still go wrong ✨\n`);
    // io.out(Ansi.reset);

    io.out(`\n`);
  }


  async function addKeyHandlers() {
    let up = () => {if (direction !== Direction.DOWN) nextDirection = Direction.UP};
    let down = () => {if (direction !== Direction.UP) nextDirection = Direction.DOWN};
    let left = () => {if (direction !== Direction.RIGHT) nextDirection = Direction.LEFT};
    let right = () => {if (direction !== Direction.LEFT) nextDirection = Direction.RIGHT}
    let exit = () => {cancelled = true};

    let handler: {[key: string]: () => void} = {
      'w': up,
      [Ansi.CURSOR_UP]: up,
      's': down,
      [Ansi.CURSOR_DOWN]: down,
      'a': left,
      [Ansi.CURSOR_BACKWARDS]: left,
      'd': right,
      [Ansi.CURSOR_FORWARD]: right,
      [Ascii.ETX]: exit,
      [Ascii.EOT]: exit,
      'default': () => {},
    }

    io.proc.stdin.onWrite((data) => {
      (handler[data] || handler['default'])();
    });
  }


  // Setup
  io.out(Ansi.alternateScreen);
  io.out(Ansi.cursorHide);
  await printBoundary();
  await placeFood();
  await addKeyHandlers();

  // Main Loop
  while (true) {
    let head = await newHead(body[0]);

    let hitWall = head[0] > cols - 2 || head[0] < 1 || head[1] > rows - 3 || head[1] < 1;
    let ateYourself = await pairInList(head, body);

    if (hitWall || ateYourself || cancelled) {
      let causeOfDeath = (hitWall && 'Wall') || (ateYourself && 'Cannibalism') || 'Suicide';
      await printScore(causeOfDeath);
      return 0;
    }

    body.unshift(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      await placeFood();
    } else {
      let tail = body.pop()!;
      io.out(Ansi.cursorTo(tail[0], tail[1]));
      io.out(' ');
    }

    io.out(Ansi.cursorHide);
    io.out(SNAKE_COLOR);
    io.out(Ansi.bold);
    io.out(Ansi.cursorTo(head[0], head[1]));
    io.out('@');
    io.out(Ansi.cursorTo(body[1][0], body[1][1]));
    io.out('o');

    io.out(Ansi.cursorTo(0, rows));
    io.out(Ansi.reset);
    io.out(`▒  `);
    io.out(Ansi.bold);
    io.out(`Score: ${getScore()}          `);

    io.out(Ansi.cursorTo(cols, rows));
    io.out(Ansi.cursorHide);

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
