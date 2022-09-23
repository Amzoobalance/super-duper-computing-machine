import type { OrdoFolder } from "@core/app/types"

import React, { useState } from "react"

import { useIcon } from "@client/use-icon"
import { isFolder } from "@core/app/is-folder"

import File from "@client/app/components/file-explorer/file"

type Props = {
  directory: OrdoFolder
}

export default function Directory({ directory }: Props) {
  const ChevronDown = useIcon("BsChevronDown")
  const ChevronRight = useIcon("BsChevronRight")
  const OpenFolder = useIcon("FaFolderOpen")
  const ClosedFolder = useIcon("FaFolder")

  const [isExpanded, setIsExpanded] = useState(false)

  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
  const FolderIcon = isExpanded ? OpenFolder : ClosedFolder

  // This increases padding. The deeper the folder, the righter it goes
  const paddingLeft = `${(directory.depth + 5) * 2}px`

  const handleChevronClick = () => setIsExpanded((value) => !value)

  return (
    <div style={{ paddingLeft }}>
      <div
        className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 hover:rounded-md"
        onClick={handleChevronClick}
      >
        <ChevronIcon className="shrink-0" />
        <FolderIcon className="shrink-0" />
        <div className="truncate">{directory.readableName}</div>
      </div>
      {isExpanded && (
        <div>
          {directory.children.map((item) =>
            isFolder(item) ? (
              <Directory key={item.path} directory={item} />
            ) : (
              <File key={item.path} file={item} />
            )
          )}
        </div>
      )}
    </div>
  )
}
