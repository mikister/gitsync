import { execp } from "./../utils/exec-promisified"

export function gitInit(options: any = null): Promise<Log> {
  return execp("git init", options)
}

export function gitFetch(options: any = null): Promise<Log> {
  return execp("git fetch", options)
}

export function gitPull(options: any = null): Promise<Log> {
  return execp("git pull", options)
}

export function gitRemoteAdd(
  name: string,
  url: string,
  options: any = null
): Promise<Log> {
  return execp(`git remote add ${name} ${url}`, options)
}
