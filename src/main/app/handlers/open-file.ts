import type { OrdoFile } from "@core/app/types"

import { getFileReader } from "@main/app/get-file-reader"

export const handleOpenFile = async (file: OrdoFile) => {
  const fileReader = getFileReader(file)
  const raw = await fileReader(file)

  return { file, raw }
}
