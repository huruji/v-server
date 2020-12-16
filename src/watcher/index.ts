import { ResetTimeout } from './reset';
import { FSWatcher, watch, readdirSync, existsSync, statSync } from 'fs';
import { join, resolve } from 'path';

function flatMap(arr: string[][]) {
  const buffer: string[] = [];
  arr.forEach(ele => buffer.push(...ele));
  return buffer;
}

export class WatchHandle {
  private watchers: FSWatcher[] = [];
  public append(watchers: FSWatcher[]) {
    this.watchers.push(...watchers);
  }
  public dispose() {
    this.watchers.forEach(watcher => watcher.close());
  }
}


function findDirectories(dir: string): string[] {
  try {
    return [dir, ...flatMap(
      readdirSync(dir)
        .map(p => join(dir, p))
        .filter(p => existsSync(p))
        .filter(p => statSync(p).isDirectory())
        .map(p => findDirectories(p))
    )];
  } catch {
    return [dir];
  }
}


export function createWatcher(dir: string, cb: (filePath: string) => void) {
  const reset = new ResetTimeout(100);
  const handle = new WatchHandle();
  const directories = findDirectories(dir);
  handle.append(
    directories
      .map(directory => watch(directory, (_, path) => {
        try {
          const resolvePath = resolve(join(directory, path))
          reset.run(() => cb(resolvePath))
        } catch {}
      }))
  )
  return handle
}
