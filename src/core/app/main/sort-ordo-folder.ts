import type { OrdoFolder } from "@core/app/types"

import { isFolder } from "@core/app/main/is-folder"

export const sortOrdoFolder = (folder: OrdoFolder): OrdoFolder => {
  if (!folder.children) {
    console.log(folder)

    return folder
  }
  folder.children = folder.children.sort((a, b) => {
    if (isFolder(a)) {
      sortOrdoFolder(a)
    }

    if (isFolder(b)) {
      sortOrdoFolder(b)
    }

    if (!isFolder(a) && isFolder(b)) {
      return 1
    }

    if (isFolder(a) && !isFolder(b)) {
      return -1
    }

    return a.readableName.localeCompare(b.readableName)
  })

  return folder
}
