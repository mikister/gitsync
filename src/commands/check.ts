import { Command, flags } from "@oclif/command"
import { join } from "path"
import { Config, Log } from "../model"
import { getConfig } from "../utils/config"
import { getRepoList, isRepoUpToDate } from "../utils/repo"

export default class Check extends Command {
  static description = "describe the command here"

  static examples = [
    `$ gitsync check
checking all repos
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
  }

  static args = [{ name: "path" }]

  async run() {
    const { args, flags } = this.parse(Check)
    const CONFIG: Config = getConfig()

    let repos: { [key: string]: boolean } = {}
    let logs: Log[] = []

    if (args.path) {
      let path: string = join(CONFIG.projectsHome, args.path)
      repos[args.path] = await isRepoUpToDate(path)
    } else {
      let repoNames: string[] = await getRepoList()

      for await (const name of repoNames) {
        let path: string = join(CONFIG.projectsHome, name)
        let isUpToDate = await isRepoUpToDate(path)
        repos[name] = isUpToDate
      }
    }

    Object.entries(repos)
      .sort((aa, bb) => (aa[0] < bb[0] ? -1 : 1))
      .forEach(([repo, isUpToDate]) => {
        if (isUpToDate) {
          this.log(`    ${repo}`)
        } else {
          this.log(`*   ${repo}`)
        }
      })
  }
}
