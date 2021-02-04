import {IO} from '../proc';
import * as Ansi from '../Ansi';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

type Pair = [number, number];


export default async function snake(args: string[], io: IO) {

  async function placeFood() {
    function random(): Pair {
      return [
        Math.floor(Math.random() * (cols - 2) + 1),
        Math.floor(Math.random() * (rows - 3) + 1)
      ]
    }
    while (await pairInList(food = random(), body));
    io.out(Ansi.cursorTo(food[0], food[1]));
    io.out('\u001b[31m');
    io.out('\u001b[1m');
    io.out('$');
  }

  async function newHead(oldHead: Pair): Promise<Pair> {
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

  let direction = Direction.RIGHT;
  let body: Pair[] = [[3, 2], [2, 2], [1, 2]];
  let food: Pair = [0, 0];


  io.out(Ansi.alternateScreen);
  io.out('\u001B[?25l');

  let cols = parseInt(io.env.get("COLS"));
  let rows = parseInt(io.env.get("ROWS"));

  // Top Line
  io.out(Ansi.cursorTo(0, 0));
  io.out("▒".repeat(cols - 1));

  // Bottom Line
  io.out(Ansi.cursorTo(0, rows - 2));
  io.out("▒".repeat(cols - 1 ));

  for (let y = 0; y < rows - 1; y++) {
    io.out(Ansi.cursorTo(0, y));
    io.out("▒");
    io.out(Ansi.cursorTo(cols - 1, y));
    io.out("▒");
  }

  await placeFood();

  let up = () => {if (direction !== Direction.DOWN) direction = Direction.UP};
  let down = () => {if (direction !== Direction.UP) direction = Direction.DOWN};
  let left = () => {if (direction !== Direction.RIGHT) direction = Direction.LEFT};
  let right = () => {if (direction !== Direction.LEFT) direction = Direction.RIGHT}

  let handler: {[key: string]: () => void} = {
    'w': up,
    [Ansi.CURSOR_UP]: up,
    's': down,
    [Ansi.CURSOR_DOWN]: down,
    'a': left,
    [Ansi.CURSOR_BACKWARDS]: left,
    'd': right,
    [Ansi.CURSOR_FORWARD]: right,
    'default': () => {},
  }

  io.proc.stdin.onWrite((data) => {
    (handler[data] || handler['default'])();
  });

  while (true) {
    let head = await newHead(body[0]);

    let hitWall = head[0] > cols - 2 || head[0] < 1 || head[1] > rows - 3 || head[1] < 1;
    let ateYourself = await pairInList(head, body);
    if (hitWall || ateYourself) {
      io.out(Ansi.normalScreen);
      io.out("You died.\n");
      io.out(`Score: ${body.length}\n`);
      return 0;
    } else {
      body.unshift(head);
    }

    if (head[0] === food[0] && head[1] === food[1]) {
      await placeFood();
    } else {
      let tail = body.pop()!;
      io.out(Ansi.cursorTo(tail[0], tail[1]));
      io.out(' ');
    }

    io.out(Ansi.cursorHide);

    io.out('\u001b[32;1m');
    io.out('\u001b[1m');
    io.out(Ansi.cursorTo(head[0], head[1]));
    io.out('@');
    io.out(Ansi.cursorTo(body[1][0], body[1][1]));
    io.out('o');

    io.out('\u001b[37;1m');
    io.out(Ansi.cursorTo(0, rows));
    io.out(`Score: ${body.length}          `);

    io.out(Ansi.cursorTo(cols, rows));
    io.out(Ansi.cursorHide);


    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
