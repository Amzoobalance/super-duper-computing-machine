import React, { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable"

import { useAppSelector } from "@client/state"
import { getFileParser } from "@core/get-file-parser"

import Null from "@client/null"
import Either from "@core/utils/either"

export default function Editor() {
  const [parsedFile, setParsedFile] = useState<any>(null)

  const currentFileRaw = useAppSelector((state) => state.app.currentFileRaw)
  const currentFile = useAppSelector((state) => state.app.currentFile)

  useEffect(() => {
    if (!currentFile || !currentFileRaw) return

    const parse = getFileParser(currentFile)

    const parsed = parse(currentFileRaw)

    setParsedFile(parsed)
  }, [currentFile, currentFileRaw])

  return Either.fromNullable(parsedFile).fold(Null, () => (
    <ContentEditable
      html={currentFileRaw}
      onChange={console.log}
      className="outline-none whitespace-pre-line h-full"
    />
  ))
}
