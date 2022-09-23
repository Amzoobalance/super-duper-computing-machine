import type { OrdoFile } from "@core/app/types"

import React from "react"

import { useIcon } from "@client/use-icon"
import { useAppDispatch } from "@client/state"
import { openFile } from "@client/app/store"

type Props = {
  file: OrdoFile
}

export default function File({ file }: Props) {
  const dispatch = useAppDispatch()

  const Icon = useIcon("BsFileEarmarkText")

  // This is a TOPOR calculation aimed at aligning file icons with parent folder icons
  const paddingLeft = `${(file.depth + 9) * 2}px`

  const handleClick = () => dispatch(openFile(file))

  return (
    <div
      style={{ paddingLeft }}
      className="flex items-center space-x-2 truncate py-0.5 cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 hover:rounded-md"
      onClick={handleClick}
    >
      <Icon className="shrink-0" />
      <div className="truncate">{file.readableName}</div>
    </div>
  )
}
