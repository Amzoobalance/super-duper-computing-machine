import React from "react"

import { useAppSelector } from "@client/state"
import Either from "@core/utils/either"
import Null from "@client/null"
import FileOrFolder from "./components/file-explorer/file-or-folder"

export default function FileExplorer() {
  const personalDirectory = useAppSelector((state) => state.app.personalDirectory)

  return Either.fromNullable(personalDirectory).fold(Null, (root) => (
    <div>
      {root.children.map((item) => (
        <FileOrFolder key={item.path} item={item} />
      ))}
    </div>
  ))
}
