import React from "react"

import InlineNode from "@client/editor/components/inline-node"
import { CaretRange, Line } from "../types"

type Props = {
  node: Line
  caretRanges: CaretRange[]
}

export default function BlockNode({ node, caretRanges }: Props) {
  return (
    <p className="whitespace-pre">
      {node.children.map((childNode) => (
        <InlineNode
          node={childNode}
          caretRanges={caretRanges}
          key={`${childNode.position?.start.line}-${childNode.position?.start.column}-${childNode.position?.end.line}-${childNode.position?.end.column}`}
        />
      ))}
    </p>
  )
}
