import {parrot, bio, plan, honestBio, hosts, resolv} from "./constants";
import * as Ansi from './Ansi';
import {Executable} from './proc';

const YEAR = new Date().getFullYear();

export type FsObject = string | {} | Executable;

interface FileMap {
  [key: string]: FsObject
}

export let fs: FileMap = {
  '/home/barry/linkedin.txt': Ansi.link('https://www.linkedin.com/in/barry-mcandrews') + '\n',
  '/home/barry/github.txt': Ansi.link('https://github.com/barrymcandrews') + '\n',
  '/home/barry/copyright.txt': 'Made by Barry McAndrews © ' + YEAR + '\n',
  '/home/barry/parrot.txt': parrot,
  '/home/barry/bio.txt': bio,

  '/home/barry/.trash/bio-draft.txt': honestBio,
  '/home/barry/.trash/ideas.txt': plan,

  '/etc/conf': 'get outta here',
  '/etc/sysflags': '🏳️‍🌈',
  '/etc/hosts': hosts,
  '/etc/resolv.conf': resolv,

  '/usr/bin/__folder__': {},
  '/var/__folder__': {},
  '/var/www/__folder__': {},
  '/tmp/__folder__': {},

  '/opt/aurora-server/README.md': Ansi.link('https://github.com/barrymcandrews/aurora-server') + '\n',
  '/opt/raven-react/README.md': Ansi.link('https://github.com/barrymcandrews/raven-react') + '\n',
  '/opt/raven-iac/README.md': Ansi.link('https://github.com/barrymcandrews/raven-iac') + '\n',
  '/opt/chatbot/README.md': Ansi.link('https://github.com/barrymcandrews/chatbot') + '\n',
  '/opt/raven-cli/README.md': Ansi.link('https://github.com/barrymcandrews/raven-cli') + '\n',
};

export interface FS {
  get(path: string): FsObject;
  put(path: string, object: any): void;
  delete(path: string, keepFolder: boolean): void;
  scan(prefix: string): string[];
  list(path: string): string[];
  isFile(path: string): boolean;
  isDir(path: string): boolean;
  exists(path: string): boolean;
}

export class FileSystem {
  static get(path: string) {
    return fs[path];
  }

  static put(path: string, object: any) {
    if(path.endsWith('/')) {
      // throw Error('Invalid Path: path can not end in a slash');
    }
    fs[path] = object;
  }

  static delete(path: string, keepFolder= false) {
    if (keepFolder) {
      let folderPath = path.split('/').reverse()[0] + '/__folder__';
      if (!fs.hasOwnProperty(folderPath)) {
        this.put(folderPath, {});
      }
    }
    delete fs[path];
  }

  static scan(prefix: string): string[] {
    return Object.keys(fs).filter(x => x.startsWith(prefix));
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
