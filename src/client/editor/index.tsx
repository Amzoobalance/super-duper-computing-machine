import type { Nullable } from "@core/types"

import React, { useEffect, useState } from "react"

import { useAppSelector } from "@client/state"
import { getFileParser } from "@core/get-file-parser"
import Either from "@core/utils/either"

import Null from "@client/null"
import BlockNode from "@client/editor/components/block-node"

import "@client/editor/index.css"
import { CaretRangeDirection } from "./constants"
import { useHotkeys } from "react-hotkeys-hook"
import {
  handleArrowDown,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
} from "./key-handlers/arrows"
import { Root } from "./types"

const initialCaretRanges = [
  {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 0 },
    direction: CaretRangeDirection.LEFT_TO_RIGHT,
  },
]

export default function Editor() {
  const [raw, setRaw] = useState("")
  const [parsedFile, setParsedFile] = useState<Nullable<Root>>(null)
  const [parse, setParse] = useState<(raw: string) => Nullable<Root>>(() => () => null)
  const [caretRanges, setCaretRanges] = useState([
    {
      start: { line: 1, column: 0 },
      end: { line: 1, column: 0 },
      direction: CaretRangeDirection.LEFT_TO_RIGHT,
    },
  ])

  const currentFileRaw = useAppSelector((state) => state.app.currentFileRaw)
  const currentFile = useAppSelector((state) => state.app.currentFile)

  useEffect(() => {
    if (currentFile) setParse(() => getFileParser(currentFile))
  }, [currentFile?.extension])

  useEffect(() => {
    if (parse) setParsedFile(parse(raw))
  }, [raw, parse])

  useEffect(() => {
    if (currentFileRaw) setRaw(currentFileRaw)
    setCaretRanges(initialCaretRanges)
  }, [currentFileRaw])

  useHotkeys(
    "down",
    (e) => {
      e.preventDefault()
      if (parsedFile) setCaretRanges(handleArrowDown(caretRanges, parsedFile))
    },
    [parsedFile, caretRanges]
  )

  useHotkeys(
    "up",
    (event) => {
      event.preventDefault()
      if (parsedFile) setCaretRanges(handleArrowUp(caretRanges, parsedFile))
    },
    [parsedFile, caretRanges]
  )

  useHotkeys(
    "left",
    (e) => {
      e.preventDefault()
      if (parsedFile) setCaretRanges(handleArrowLeft(caretRanges, parsedFile))
    },
    [parsedFile, caretRanges]
  )

  useHotkeys(
    "right",
    (e) => {
      e.preventDefault()
      if (parsedFile) setCaretRanges(handleArrowRight(caretRanges, parsedFile))
    },
    [parsedFile, caretRanges]
  )

  return Either.fromNullable(parsedFile)
    .chain((file) => Either.fromNullable(file.children))
    .fold(Null, (children) => (
      <div>
        {children.map((node) => (
          <BlockNode
            node={node}
            caretRanges={caretRanges}
            key={`${node.position?.start.line}-${node.position?.start.column}-${node.position?.end.line}-${node.position?.end.column}`}
          />
        ))}
      </div>
    ))
}
