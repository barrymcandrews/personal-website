import {parrot} from "./constants";
import * as Ansi from './Ansi';

const YEAR = new Date().getFullYear();

interface FileMap {
  [key: string]: string | {}
}

let fs: FileMap = {
  '/home/barry/linkedin.txt': Ansi.link('https://www.linkedin.com/in/barry-mcandrews') + '\n',
  '/home/barry/github.txt': Ansi.link('https://github.com/barrymcandrews') + '\n',
  '/home/barry/copyright.txt': 'Made by Barry McAndrews © ' + YEAR + '\n',
  '/home/barry/parrot.txt': parrot,
  '/etc/conf': 'get outta here',
  '/usr/bin/__folder__': {},
  '/var/__folder__': {},
  '/tmp/__folder__': {},
  '/home/barry/__folder__': {},
  '/opt/aurora-server/README.md': Ansi.link('https://github.com/barrymcandrews/aurora-server') + '\n',
  '/opt/raven-react/README.md': Ansi.link('https://github.com/barrymcandrews/raven-react') + '\n',
  '/opt/raven-iac/README.md': Ansi.link('https://github.com/barrymcandrews/raven-iac') + '\n',
  '/opt/chatbot/README.md': Ansi.link('https://github.com/barrymcandrews/chatbot') + '\n',
};

export class FileSystem {
  static get(path: string) {
    return fs[path];
  }

  static put(path: string, object: any) {
    fs[path] = object;
  }

  static list(path: string) {
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

  static isFile(path: string) {
    return path in fs && !path.endsWith('__folder__')
  }

  static isDir(path: string) {
    return path === '/' || Object.keys(fs).some(s => s.startsWith(path + '/'))
}

  static exists(path: string) {
    return this.isFile(path) || this.isDir(path);
  }
}
