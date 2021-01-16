import { PathLike } from "fs"
import { execp } from "./exec-promisified"

export async function isGitRepo(path: PathLike): Promise<boolean> {
  try {
    await execp("[ -d .git ] || git rev-parse --git-dir 2>&1", { cwd: path })
    return true
  } catch (error) {
    return false
  }
}
