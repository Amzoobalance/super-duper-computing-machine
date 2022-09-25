import { Line, Root } from "@client/editor/types"

export const createRoot = (raw: string): Root => {
  const root: Root = {
    type: "root",
    data: {
      raw,
    },
    children: [],
  }

  const lines = raw.split("\n")

  let offset = 0

  lines.forEach((line, index) => {
    const start = { line: index + 1, column: 0, offset }

    offset += line.length

    const end = { line: index + 1, column: line.length + 1, offset }

    const lineNode: Line = {
      type: "line",
      data: { raw: line },
      position: { start, end },
      children: [{ type: "text", position: { start, end }, value: line }],
    }

    root.children.push(lineNode)
  })

  return root
}
