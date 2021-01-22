import {getAbsolutePath} from './helpers';
import {IO} from '../proc';

export async function ed(args: string[], io: IO): Promise<number> {
  let buffer = '';
  let file: string | undefined;

  function validateFilename(filename?: string): string | undefined {
    if (!filename) return undefined;

    let target = getAbsolutePath(filename, io.env);
    let targetFolder = target.substring(0, target.lastIndexOf('/'));
    if (!io.fs.isDir(targetFolder)) return undefined;
    return target;
  }

  async function append() {
    for (let i; (i = await io.in()) !== '.';) {
      if (buffer.length !== 0) {
        buffer += '\n';
      }
      buffer += i;
    }
  }

  async function printLast() {
    let lines = buffer.split('\n');
    io.out((lines[lines.length - 1] || '') + '\n');
  }

  async function printAll() {
    io.out(buffer + '\n');
  }

  async function setFilename(params: string[]): Promise<number> {
    let target = validateFilename(params[1]);
    if (!target) {
      io.out(`?\n`);
      return 1;
    }

    file = target;
    return 0;
  }

  async function write(params: string[]) {
    if (params[1]) {
      if (await setFilename(params) !== 0) return;
    } else if (!file) {
      io.out("?\n");
      return;
    }
    io.fs.put(file!, buffer);
    io.out(buffer.length + '\n');
  }

  async function load(params: string[]): Promise<number> {
    let target = validateFilename(params[1]);
    if (!target || !io.fs.isFile(target)) {
      io.out(`?\n`);
      return 1;
    }

    file = target;
    buffer = io.fs.get(target).toString();
    return 0;
  }

  if (args[1]) {
    if (await load(args) === 0) {
      io.out(`${buffer.length}\n`)
    }
  }

  let input;
  while ((input = await io.in()).toLowerCase() !== 'q') {
    let params = input.split(' ');
    let cmd = params[0];
    const commands: {[key: string]: (params: string[]) => void} = {
      'a': append,
      'p': printLast,
      ',p': printAll,
      'f': setFilename,
      'w': write,
      'e': load,
      'default': async () => {io.out('?\n');}
    };
    await (commands[cmd] || commands['default'])(params);
  }
  return 0;
}
