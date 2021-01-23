import * as Ansi from '../Ansi';
import {FileSystem, fs} from '../system';
import history from '../../App/history';
import {columns, getAbsolutePath, basename, parseArgs} from './helpers';
import {ed} from './ed';
import {Executable, IO, listProcesses} from '../proc';
import sh from './shell';

let cwd = '/home/barry'

/*
 *  Command Functions
 */

async function help(args: string[], io: IO) {
  let cmds = Object.keys(commands).sort();
  io.out('Available commands:\n');
  io.out(await columns(cmds, io) + "\n");
  return 0;
}

async function open(args: string[], io: IO) {
  if (args.length !== 2) {
    io.out('Usage: open <url>\n');
    return 1;
  }

  if (!args[1].startsWith('http://') && !args[1].startsWith('https://')) {
    args[1] = 'http://' + args[1];
  }

  window.open(args[1], '_blank');
  return 0;
}

async function mail(args: string[], io: IO) {
  if (args.length !== 2) {
    io.out('Usage: mail <email address>\n');
    return 1;
  }

  window.open('mailto:' + args[1], '_self');
  return 0;
}

async function clear(args: string[], io: IO) {
  io.out(Ansi.clearScreen);
  return 0;
}

async function whoami(args: string[], io: IO) {
  io.out('barry\n');
  return 0;
}

async function pwd(args: string[], io: IO) {
  io.out(cwd + '\n');
  return 0;
}

async function aws(args: string[], io: IO) {
  io.out('lol you thought I implemented the AWS CLI in this shell.\n\n' +
    'The AWS CLI is wayyyy too complicated for me to recreate in this fake shell. ' +
    'I mean don\'t get me wrong. I could do it. I\'d just rather use the time to get another certification.\n\n' );
  return 0;
}

async function cd(args: string[], io: IO) {
  if (!args[1]) args[1] = '/home/barry';
  let path = getAbsolutePath(args[1], io.env);
  if (io.fs.isDir(path)) {
    cwd = path;
    io.env.put("PWD", cwd);
    return 0;
  } else {
    let message = (io.fs.isFile(args[1])) ? 'cd: not a directory: ' : 'cd: no such file or directory: ';
    io.out(message + args[1] + '\n');
    return 1;
  }
}

async function ls(args: string[], io: IO) {
  let {flags, positionalArgs} = parseArgs(args);
  let showAll = flags.includes('a');
  let showLong = flags.includes('l');

  let dir = (positionalArgs.length === 1) ? cwd : getAbsolutePath(positionalArgs[1], io.env);
  if (io.fs.exists(dir)) {
    let entries = io.fs
      .list(dir)
      .filter(x => showAll || !x.startsWith("."))
      .sort();
    if (!showLong) {
      io.out(await columns(entries, io));
    } else {
      for (let e of entries) {
        io.out(e + "\n");
      }
    }
  } else {
    io.out('ls: no such file or directory\n')
    return 1;
  }
  return 0;
}

async function mkdir(args: string[], io: IO) {
  let path = getAbsolutePath(args[1], io.env);
  if (io.fs.exists(path)) {
    io.out('mkdir: ' + args[1] + ': File exists');
    return 1;
  } else {
    path = path.replace(/\/$/, '');
    io.fs.put(path + '/__folder__', {})
    return 0;
  }
}

async function cat(args: string[], io: IO) {
  let path = getAbsolutePath(args[1], io.env);
  if (io.fs.isFile(path)) {
    io.out(io.fs.get(path) + '\n');
    return 0;
  } else {
    let msg = io.fs.exists(path) ? ': Is a directory' : ': No such file or directory';
    io.out('cat: ' + args[1] + msg + '\n');
    return 1;
  }
}

async function echo(args: string[], io: IO) {
  io.out(args.slice(1).join(' ') + '\n')
  return 0;
}

async function touch(args: string[], io: IO) {
  if (args.length < 2) {
    io.out("Usage: touch <file..>\n");
    return 1;
  }

  for (let i = 1; i < args.length; i++) {
    let path = getAbsolutePath(args[i], io.env);
    io.fs.put(path, "");
  }
  return 0;
}

async function mirror(args: string[], io: IO) {
  io.out('say something: ');
  let str = await io.in();
  io.out(str + '\n');
  return 0;
}

async function goto(args: string[], io: IO) {
  if (args.length !== 2) {
    io.out("Usage: goto <page>\n");
    return 1;
  }
  history.push(args[1]);
  return 0;
}

