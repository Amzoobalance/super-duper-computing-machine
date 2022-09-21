import type { OrdoFolder } from "@core/app/types"
import type { Nullable } from "@core/types"

import { promises, existsSync } from "fs"
import { join } from "path"

import { createOrdoFolder } from "@core/app/main/create-ordo-folder"
import { createOrdoFile } from "@core/app/main/create-ordo-file"
import { sortOrdoFolder } from "@core/app/main/sort-ordo-folder"
import { Color } from "@core/colors"

// TODO: Move this out
const ORDO_MARKDOWN_FILE_EXTENSION = ".mdo"
const METADATA_FILE_EXTENSION = ".mdm"
const FOLDER_INDEX_METADATA_FILE = `index${METADATA_FILE_EXTENSION}`

export const listFolder = async (
  path: string,
  depth = 0,
  rootPath = path,
  parent: Nullable<OrdoFolder>
): Promise<OrdoFolder> => {
  // Check if provided path exists
  if (!existsSync(path)) {
    // TODO: Add error to translations
    throw new Error("ordo.error.list-folder.path-does-not-exist")
  }

  const stat = await promises.stat(path)

  // Check if provided path is a folder
  if (!stat.isDirectory()) {
    // TODO: Add error to translations
    throw new Error("ordo.error.list-folder.not-a-folder")
  }

  // Get the list of files inside the folder
  const folder = await promises.readdir(path, {
    withFileTypes: true,
    encoding: "utf8",
  })

  const relativePath = path.replace(rootPath, "")

  // Create a tree structure for the folder
  const ordoFolder = createOrdoFolder({
    depth,
    path,
    relativePath,
    createdAt: stat.birthtime,
    updatedAt: stat.mtime,
    accessedAt: stat.atime,
    parent,
  })

  for (const item of folder) {
    const itemPath = join(path, item.name)

    // TODO: Add inclusion patterns
    // TODO: Add encryption for meta and files with a dedicated password

    if (item.isDirectory()) {
      ordoFolder.children.push(await listFolder(itemPath, depth + 1, rootPath, ordoFolder))
    } else if (item.isFile()) {
      if (item.name === FOLDER_INDEX_METADATA_FILE) {
        // TODO: Add extraction of folder metadata
        continue
      }

      const isMetadataFile = item.name.endsWith(METADATA_FILE_EXTENSION)

      // Skip metadata files right now because they are handled separately
      if (isMetadataFile) continue

      const { birthtime, mtime, atime, size } = await promises.stat(itemPath)
      const relativePath = itemPath.replace(rootPath, "")

      const ordoFile = createOrdoFile({
        path: itemPath,
        depth: depth + 1,
        relativePath,
        createdAt: birthtime,
        updatedAt: mtime,
        accessedAt: atime,
        size,
        parent: ordoFolder,
      })

      if (ordoFile.extension === ORDO_MARKDOWN_FILE_EXTENSION) {
        const metadataPath = `${ordoFile.path}${METADATA_FILE_EXTENSION}`

        if (existsSync(metadataPath)) {
          try {
            const metadataContent = await promises.readFile(metadataPath, "utf8")
            ordoFile.metadata = JSON.parse(metadataContent)
          } catch (e) {
            ordoFile.metadata = { color: Color.NEUTRAL }
          }
        }
      }

      ordoFolder.children.push(ordoFile)
    }
  }

  return sortOrdoFolder(ordoFolder)
}
