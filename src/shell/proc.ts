import {Environment} from './environment';
import * as Process from 'process';
import {FileSystem, FS} from './system';

class Notifier {
  e = new EventTarget();
  async wait() {
    return new Promise((resolve) => {
      this.e.addEventListener('notify', resolve);
    });
  }

  async notify() {
   this.e.dispatchEvent(new Event('notify'));
  }
}

export class Pipe {
  buffer = '';
  notifier = new Notifier();
  handler = (data: string) => {};

  read = async () => {
    if (this.buffer.length === 0) {
      await this.notifier.wait();
    }
    let str = this.buffer;
    this.buffer = '';
    return str;
  }

  write = async (str: string)  => {
     this.buffer += str;
     this.handler(str);
     await this.notifier.notify();
  }

  onWrite(fn: (data: string) => void) {
    this.handler = fn;
  }
}

/**
 * Pipe that ensures bytes are received in the chunks that they are sent.
 */
export class GroupedPipe extends Pipe {
  groupedBuffer: string[] = [];
  notifier = new Notifier();
  handler = (data: string) => {};

  read = async () => {
    if (this.groupedBuffer.length === 0) {
      await this.notifier.wait();
    }
    return this.groupedBuffer.pop()!;
  }

  write = async (str: string)  => {
    this.groupedBuffer.unshift(str);
    this.handler(str);
    await this.notifier.notify();
  }

  onWrite(fn: (data: string) => void) {
    this.handler = fn;
  }
}


export interface IO {
  in: () => Promise<string>;
  out: (str: string) => void;
  err: (str: string) => void;
  env: Environment;
  fs: FS;
  proc: Process;
}

export type Executable = (args: string[], io: IO) => Promise<number>;

export interface Process {
  pid: number;
  env: Environment;
  stdin: Pipe;
  stdout: Pipe;
  stderr: Pipe;
  args?: string[];
  start(args: string[]): void;
  cancel(): void;
  wait(): Promise<number>;
}


let processes: { [key: number]: Process } = {};
let nextPid = 0;

export function init(exec: Executable) {
  let env = new Environment();
  return createProcess(exec, env);
}

export function createProcess(exec: Executable, env: Environment): Process {
  let pid = nextPid++;
  let process = new AsyncProcess(pid, exec, env);
  processes[pid] = process;
  return process;
}

export function listProcesses() {
  return Object.values(processes);
}


class AsyncProcess implements Process {
  pid: number;
  exec: Executable;
  env: Environment;
  stdin = new Pipe();
  stdout = new Pipe();
  stderr = new Pipe();
  promise?: Promise<number>;
  args?: string[];

  constructor(pid: number, exec: Executable, env: Environment) {
    this.pid = pid;
    this.exec = exec;
    this.env = env;
  }

  start(args: string[]): void {
    this.args = args;
    let io = {
      env: this.env,
      in: async () => await this.stdin.read(),
      out: async (str: string) => await this.stdout.write(str),
      err: async (str: string) => await this.stderr.write(str),
      fs: FileSystem,
      proc: this,
    }
    this.promise = this.exec(args, io);

    this.promise.then(() => {
      delete processes[this.pid];
    });
  }

  cancel(): void {
    throw Error ("Async Processes can not be cancelled.");
  }

  async wait(): Promise<number> {
    return this.promise!;
  }
}
