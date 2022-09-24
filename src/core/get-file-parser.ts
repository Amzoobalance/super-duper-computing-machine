import { parseMarkdownFile } from "./app/parsers/parse-md-file"
import { parseOrdoFile } from "./app/parsers/parse-ordo-file"
import { OrdoFile } from "./app/types"
import { getFileType } from "./get-file-type"
import Switch from "./utils/switch"

export const getFileParser = (file: OrdoFile): ((raw: string) => Promise<string>) => {
  const type = getFileType(file)

  return Switch.of(type)
    .case("ordo", parseOrdoFile)
    .case("markdown", parseMarkdownFile)
    .default(async (raw: string) => raw)
}
