import type { OrdoFile } from "@core/app/types"

import { promises } from "fs"

import { createRoot } from "@core/app/parsers/create-root"
import { parseMetadata } from "@core/app/parsers/parse-ordo-file"
import { getFileReader } from "@main/app/get-file-reader"
import { ORDO_METADATA_EXTENSION } from "@core/app/constants"

export const handleOpenFile = async (file: OrdoFile) => {
  const fileReader = getFileReader(file)
  const raw = await fileReader(file)

  const root = createRoot(raw)
  const metadata = parseMetadata(root).data
  await promises.writeFile(file.path + ORDO_METADATA_EXTENSION, JSON.stringify(metadata), "utf8")
  file.metadata = metadata as any

  return { file, raw }
}
