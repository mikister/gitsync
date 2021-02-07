import { Command, flags } from "@oclif/command"
import { join } from "path"
import { Config, Log } from "../model"
import { getConfig } from "../utils/config"
import { getNonRepoList, getRepoList, isRepoUpToDate } from "../utils/repo"

export default class Check extends Command {
  static description = "Check if any local repos have uncommited changes"

  static examples = [
    `$ gitsync check
checking all repos

$ gitsync check specific/repo
checking specific/repo
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    noGit: flags.boolean({
      char: "g",
      description: "Check for all directories that aren't a git repo",
    }),
  }

  static args = [{ name: "path" }]

  async run() {
    const { args, flags } = this.parse(Check)
    const CONFIG: Config = getConfig()

    if (flags.noGit) {
      const nonrepos: string[] = await getNonRepoList()

      this.log("Directories, inside project home, that aren't git repos:")
      nonrepos
        .sort((aa, bb) => (aa[0] < bb[0] ? -1 : 1))
        .forEach((dir) => {
          this.log(`    ${dir}`)
        })

      return
    }

    const repos: { [key: string]: boolean } = {}

    if (args.path) {
      const path: string = join(CONFIG.projectsHome, args.path)
      repos[args.path] = await isRepoUpToDate(path)
    } else {
      const repoNames: string[] = await getRepoList()

      for await (const name of repoNames) {
        const path: string = join(CONFIG.projectsHome, name)
        const isUpToDate = await isRepoUpToDate(path)
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
