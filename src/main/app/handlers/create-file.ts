import { ORDO_FILE_EXTENSION, ORDO_METADATA_EXTENSION } from "@core/app/constants"
import { createOrdoFile } from "../create-ordo-file"

import { promises } from "fs"

export const handleCreateFile = async (path: string) => {
  const creationDate = new Date()

  const file = createOrdoFile({
    path,
    createdAt: creationDate,
    updatedAt: creationDate,
    accessedAt: creationDate,
    depth: 0,
    relativePath: "",
    size: 0,
  })

  const filePath = file.extension ? file.path : file.path + ORDO_FILE_EXTENSION
  const writeFile = () => promises.writeFile(filePath, "\n", "utf8")

  // TODO: Add encryption option and encryption support
  if (filePath.endsWith(ORDO_FILE_EXTENSION)) {
    const metadataPath = file.path + ORDO_METADATA_EXTENSION

    return Promise.all([promises.writeFile(metadataPath, "{}", "utf8"), writeFile()])
  }

  return writeFile()
}
