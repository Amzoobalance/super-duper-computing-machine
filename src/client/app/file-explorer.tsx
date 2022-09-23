import React from "react"

import { useAppSelector } from "@client/state"
import { isFolder } from "@core/app/is-folder"

import Directory from "@client/app/components/file-explorer/directory"
import File from "@client/app/components/file-explorer/file"

export default function FileExplorer() {
  const personalDirectory = useAppSelector((state) => state.app.personalDirectory)

  return (
    <div>
      {personalDirectory?.children.map((item) =>
        isFolder(item) ? (
          <Directory key={item.path} directory={item} />
        ) : (
          <File key={item.path} file={item} />
        )
      )}
    </div>
  )
}
