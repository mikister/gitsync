import * as fs from "fs"
import { join } from "path"
import { Config } from "../model"
import { gitDiffIndex, gitUpdateIndex } from "../node_bindings/git"
import { isDir } from "./bash"
import { getConfig } from "./config"
import { isGitRepo } from "./git"

export async function isRepoUpToDate(path: fs.PathLike): Promise<boolean> {
  try {
    await gitUpdateIndex("--refresh", { cwd: path })
  } catch (error) {}
  const res = await gitDiffIndex("HEAD", "--", { cwd: path })

  if (res.message) return false

  return true
}

export async function getRepoList(): Promise<string[]> {
  const CONFIG: Config = getConfig()

  const repos = []
  const toRead = await fs.promises.readdir(CONFIG.projectsHome)

  while (toRead.length !== 0) {
    const currPath = toRead[0]
    const currPathAbs = join(CONFIG.projectsHome, toRead[0])

    toRead.splice(0, 1)

    if (await isDir(currPathAbs)) {
      if (await isGitRepo(currPathAbs)) {
        repos.push(currPath)
      } else {
        const extraToRead = await fs.promises.readdir(currPathAbs)
        if (extraToRead) {
          extraToRead.forEach((extraPath) => {
            toRead.push(join(currPath, extraPath))
          })
        }
      }
    } else {
      continue
    }
  }

  return repos
}
