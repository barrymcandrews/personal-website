
interface EnvStore {
  [key: string]: string
}

let env: EnvStore = {
  'PATH': '/usr/bin'
}

export function put(key: string, value: string) {
  env[key] = value;
}

export function get(key: string): string {
  return env[key];
}

export function substitute(line: string): string {
  return line
    .split(' ')
    .map(word => {
      if (word.startsWith('$')) {
        let key = word.substring(1);
        if (key in env) {
          return env[key];
        }
      }
      return word;
    })
    .join(' ');
}
