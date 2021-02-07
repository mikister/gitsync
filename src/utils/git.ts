import { execp } from "./exec-promisified"
import * as fs from "fs"
import { join } from "path"
import { Config, Node } from "../model"
import { gitDiffIndex, gitUpdateIndex } from "../node_bindings/git"
import { getConfig } from "./config"
import { getDirList } from "../utils"

export async function isGitRepo(path: fs.PathLike): Promise<boolean> {
  try {
    await execp("[ -d .git ] || git rev-parse --git-dir 2>&1", { cwd: path })
    return true
  } catch (error) {
    return false
  }
}

export async function isRepoUpToDate(path: fs.PathLike): Promise<boolean> {
  try {
    await gitUpdateIndex("--refresh", { cwd: path })
  } catch (error) {}
  const res = await gitDiffIndex("HEAD", "--", { cwd: path })

  if (res.message) return false

  return true
}

export async function getRepoList(path = ""): Promise<string[]> {
  const CONFIG: Config = getConfig()

  const repos: string[] = []
  const toRead = await getDirList(join(CONFIG.projectsHome, path))

  const getPromises = toRead.map(
    (subdir: string) =>
      new Promise<void>(async (resolve) => {
        const currPath: string = join(path, subdir)
        const currPathAbs: string = join(CONFIG.projectsHome, currPath)

        if (await isGitRepo(currPathAbs)) {
          repos.push(currPath)
        } else {
          const extraRepos: string[] = await getRepoList(currPath)
          repos.push(...extraRepos)
        }

        resolve()
      })
  )

  await Promise.all(getPromises)
  return repos
}

export async function getNonRepoList(): Promise<string[]> {
  type DirNode = Node<{
    path: string
    hasGitContent: boolean
    isMapped: boolean
    isRead: boolean
  }>

  const CONFIG: Config = getConfig()

  const nonrepos: string[] = []
  const tree: DirNode = {
    parent: null,
    children: [],
    content: {
      path: CONFIG.projectsHome,
      hasGitContent: false,
      isMapped: false,
      isRead: false,
    },
  }

  let currNode: DirNode = tree

  while (!currNode.content.isMapped) {
    if (currNode.children.length === 0) {
      const toAdd = await getDirList(currNode.content.path)

      while (toAdd.length !== 0) {
        const currPath: string = toAdd[0]
        const currPathAbs: string = join(currNode.content.path, currPath)
        const isGit = await isGitRepo(currPathAbs)
        toAdd.splice(0, 1)

        currNode.children.push({
          parent: currNode,
          children: [],
          content: {
            path: currPathAbs,
            hasGitContent: isGit,
            isMapped: isGit,
            isRead: false,
          },
        })

        if (isGit) {
          let currParent = currNode
          while (currParent) {
            if (currParent.content.hasGitContent) break

            currParent.content.hasGitContent = true

            if (currParent.parent) currParent = currParent.parent
            else break
          }
        }
      }
    }

    const nextNode = currNode.children.find(
      (node: DirNode) => !node.content.isMapped
    )

    if (nextNode) {
      currNode = nextNode
      continue
    }

    currNode.content.isMapped = true
    if (currNode.parent) currNode = currNode.parent
  }

  currNode = tree
  while (!currNode.content.isRead) {
    currNode.content.isRead = true
    if (currNode.content.hasGitContent) {
      const nextNode = currNode.children.find(
        (node: DirNode) => !node.content.isRead
      )

      if (nextNode) {
        currNode = nextNode
        continue
      }
    } else {
      nonrepos.push(currNode.content.path)
    }

    while (currNode.parent) {
      currNode = currNode.parent

      const nextNode = currNode.children.find(
        (node: DirNode) => !node.content.isRead
      )

      if (nextNode) {
        currNode = nextNode
        break
      }
    }
  }

  return nonrepos
}
