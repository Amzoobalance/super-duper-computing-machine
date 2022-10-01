import { ORDO_FILE_EXTENSION, ORDO_METADATA_EXTENSION } from "@core/app/constants"
import { RootNode } from "@core/editor/types"

import { promises } from "fs"

type TParams = RootNode["data"] & {
  path: string
}

export const handleSaveFile = async ({ path, raw, tags, checkboxes, dates, links }: TParams) => {
  const isOrdoFile = path.endsWith(ORDO_FILE_EXTENSION)

  if (!isOrdoFile) return

  const metadata = JSON.stringify({ tags, checkboxes, dates, links })

  await promises.writeFile(path, raw, "utf8")
  await promises.writeFile(path + ORDO_METADATA_EXTENSION, metadata, "utf8")
}
