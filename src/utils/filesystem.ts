import { Observable, Subscriber } from "rxjs"
import * as fs from "fs"
import { join } from "path"
import { filterAsync } from "./array"

export async function isDir(path: fs.PathLike): Promise<boolean> {
  if (!path) return false

  const stats: fs.Stats | void = await fs.promises.stat(path)

  if (!stats) return false
  return stats.isDirectory()
}

export async function getDirList(path: fs.PathLike): Promise<string[]> {
  if (await isDir(path)) {
    const possibleDirs = await fs.promises.readdir(path)

    return filterAsync(possibleDirs, async (dir: string) =>
      isDir(join(path as string, dir))
    )
  }

  return []
}

async function traverseHelper(
  subscriber: Subscriber<fs.PathLike>,
  path: fs.PathLike | fs.PathLike[],
  filter: (absPath: fs.PathLike) => Promise<boolean>,
  traverseStopper: (absPath: fs.PathLike) => Promise<boolean>,
): Promise<void> {
  const pending: fs.PathLike[] = []

  if (Array.isArray(path)) {
    pending.push(...(path as fs.PathLike[]))
  } else {
    pending.push(path)
  }

  const traversePromises: Promise<void>[] = [new Promise((resolve)=>{setTimeout(resolve, 1000);})]

  pending.forEach(async (absPath: fs.PathLike) => {

    if (await filter(absPath)) {
      subscriber.next(absPath)

      if (!await traverseStopper(absPath) && await isDir(absPath)) {
        const subdirs = await fs.promises.readdir(absPath)
        traversePromises.push(traverseHelper(subscriber, subdirs.map((subdir: fs.PathLike) => join(absPath as string, subdir as string) as fs.PathLike), filter, traverseStopper))
      }
    }
  })

  await Promise.all(traversePromises)
}

export function traverse(
  path: fs.PathLike | fs.PathLike[],
  filter: (absPath: fs.PathLike) => Promise<boolean>,
  traverseStopper: (absPath: fs.PathLike) => Promise<boolean>,
): Observable<fs.PathLike> {
  return new Observable((subscriber: Subscriber<fs.PathLike>) => {
    traverseHelper(subscriber, path, filter, traverseStopper).then(
      () => {subscriber.complete()}
    )
  })
}

export async function checkAccess(
  path: fs.PathLike,
  mode: number | undefined
): Promise<boolean> {
  try {
    await fs.promises.access(path, mode)
    return true
  } catch (error) {
    return false
  }
}
