import type { OrdoFile } from "@core/app/types"

import React from "react"

import { useIcon } from "@client/use-icon"
import { useAppDispatch } from "@client/state"
import { openFile } from "@client/app/store"
import { selectActivity } from "@client/activity-bar/store"

type Props = {
  item: OrdoFile
}

export default function File({ item }: Props) {
  const dispatch = useAppDispatch()

  const Icon = useIcon("BsFileEarmarkText")

  const paddingLeft = `${(item.depth + 5) * 2}px`

  const handleClick = () => {
    dispatch(selectActivity("editor"))
    dispatch(openFile(item))
  }

  return (
    <div
      style={{ paddingLeft }}
      className="flex items-center space-x-2 truncate py-0.5 cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 hover:rounded-md"
      onClick={handleClick}
    >
      <Icon className="shrink-0" />
      <div className="truncate">{item.readableName}</div>
    </div>
  )
}
