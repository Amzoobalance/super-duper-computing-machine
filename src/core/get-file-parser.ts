import { identity } from "ramda"
import { parseOrdoFile } from "./app/parse-ordo-file"
import { OrdoFile } from "./app/types"
import { getFileType } from "./get-file-type"
import Switch from "./utils/switch"

export const getFileParser = (file: OrdoFile) => {
  const type = getFileType(file)

  return Switch.of(type).case("ordo", parseOrdoFile).default(identity)
}
