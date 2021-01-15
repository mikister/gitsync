import { resolve } from "dns"
import { stat, PathLike, Stats } from "fs"

export function isDir(path: PathLike): Promise<boolean> {
  return new Promise((resolve) => {
    stat(path, (err, stats: Stats) => {
      resolve(stats.isDirectory())
    })
  })
}
