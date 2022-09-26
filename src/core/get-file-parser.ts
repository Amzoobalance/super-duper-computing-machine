import { parseTextFile } from "./app/parsers/parse-text-file"
import { parseOrdoFile } from "./app/parsers/parse-ordo-file"
import { OrdoFile } from "./app/types"
import { getFileType } from "./get-file-type"
import Switch from "./utils/switch"
import { RootNode } from "@client/editor/types"

export const getFileParser = (file: OrdoFile): ((raw: string) => RootNode) => {
  const type = getFileType(file)

  return Switch.of(type)
    .case("ordo", parseOrdoFile)
    .case("image", parseTextFile) // TODO: Add handling images
    .default(parseTextFile)
}
