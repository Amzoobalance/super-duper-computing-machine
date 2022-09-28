import { ORDO_FILE_EXTENSION, ORDO_METADATA_EXTENSION } from "@core/app/constants"

import { promises } from "fs"

type TParams = {
  path: string
  content: string
}

export const handleSaveFile = async ({ path, content }: TParams) => {
  const isOrdoFile = path.endsWith(ORDO_FILE_EXTENSION)

  if (isOrdoFile) {
    const metadataPath = path + ORDO_METADATA_EXTENSION
    // TODO: Collect and save metadata to metadataPath
  }

  await promises.writeFile(path, content, "utf8")
}
