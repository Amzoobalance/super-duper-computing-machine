import { RootNode } from "@client/editor/types"
import { createRoot } from "./create-root"

export const parseTextFile = (raw: string): RootNode => {
  return createRoot(raw)
}
