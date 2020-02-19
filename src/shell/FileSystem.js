let fs = {
  '/test.txt': "",
  '/etc/conf': "",
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
    return Object.keys(fs)
      .filter(s => s.startsWith(path))
      .map(s => s.slice(path.length))
      .map(s => s.replace(/^\//, ''))
      .map(s => s.split('/')[0])
      .filter(s => !s.endsWith('__folder__'))
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
