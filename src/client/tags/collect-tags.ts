import { isFolder } from "@core/app/is-folder"
import { OrdoFolder } from "@core/app/types"
import { Nullable } from "@core/types"

export const collectTags = (tree: Nullable<OrdoFolder>, tags: Record<string, string[]> = {}) => {
  if (!tree) return tags

  for (const child of tree.children) {
    if (isFolder(child)) {
      tags = collectTags(child, tags)
      continue
    }

    if (child.metadata.tags && child.metadata.tags.length) {
      for (const tag of child.metadata.tags) {
        if (!tags[tag]) {
          tags[tag] = []
        }

        tags[tag].push(child.readableName)
      }
    }
  }

  return tags
}
