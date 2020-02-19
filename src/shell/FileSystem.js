import {parrot} from "./constants";

let fs = {
  '/home/barry/test.txt': 'This is a Test!!!',
  '/home/barry/parrot.txt': parrot,
  '/etc/conf': 'get outta here',
  '/usr/bin/__folder__': {},
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
        .filter(s => s.charAt(path.length) === '/')
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
