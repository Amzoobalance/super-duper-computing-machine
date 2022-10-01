import { ORDO_FILE_EXTENSION } from "@core/app/constants"
import { RootNode } from "@core/editor/types"

import { promises } from "fs"

type TParams = RootNode["data"] & {
  path: string
}

export const handleSaveFile = async ({ path, raw, tags, checkboxes, dates, links }: TParams) => {
  const isOrdoFile = path.endsWith(ORDO_FILE_EXTENSION)

  if (!isOrdoFile) return

  const metadata = JSON.stringify({ tags, checkboxes, dates, links })
  await promises.writeFile(path, metadata.concat("\n").concat(raw), "utf8")
}
