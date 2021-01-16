import { Log } from "../model"
import { execp } from "./../utils/exec-promisified"

export function repoCreate(
  owner: string,
  name: string,
  isPrivate: boolean,
  options: any = null
): Promise<Log> {
  return execp(
    `gh repo create ${owner}/${name} -y ${
      isPrivate ? "--private" : "--public"
    }`,
    options
  )
}

export function repoClone(sshUrl: string, options: any = null): Promise<Log> {
  return execp(`gh repo clone ${sshUrl}`, options)
}
