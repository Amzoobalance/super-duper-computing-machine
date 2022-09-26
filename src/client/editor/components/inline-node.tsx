import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import { CaretRange, TextNode } from "../types"
import Caret from "./caret"
import Char from "./char"

type Props = {
  node: TextNode
  caretRanges: CaretRange[]
  setCaretRanges: Dispatch<SetStateAction<CaretRange[]>>
}

export default function InlineNode({ node, caretRanges, setCaretRanges }: Props) {
  const [hasCaretAtLineStart, setHasCaretAtLineStart] = useState(false)

  useEffect(() => {
    const hasCaretAtStart = caretRanges.some(
      (range) =>
        range.start.line === node.position?.start.line &&
        range.start.column === node.position?.start.column
    )

    setHasCaretAtLineStart(hasCaretAtStart)

    return () => {
      setHasCaretAtLineStart(false)
    }
  }, [caretRanges, node])

  if (node.type !== "text") return null

  if (!node.value) {
    return (
      <span>
        {hasCaretAtLineStart && <Caret />}
        <br />
      </span>
    )
  }

  return (
    <span>
      {hasCaretAtLineStart && <Caret />}
      {node.value.split("").map((char, index) => (
        <Char
          key={`${node.position?.start.line}-${node.position?.start.column}-${index + 1}`}
          char={char}
          index={index}
          caretRanges={caretRanges}
          setCaretRanges={setCaretRanges}
          node={node}
        />
      ))}
    </span>
  )
}
