import React from "react"

import FileExplorer from "@client/app/file-explorer"

export default function SideBar() {
  return (
    <div className="p-2 side-bar h-full">
      <FileExplorer />
    </div>
  )
}
