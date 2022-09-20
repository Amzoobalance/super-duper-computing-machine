import type { OrdoFolder } from "@core/app/types"

import { promises } from "fs"

const listFolder = async (path: string, depth = 0, rootPath = path) => {
  const {
    mtime: updatedAt,
    birthtime: createdAt,
    atime: accessedAt,
    isDirectory,
  } = await promises.stat(path)

  // Check if provided path is a folder
  if (!isDirectory()) {
    throw new Error("ordo.error.list-folder.not-a-folder")
  }

  // Get the list of files inside the folder
  const folder = await promises.readdir(path, {
    withFileTypes: true,
    encoding: "utf8",
  })
}
