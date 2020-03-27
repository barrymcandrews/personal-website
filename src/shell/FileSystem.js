import {parrot} from "./constants";

let fs = {
  '/home/barry/linkedin.txt': 'https://www.linkedin.com/in/barry-mcandrews\n',
  '/home/barry/github.txt': 'https://github.com/barrymcandrews\n',
  '/home/barry/copyright.txt': 'Made by Barry McAndrews © 2020\n',
  '/home/barry/parrot.txt': parrot,
  '/etc/conf': 'get outta here',
  '/usr/bin/__folder__': {},
  '/var/__folder__': {},
  '/tmp/__folder__': {},
  '/home/barry/__folder__': {},
};

export class FileSystem {
  static get(path) {
    return fs[path];
  }

  static put(path, object) {
    fs[path] = object;
  }

  static list(path) {
    return Array.from(new Set(
      Object.keys(fs)
        .filter(s => s.startsWith(path))
        .filter(s => path === '/' || s.charAt(path.length) === '/')
        .map(s => s.slice(path.length))
        .map(s => s.replace(/^\//, ''))
        .map(s => s.split('/')[0])
        .filter(s => !s.endsWith('__folder__'))
    ))
  }

  static isFile(path) {
    return path in fs && !path.endsWith('__folder__')
  }

  static isDir(path) {
    return path === '/' || Object.keys(fs).some(s => s.startsWith(path + '/'))
}

  static exists(path) {
    return this.isFile(path) || this.isDir(path);
  }
}
