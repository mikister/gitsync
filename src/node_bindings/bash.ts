import { Log } from "../model"
import { execp } from "./../utils"

export function mkdir(path: string, options: any = null): Promise<Log> {
  return execp(`mkdir -p ${path}`, options)
}
