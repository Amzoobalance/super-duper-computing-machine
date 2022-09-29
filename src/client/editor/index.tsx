import type { Nullable } from "@core/types"

import React, { useEffect, useState, MouseEvent } from "react"

import { useAppDispatch, useAppSelector } from "@client/state"
import { getFileParser } from "@core/get-file-parser"
import Either from "@core/utils/either"

import Null from "@client/null"

import "@client/editor/index.css"
import { CaretRangeDirection } from "../../core/editor/constants"
import { useHotkeys } from "react-hotkeys-hook"
import { noOp } from "@core/utils/no-op"
import { preventDefault } from "@core/utils/event"
import Line from "./components/line"
import Switch from "@core/utils/switch"
import { initialCaretRanges } from "@core/editor/initial-caret-ranges"
import {
  handleArrowDown,
  handleArrowUp,
  handleArrowLeft,
  handleArrowRight,
} from "@core/editor/key-handlers/arrows"
import { handleBackspace } from "@core/editor/key-handlers/backspace"
import { handleChar } from "@core/editor/key-handlers/char"
import { handleDelete } from "@core/editor/key-handlers/delete"
import { handleEnter } from "@core/editor/key-handlers/enter"
import { RootNode } from "@core/editor/types"
import { IsKey } from "@core/editor/is-key"
import { saveFile } from "@client/app/store"
import { useIcon } from "@client/use-icon"

export default function Editor() {
  const dispatch = useAppDispatch()

  const [raw, setRaw] = useState("")
  const [parsedFile, setParsedFile] = useState<Nullable<RootNode>>(null)
  const [parse, setParse] = useState<(raw: string) => Nullable<RootNode>>(() => null)
  const [caretRanges, setCaretRanges] = useState(initialCaretRanges)

  const currentFileRaw = useAppSelector((state) => state.app.currentFileRaw)
  const currentFile = useAppSelector((state) => state.app.currentFile)
  const isSavingFile = useAppSelector((state) => state.app.isSavingFile)

  const SpinIcon = useIcon("HiOutlineRefresh")

  useEffect(() => {
    if (currentFile) setParse(() => getFileParser(currentFile))
  }, [currentFile?.extension])

  useEffect(() => {
    if (parse) setParsedFile(parse(raw))
  }, [raw, parse])

  useEffect(() => {
    if (currentFileRaw != null) setRaw(currentFileRaw)
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
        // TODO: Debounce saving
        dispatch(saveFile({ content: raw, path: currentFile!.path }))
      })

  const onBackspace = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleBackspace(caretRanges))
      .fold(noOp, ({ ranges, raw }) => {
        setCaretRanges(ranges)
        setRaw(raw)
        // TODO: Debounce saving
        dispatch(saveFile({ content: raw, path: currentFile!.path }))
      })

  const onDelete = (event: Event) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .map(handleDelete(caretRanges))
      .fold(noOp, ({ ranges, raw }) => {
        setCaretRanges(ranges)
        setRaw(raw)
        // TODO: Debounce saving
        dispatch(saveFile({ content: raw, path: currentFile!.path }))
      })

  const onChar = (event: KeyboardEvent) =>
    Either.of(event)
      .map(preventDefault)
      .chain(() => Either.fromNullable(parsedFile))
      .chain((file) =>
        Either.fromBoolean(event.key.length === 1)
          .map(() => (event.shiftKey ? event.key.toLocaleUpperCase() : event.key))
          .map((char) => handleChar(caretRanges, char))
          .map((handleFile) => handleFile(file))
      )
      .fold(noOp, ({ ranges, raw }) => {
        setRaw(raw)
        setCaretRanges(ranges)
        // TODO: Debounce saving
        dispatch(saveFile({ content: raw, path: currentFile!.path }))
      })

  // TODO: shiftArrows, ctrlArrows, ctrlBackspace, ctrlDelete
  // TODO: ctrl+click for adding a caret at click point
  // TODO: shift+click for mouse selection from range to click point
  // TODO: mousedown+mouseup for mouse selection from mousedown point to mouseup point
  // TODO: ctrl+a to select everything
  // TODO: ctrl+x, ctrl+c, ctrl+v
  // TODO: ctrl+z, ctrl+shift+z
  // BUG: When typing very quickly (basically, rolling over the keyboard) some characters are lost
  // but the caret position is updated properly. This leads to losing caret visually. Maybe debouncing
  // `onChar` would help?
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
    [parsedFile, caretRanges, currentFile]
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
        {isSavingFile && (
          <div className="fixed top-5 right-5">
            <SpinIcon className="text-sm text-neutral-500 animate-spin duration-300" />
          </div>
        )}
      </div>
    ))
}
