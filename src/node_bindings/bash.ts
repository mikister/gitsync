import { execp } from "./../utils/exec-promisified"

export function mkdir(path: string, options: any = null): Promise<Log> {
  return execp(`mkdir -p ${path}`, options)
}
