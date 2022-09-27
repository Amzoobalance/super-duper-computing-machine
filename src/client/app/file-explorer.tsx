import React from "react"

import { useAppSelector } from "@client/state"
import Either from "@core/utils/either"
import Null from "@client/null"
import FileOrFolder from "./components/file-explorer/file-or-folder"
import { useContextMenu } from "@client/context-menu"

export default function FileExplorer() {
  const personalDirectory = useAppSelector((state) => state.app.personalDirectory)

  const { showContextMenu, ContextMenu } = useContextMenu({
    children: [
      {
        title: "app.folder.create-file",
        icon: "BsFilePlus",
        action: () => console.log("TODO"),
      },
      {
        title: "app.folder.create-folder",
        icon: "BsFolderPlus",
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

  return Either.fromNullable(personalDirectory).fold(Null, (root) => (
    <div className="h-full" onContextMenu={showContextMenu}>
      {root.children.map((item) => (
        <FileOrFolder key={item.path} item={item} />
      ))}
      <ContextMenu />
    </div>
  ))
}
