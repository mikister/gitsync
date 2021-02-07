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
