import type { OrdoFolder } from "@core/app/types"

import React, { useState } from "react"

import { useIcon } from "@client/use-icon"
import { isFolder } from "@core/app/is-folder"

import File from "@client/app/components/file-explorer/file"
import FileOrFolder from "./file-or-folder"
import { useContextMenu } from "@client/context-menu"
import { useAppDispatch } from "@client/state"
import { deleteFileOrFolder, listFolder } from "@client/app/store"
import { useRenameModal } from "../rename-modal"
import { SEPARATOR } from "@client/context-menu/constants"
import { useCreateFileModal, useCreateFolderModal } from "../create-modal"

type Props = {
  item: OrdoFolder
}

export default function Directory({ item }: Props) {
  const dispatch = useAppDispatch()

  const hasChildren = item.children.length > 0

  const ChevronDown = useIcon("BsChevronDown")
  const ChevronRight = useIcon("BsChevronRight")
  const OpenFolder = useIcon(hasChildren ? "AiFillFolderOpen" : "AiOutlineFolderOpen")
  const ClosedFolder = useIcon(hasChildren ? "AiFillFolder" : "AiOutlineFolder")

  const [isExpanded, setIsExpanded] = useState(false)

  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
  const FolderIcon = isExpanded ? OpenFolder : ClosedFolder

  // This increases padding. The deeper the folder, the righter it goes
  const paddingLeft = `${(item.depth + 5) * 2}px`

  const handleChevronClick = () => setIsExpanded((value) => !value)

  const { showRenameModal, RenameModal } = useRenameModal(item)
  const { showCreateFileModal, CreateFileModal } = useCreateFileModal({ parent: item })
  const { showCreateFolderModal, CreateFolderModal } = useCreateFolderModal({ parent: item })

  const { showContextMenu, ContextMenu } = useContextMenu({
    children: [
      {
        title: "app.file.rename",
        icon: "BsPencilSquare",
        action: showRenameModal,
      },
      {
        title: "app.file.duplicate",
        icon: "BsFiles",
        action: () => console.log("TODO"),
      },
      SEPARATOR,
      {
        title: "app.folder.create-file",
        icon: "BsFilePlus",
        action: showCreateFileModal,
        accelerator: "CommandOrControl+N",
      },
      {
        title: "app.folder.create-folder",
        icon: "BsFolderPlus",
        action: showCreateFolderModal,
        accelerator: "CommandOrControl+Shift+N",
      },
      SEPARATOR,
      {
        title: "app.file.delete",
        icon: "BsTrash",
        action: () => dispatch(deleteFileOrFolder(item.path)),
      },
      SEPARATOR,
      {
        title: "app.file.copy-path",
        icon: "BsSignpost2",
        action: () => console.log("TODO"),
        accelerator: "CommandOrControl+Alt+C",
      },
      {
        title: "app.file.copy-relative-path",
        icon: "BsSignpost",
        action: () => console.log("TODO"),
        accelerator: "CommandOrControl+Shift+Alt+C",
      },
      {
        title: "app.file.reveal-in-files",
        icon: "BsFolderCheck",
        action: () => console.log("TODO"),
      },
    ],
  })

  return (
    <div onContextMenu={showContextMenu}>
      <div
        className="flex items-center space-x-2 py-1 px-2 cursor-pointer rounded-md hover-passive"
        onClick={handleChevronClick}
        onContextMenu={showContextMenu}
      >
        <ChevronIcon className="shrink-0" />
        <FolderIcon className="shrink-0" />
        <div className="truncate text-sm">{item.readableName}</div>
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
      <ContextMenu />
      <RenameModal />
      <CreateFileModal />
      <CreateFolderModal />
    </div>
  )
}
