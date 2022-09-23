import type { OrdoFolder } from "@core/app/types"

import React, { useState } from "react"

import { useIcon } from "@client/use-icon"
import { isFolder } from "@core/app/is-folder"

import File from "@client/app/components/file-explorer/file"
import FileOrFolder from "./file-or-folder"

type Props = {
  item: OrdoFolder
}

export default function Directory({ item }: Props) {
  const ChevronDown = useIcon("BsChevronDown")
  const ChevronRight = useIcon("BsChevronRight")
  const OpenFolder = useIcon("FaFolderOpen")
  const ClosedFolder = useIcon("FaFolder")

  const [isExpanded, setIsExpanded] = useState(false)

  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
  const FolderIcon = isExpanded ? OpenFolder : ClosedFolder

  // This increases padding. The deeper the folder, the righter it goes
  const paddingLeft = `${(item.depth + 5) * 2}px`

  const handleChevronClick = () => setIsExpanded((value) => !value)

  return (
    <div>
      <div
        className="flex items-center space-x-2 py-1 px-2 cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 hover:rounded-md"
        onClick={handleChevronClick}
      >
        <ChevronIcon className="shrink-0" />
        <FolderIcon className="shrink-0" />
        <div className="truncate">{item.readableName}</div>
      </div>
      <div style={{ paddingLeft }}>
        {isExpanded && (
          <div>
            {item.children.map((item) => (
              <FileOrFolder key={item.path} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
