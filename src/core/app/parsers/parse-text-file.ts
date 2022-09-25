import { Root } from "@client/editor/types"
import { createRoot } from "./create-root"

export const parseTextFile = (raw: string): Root => {
  return createRoot(raw)
}
