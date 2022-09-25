import type { Root } from "mdast"

import { parseTextFile } from "./app/parsers/parse-text-file"
import { parseOrdoFile } from "./app/parsers/parse-ordo-file"
import { OrdoFile } from "./app/types"
import { getFileType } from "./get-file-type"
import Switch from "./utils/switch"

export const getFileParser = (file: OrdoFile): ((raw: string) => Root) => {
  const type = getFileType(file)

  return Switch.of(type)
    .case("ordo", parseOrdoFile)
    .case("image", parseTextFile) // TODO: Add handling images
    .default(parseTextFile)
}
