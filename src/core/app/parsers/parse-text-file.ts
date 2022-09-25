import { createRoot } from "./create-root"

export const parseTextFile = (raw: string) => {
  return createRoot(raw)
}
