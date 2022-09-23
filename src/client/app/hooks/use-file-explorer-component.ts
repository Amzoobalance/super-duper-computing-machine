import type { OrdoFile, OrdoFolder } from "@core/app/types"

import { isFolder } from "@core/app/is-folder"

import Directory from "../components/file-explorer/directory"
import File from "../components/file-explorer/file"

export const useFileExplorerComponent = (item: OrdoFile | OrdoFolder) => {
  if (isFolder(item)) {
    return Directory
  }

  return File
}
