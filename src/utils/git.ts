import { PathLike } from "fs"
import { execp } from "./exec-promisified"

export async function isGitRepo(path: PathLike): Promise<boolean> {
  try {
    let res = await execp("[ -d .git ] || git rev-parse --git-dir 2>&1", {
      cwd: path,
    })

    // console.log(res)
    return true
  } catch (err) {
    // console.log(err)
    return false
  }
}
