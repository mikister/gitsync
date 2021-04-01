import { Command, flags } from "@oclif/command"
import { join, basename } from "path"
import { Config } from "../model"
import {
  getConfig,
  getNonRepoList,
  getRepoList,
  isRepoUpToDate,
} from "../utils"

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
      const repoNames: string[] = (await getRepoList()) as string[]

      for await (const path of repoNames) {
        const isUpToDate = await isRepoUpToDate(path)
        repos[path] = isUpToDate
      }
    }

    const maxBasenameLen: number = Math.max(...Object.keys(repos).map((repo: string)=>basename(repo).length))
    Object.entries(repos)
      .sort((aa, bb) => (aa[0] < bb[0] ? -1 : 1))
      .forEach(([repo, isUpToDate]) => {
        if (isUpToDate) {
          this.log(`    ${`${basename(repo)}`.padEnd(maxBasenameLen, " ")}    ${repo}`)
        } else {
          this.log(`*   ${`${basename(repo)}`.padEnd(maxBasenameLen, " ")}    ${repo}`)
        }
      })
  }
}
