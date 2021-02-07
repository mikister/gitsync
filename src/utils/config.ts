import * as fs from "fs"
import { homedir } from "os"
import { join } from "path"
import { mkdir } from "../node_bindings/bash"
import { Config, Log } from "../model"

export function getDefaultConfigObject(): Config {
  return {
    projectsHome: join(homedir(), "projects"),
  } as Config
}

export function getConfigPath(): string {
  return join(homedir(), ".config", "gitsync")
}

export function exists(): boolean {
  let configExists = true
  const configPath = getConfigPath()

  configExists = configExists && fs.existsSync(configPath)
  configExists = configExists && fs.existsSync(join(configPath, "config.json"))

  return configExists
}

export function generateConfig(): Promise<Log[]> {
  return new Promise(async (resolve, reject) => {
    const logs: Log[] = []
    const configPath = getConfigPath()
    const configData = getDefaultConfigObject()

    await mkdir(configPath)
      .then((log: Log) => logs.push(log))
      .catch(reject)

    fs.writeFile(
      join(configPath, "config.json"),
      JSON.stringify(configData),
      (err) => {
        reject({
          type: "error",
          message: err?.message,
          error: err,
        } as Log)
      }
    )

    resolve(logs)
  })
}

export function getConfig(): Config {
  const configPath = join(getConfigPath(), "config.json")
  const rawdata: Buffer = fs.readFileSync(configPath)
  return JSON.parse(rawdata.toString()) as Config
}

export function writeConfig(configData: Config): Promise<Log[]> {
  return new Promise(async (resolve, reject) => {
    const logs: Log[] = []
    const configPath = getConfigPath()

    fs.writeFile(
      join(configPath, "config.json"),
      JSON.stringify(configData),
      (err) => {
        reject({
          type: "error",
          message: err?.message,
          error: err,
        } as Log)
      }
    )

    resolve(logs)
  })
}
