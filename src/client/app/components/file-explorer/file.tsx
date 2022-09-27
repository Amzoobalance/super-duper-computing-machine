import type { OrdoFile } from "@core/app/types"

import React from "react"

import { useIcon } from "@client/use-icon"
import { useAppDispatch, useAppSelector } from "@client/state"
import { openFile } from "@client/app/store"
import { selectActivity } from "@client/activity-bar/store"
import { useContextMenu } from "@client/context-menu"

type Props = {
  item: OrdoFile
}

export default function File({ item }: Props) {
  const dispatch = useAppDispatch()

  const currentFile = useAppSelector((state) => state.app.currentFile)

  const { showContextMenu, ContextMenu } = useContextMenu({
    children: [
      {
        title: "app.file.rename",
        icon: "BsPencilSquare",
        action: () => console.log("TODO"),
      },
      {
        title: "app.file.duplicate",
        icon: "BsFiles",
        action: () => console.log("TODO"),
      },
      { title: "separator" },
      {
        title: "app.file.delete",
        icon: "BsTrash",
        action: () => console.log("TODO"),
      },
      { title: "separator" },
      {
        title: "app.file.copy-path",
        icon: "BsSignpost2",
        action: () => console.log("TODO"),
      },
      {
        title: "app.file.copy-relative-path",
        icon: "BsSignpost",
        action: () => console.log("TODO"),
      },
      {
        title: "app.file.reveal-in-files",
        icon: "BsFolderCheck",
        action: () => console.log("TODO"),
      },
    ],
  })

  const Icon = useIcon("BsFileEarmarkText")

  const paddingLeft = `${(item.depth + 5) * 2}px`

  const handleClick = () => {
    dispatch(selectActivity("editor"))
    dispatch(openFile(item))
  }

  return (
    <>
      <div
        style={{ paddingLeft }}
        className={`flex items-center space-x-2 truncate py-0.5 cursor-pointer hover-passive rounded-md ${
          item.path === currentFile?.path &&
          "hover:bg-gradient-to-r hover:from-rose-300 hover:dark:from-violet-700 hover:to-purple-300 hover:dark:to-purple-700 bg-gradient-to-r from-rose-300 dark:from-violet-700 to-purple-300 dark:to-purple-700"
        }`}
        onClick={handleClick}
        onContextMenu={showContextMenu}
      >
        <Icon className="shrink-0" />
        <div className="truncate text-sm">{item.readableName}</div>
        <ContextMenu />
      </div>
    </>
  )
}
