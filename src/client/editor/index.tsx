import React, { useEffect, useRef, useState } from "react"
import sanitize from "sanitize-html"

import ContentEditable from "react-contenteditable"

import { useAppDispatch, useAppSelector } from "@client/state"
import { getFileParser } from "@core/get-file-parser"

import Null from "@client/null"
import Either from "@core/utils/either"

import "@client/editor/index.css"
import { unified } from "unified"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import remarkStringify from "remark-stringify/lib"

export default function Editor() {
  const dispatch = useAppDispatch()

  const [parsedFile, setParsedFile] = useState<any>(null)
  const [raw, setRaw] = useState("")
  const [parse, setParse] = useState<(raw: string) => Promise<string>>(
    () => async (raw: string) => raw
  )

  const editorRef = useRef(null)

  const currentFileRaw = useAppSelector((state) => state.app.currentFileRaw)
  const currentFile = useAppSelector((state) => state.app.currentFile)

  useEffect(() => {
    if (!currentFile) return

    setParse(() => getFileParser(currentFile))
  }, [currentFile?.extension])

  useEffect(() => {
    if (!parse) return

    parse(raw).then((result) => {
      console.log(result)
      setParsedFile(result)
    })
  }, [raw, parse])

  useEffect(() => {
    if (!currentFileRaw) return

    setRaw(currentFileRaw)
  }, [currentFileRaw])

  return Either.fromNullable(parsedFile).fold(Null, () => (
    <ContentEditable
      ref={editorRef}
      html={parsedFile}
      onChange={(e) => {
        const value = e.target.value

        unified()
          .use(rehypeParse)
          .use(rehypeRemark, { newlines: true })
          .use(remarkStringify)
          .process(value)
          .then(String)
          .then((result) => {
            console.log(result)
            return result
          })
          .then(setRaw)

        // const value = e.target.value
        // parse(value).then(sanitize).then(setParsedFile)
      }}
      className="outline-none whitespace-pre-line h-full editor"
    />
  ))
}
