import type { PhrasingContent } from "mdast"

import React from "react"
import { CaretRange } from "../types"
import Caret from "./caret"

type Props = {
  node: PhrasingContent
  caretRanges: CaretRange[]
}

export default function InlineNode({ node, caretRanges }: Props) {
  const hasCaretAtNodeStart = caretRanges.some(
    (range) =>
      range.start.line === node.position?.start.line &&
      range.start.column === node.position?.start.column
  )

  if (node.type !== "text") return null

  if (!node.value) {
    return (
      <span>
        {hasCaretAtNodeStart && <Caret />}
        <br />
      </span>
    )
  }

  return (
    <span>
      {hasCaretAtNodeStart && <Caret />}
      {node.value.split("").map((char, index) => (
        <span key={`${node.position?.start.line}-${node.position?.start.column}-${index + 1}`}>
          {char}
          {caretRanges.some(
            (range) =>
              range.start.line === node.position?.start.line &&
              range.start.column === node.position.start.column + index + 1
          ) && <Caret />}
        </span>
      ))}
    </span>
  )
}
