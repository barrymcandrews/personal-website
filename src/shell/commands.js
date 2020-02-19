import * as Ansi from './Ansi';
import {FileSystem} from './FileSystem';

let cwd = '/home/barry';

function help(args, out) {
  out('Available commands:\n');
  for (let key of Object.keys(commands)) {
    out('  ' + key + '\n')
  }
}

function open(args, out) {
  if (args.length !== 2) {
    out('Usage: open <url>\n');
    return;
  }

  if (!args[1].startsWith('http://') && !args[1].startsWith('https://')) {
    args[1] = 'http://' + args[1];
  }

  window.open(args[1], '_blank');
}

function mail(args, out) {
  if (args.length !== 2) {
    out('Usage: mail <email address>\n');
    return;
  }

  window.open('mailto:' + args[1], '_self');
}

function clear(args, out) {
  out(Ansi.clearScreen);
}

function whoami(args, out) {
  out('barry\n');
}

function pwd(args, out) {
  out(cwd + '\n');
}

function cd(args, out) {
  let path = getAbsolutePath(args[1]);
  if (FileSystem.isDir(path)) {
    cwd = path;
  } else {
    let message = (FileSystem.isFile(args[1])) ? 'cd: not a directory: ' : 'cd: no such file or directory: ';
    out(message + args[1] + '\n');
  }
}

function ls(args, out) {
  let dir = (args.length === 1) ? cwd : getAbsolutePath(args[1]);
  if (FileSystem.exists(dir)) {
    out(FileSystem.list(dir).join('\n') + '\n')
  } else {
    out('ls: no such file or directory\n')
  }
}

function mkdir(args, out) {
  let path = getAbsolutePath(args[1]);
  if (FileSystem.exists(path)) {
    out('mkdir: ' + args[1] + ': File exists');
  } else {
    path = path.replace(/\/$/, '');
    FileSystem.put(path + '/__folder__', {})
  }
}

function cat(args, out) {
  let path = getAbsolutePath(args[1]);
  if (FileSystem.isFile(path)) {
    out(FileSystem.get(path) + '\n');
  } else {
    let msg = FileSystem.exists(path) ? ': Is a directory' : ': No such file or directory';
    out('cat: ' + args[1] + msg + '\n');
  }
}

function getAbsolutePath(path) {
  if (path.startsWith('/')) return path;
  let prefix = (cwd === '/') ? '/' : cwd + '/';
  path = prefix + path;
  path = path.split('/').filter(s => s !== '.');
  for (let i = 0; i < path.length; i++) {
    if (path[i] === '..') {
      path.splice(i - 1, 2);
      i = 0;
    }
  }
  path = path.join('/');
  path = (path === '') ? '/' : path.replace(/\/$/, '');
  return path;
}


export const commands = {
  'help': help,
  'open': open,
  'mail': mail,
  'pwd': pwd,
  'cd': cd,
  'ls': ls,
  'mkdir': mkdir,
  'cat': cat,
  'clear': clear,
  'whoami': whoami,
};

