import React, { Dispatch, SetStateAction } from "react"

import InlineNode from "@client/editor/components/inline-node"
import { LineNode, CaretRange } from "@core/editor/types"

type Props = {
  node: LineNode
  caretRanges: CaretRange[]
  setCaretRanges: Dispatch<SetStateAction<CaretRange[]>>
}

export default function BlockNode({ node, caretRanges, setCaretRanges }: Props) {
  return (
    <p className="whitespace-pre">
      {node.children.map((childNode) => (
        <InlineNode
          node={childNode}
          caretRanges={caretRanges}
          setCaretRanges={setCaretRanges}
          key={`${childNode.position?.start.line}-${childNode.position?.start.column}-${childNode.position?.end.line}-${childNode.position?.end.column}`}
        />
      ))}
    </p>
  )
}
