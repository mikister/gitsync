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
  let res = await gitDiffIndex("HEAD", "--", { cwd: path })

  if (res.message) return false

  return true
}

export async function getRepoList(): Promise<string[]> {
  const CONFIG: Config = getConfig()

  let repos = []
  let toRead = await fs.promises.readdir(CONFIG.projectsHome)

  while (toRead.length !== 0) {
    let currPath = toRead[0]
    let currPathAbs = join(CONFIG.projectsHome, toRead[0])

    toRead.splice(0, 1)

    if (await isDir(currPathAbs)) {
      if (await isGitRepo(currPathAbs)) {
        repos.push(currPath)
      } else {
        let extraToRead = await fs.promises.readdir(currPathAbs)
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
