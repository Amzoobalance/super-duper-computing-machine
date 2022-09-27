import type { Nullable } from "@core/types"

import React, { useEffect, useState, MouseEvent } from "react"

import { useAppSelector } from "@client/state"
import { getFileParser } from "@core/get-file-parser"
import Either from "@core/utils/either"

import Null from "@client/null"

import "@client/editor/index.css"
import { CaretRangeDirection } from "../../core/editor/constants"
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
import { handleEnter } from "./key-handlers/enter"
import { handleBackspace } from "./key-handlers/backspace"
import { handleDelete } from "./key-handlers/delete"
import Switch from "@core/utils/switch"
import { handleChar } from "./key-handlers/char"
import { IsKey } from "@core/editor/editor-keys"
import { initialCaretRanges } from "@core/editor/initial-caret-ranges"

export default function Editor() {
  const [raw, setRaw] = useState("")
  const [parsedFile, setParsedFile] = useState<Nullable<RootNode>>(null)
  const [parse, setParse] = useState<(raw: string) => Nullable<RootNode>>(() => null)
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

  const onArrowDown = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleArrowDown(caretRanges))
      .fold(noOp, setCaretRanges)

  const onArrowUp = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleArrowUp(caretRanges))
      .fold(noOp, setCaretRanges)

  const onArrowLeft = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleArrowLeft(caretRanges))
      .fold(noOp, setCaretRanges)

  const onArrowRight = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleArrowRight(caretRanges))
      .fold(noOp, setCaretRanges)

  const onEnter = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleEnter(caretRanges))
      .fold(noOp, ({ ranges, raw }) => {
        setCaretRanges(ranges)
        setRaw(raw)
      })

  const onBackspace = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleBackspace(caretRanges))
      .fold(noOp, ({ ranges, raw }) => {
        setCaretRanges(ranges)
        setRaw(raw)
      })

  const onDelete = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleDelete(caretRanges))
      .fold(noOp, ({ ranges, raw }) => {
        setCaretRanges(ranges)
        setRaw(raw)
      })

  const onChar = (event: KeyboardEvent) => {
    if (!parsedFile) return

    event.preventDefault()

    console.log(event)

    const char = event.shiftKey ? event.key.toLocaleUpperCase() : event.key

    const handleFile = handleChar(caretRanges, char)

    const { ranges, raw } = handleFile(parsedFile)

    setRaw(raw)
    setCaretRanges(ranges)
  }

  // TODO: shiftArrows, ctrlArrows, ctrlBackspace, ctrlDelete
  // TODO: ctrl+click for more carets
  // TODO: shift+click for mouse selection
  // TODO: mousedown+mouseup for mouse selection
  // TODO: ctrl+a
  // TODO: ctrl+x, ctrl+c, ctrl+v
  // TODO: ctrl+z, ctrl+shift+z
  // BUG: When typing very quickly (basically, rolling over the keyboard) some characters are lost
  // but the caret position is updated properly. This leads to losing caret visually. Maybe debouncing
  // `onChar` to, like, 50ms would help?
  useHotkeys(
    "*",
    (event) => {
      const handle = Switch.of(event)
        .case(IsKey.backspace, onBackspace)
        .case(IsKey.delete, onDelete)
        .case(IsKey.enter, onEnter)
        .case(IsKey.arrowLeft, onArrowLeft)
        .case(IsKey.arrowRight, onArrowRight)
        .case(IsKey.arrowUp, onArrowUp)
        .case(IsKey.arrowDown, onArrowDown)
        .case(IsKey.char, onChar)
        .default(noOp)

      handle(event)
    },
    [parsedFile, caretRanges]
  )

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
