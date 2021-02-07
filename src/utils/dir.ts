import * as fs from "fs"
import { join } from "path"
import { filterAsync } from "./array"
import { isDir } from "./bash"

export async function getDirList(path: fs.PathLike): Promise<string[]> {
  if (await isDir(path)) {
    const possibleDirs = await fs.promises.readdir(path)

    return filterAsync(possibleDirs, async (dir: string) =>
      isDir(join(path as string, dir))
    )
  }

  return []
}