async function mv(args: string[], io: IO) {
  if (args.length !== 3) {
    io.out("Usage: mv <source> <target>\n");
    return 1;
  }
  let source = getAbsolutePath(args[1], io.env);
  let target = getAbsolutePath(args[2], io.env);
  let isFolder = args[2].endsWith("/");
  if (!io.fs.exists(source)) {
    io.out(`mv: rename ${args[1]} to ${args[2]}: No such file or directory\n`)
    return 1;
  }

  if (io.fs.isFile(source)) {
    let targetFolder = (isFolder) ? target : target.substring(0, target.lastIndexOf('/'));
    if (!io.fs.isDir(targetFolder)) {
      io.out(`mv: ${args[2]}: No such file or directory\n`)
      return 1;
    }
    let destinationPath = io.fs.isDir(target) ? target + "/" + basename(source) : target;
    destinationPath = destinationPath.replaceAll('//', '/');
    io.fs.put(destinationPath, io.fs.get(source));
    io.fs.delete(source, false);
  }

  if (io.fs.isDir(source)) {
    io.out("mv: Directories can not be moved\n")
  }
  return 0;
}

async function cp(args: string[], io: IO) {
  if (args.length !== 3) {
    io.out("Usage: cp <source> <target>\n");
    return 1;
  }
  let source = getAbsolutePath(args[1], io.env);
  let target = getAbsolutePath(args[2], io.env);
  let isFolder = args[2].endsWith("/");
  if (!io.fs.exists(source)) {
    io.out(`cp: copy ${args[1]} to ${args[2]}: No such file or directory\n`)
    return 1;
  }

  if (io.fs.isFile(source)) {
    let targetFolder = (isFolder) ? target : target.substring(0, target.lastIndexOf('/'));
    if (!io.fs.isDir(targetFolder)) {
      io.out(`cp: ${args[2]}: No such file or directory\n`)
      return 1;
    }
    let destinationPath = io.fs.isDir(target) ? target + "/" + basename(source) : target
    destinationPath = destinationPath.replaceAll('//', '/');
    io.fs.put(destinationPath, io.fs.get(source));
  }

  if (io.fs.isDir(source)) {
    io.out("cp: Directories can not be copied\n")
  }
  return 0;
}

async function rm(args: string[], io: IO) {
  let {positionalArgs} = parseArgs(args);
  for (let item of positionalArgs.splice(1)) {
    let path = getAbsolutePath(item, io.env);
    if (io.fs.isFile(path)) {
      io.fs.put(basename(path) + '__folder__', {});
      io.fs.delete(path, true);
    } else if (io.fs.isDir(path)) {
      io.out(`rm: directories can not be removed\n`);
      return 1;
    } else {
      io.out(`rm: ${item}: No such file or directory\n`);
      return 1;
    }
  }
  return 0;
}

async function date(args: string[], io: IO) {
  io.out((new Date(Date.now())).toString() + "\n");
  return 0;
}

async function hostname(args: string[], io: IO) {
  io.out("hyperion\n");
  return 0;
}

async function tree(args: string[], io: IO) {
  console.log(fs);
  return 0;
}

async function ps(args: string[], io: IO) {
  io.out(`PID \tCMD\n`);
  listProcesses().forEach(p => {
    io.out(`${p.pid} \t${p.args?.join(" ")}\n`);
  });
  return 0;
}

async function test(args: string[], io: IO) {
  args.shift();
  if (args.pop() !== ']') {
    io.out('[: ] expected\n');
    return 2;
  }

  // Empty strings are considered false
  if (args.length === 0) return 1;

  // Strings are considered true
  else if (args.length === 1) return 0;

  else if (args.length === 2) {
    io.out(`[: parse error: condition expected: ${args[0]}\n`)
    return 2;

  } else if (args.length === 3) {
    let a = args[0];
    let b = args[2];
    let compareFns: {[key: string]: () => boolean} = {
      '=': () => a === b,
      '-eq': () => a === b,
      //TODO: add more comparisons
    }
    return compareFns[args[1]]() ? 0 : 1;
  } else {
    io.out(`[: too many arguments\n`)
    return 2;
  }
}

interface Executables {
  [command: string]: Executable;
}

export const commands: Executables = {
  'help': help,
  'open': open,
  'mail': mail,
  'pwd': pwd,
  'cd': cd,
  'ls': ls,
  'mkdir': mkdir,
  'cat': cat,
  'echo': echo,
  'clear': clear,
  'whoami': whoami,
  'aws': aws,
  'mirror': mirror,
  'touch': touch,
  'goto': goto,
  'mv': mv,
  'cp': cp,
  'date': date,
  'hostname': hostname,
  'ed': ed,
  'rm': rm,
  'ps': ps,
  'sh': sh,
  '[': test,
};

if (process.env.NODE_ENV !== 'production') {
  commands['tree'] = tree;
}

// Add all commands to filesystem
for (let e of Object.keys(commands)) {
  FileSystem.put('/usr/bin/' + e, commands[e]);
}
