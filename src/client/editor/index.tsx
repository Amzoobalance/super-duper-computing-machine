import type { Nullable } from "@core/types"

import React, { useEffect, useState, useCallback, MouseEvent } from "react"

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
import { RootNode } from "./types"
import { noOp } from "@core/utils/no-op"
import { preventDefault } from "@core/utils/event"
import Line from "./components/line"

const initialCaretRanges = [
  {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 0 },
    direction: CaretRangeDirection.LEFT_TO_RIGHT,
  },
]

export default function Editor() {
  const [raw, setRaw] = useState("")
  const [parsedFile, setParsedFile] = useState<Nullable<RootNode>>(null)
  const [parse, setParse] = useState<(raw: string) => Nullable<RootNode>>(() => () => null)
  const [caretRanges, setCaretRanges] = useState(initialCaretRanges)

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

  const onArrowDown = useCallback(
    (event: Event) =>
      Either.of(event)
        .map(preventDefault)
        .chain(() => Either.fromNullable(parsedFile))
        .map(handleArrowDown(caretRanges))
        .fold(noOp, setCaretRanges),
    [parsedFile, caretRanges]
  )

  const onArrowUp = useCallback(
    (event: Event) =>
      Either.of(event)
        .map(preventDefault)
        .chain(() => Either.fromNullable(parsedFile))
        .map(handleArrowUp(caretRanges))
        .fold(noOp, setCaretRanges),
    [parsedFile, caretRanges]
  )

  const onArrowLeft = useCallback(
    (event: Event) =>
      Either.of(event)
        .map(preventDefault)
        .chain(() => Either.fromNullable(parsedFile))
        .map(handleArrowLeft(caretRanges))
        .fold(noOp, setCaretRanges),
    [parsedFile, caretRanges]
  )

  const onArrowRight = useCallback(
    (event: Event) =>
      Either.of(event)
        .map(preventDefault)
        .chain(() => Either.fromNullable(parsedFile))
        .map(handleArrowRight(caretRanges))
        .fold(noOp, setCaretRanges),
    [parsedFile, caretRanges]
  )

  useHotkeys("down", onArrowDown, [parsedFile, caretRanges])
  useHotkeys("up", onArrowUp, [parsedFile, caretRanges])
  useHotkeys("left", onArrowLeft, [parsedFile, caretRanges])
  useHotkeys("right", onArrowRight, [parsedFile, caretRanges])

  const handleClick = (event: MouseEvent) => {
    if (!parsedFile) return

    event.preventDefault()
    event.stopPropagation()

    const lastLineIndex = parsedFile.children.length - 1
    const column = parsedFile.children[lastLineIndex].position.end.column - 1
    const line = lastLineIndex + 1

    setCaretRanges([
      {
        start: { line, column },
        end: { line, column },
        direction: CaretRangeDirection.LEFT_TO_RIGHT,
      },
    ])
  }

  return Either.fromNullable(parsedFile)
    .chain((file) => Either.fromNullable(file.children))
    .fold(Null, (children) => (
      <div className="cursor-text h-full" onClick={handleClick}>
        {children.map((node) => (
          <Line
            key={`${node.position?.start.line}-${node.position?.start.column}-${node.position?.end.line}-${node.position?.end.column}`}
            caretRanges={caretRanges}
            setCaretRanges={setCaretRanges}
            node={node}
          />
        ))}
      </div>
    ))
}
