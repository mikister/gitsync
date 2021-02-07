import { stat, PathLike, Stats } from "fs"

export function isDir(path: PathLike): Promise<boolean> {
  return new Promise((resolve) => {
    if (!path) {
      resolve(false)
      return
    }

    stat(path, (err, stats: Stats) => {
      if (!stats) {
        resolve(false)
        return
      }

      resolve(stats.isDirectory())
    })
  })
}
