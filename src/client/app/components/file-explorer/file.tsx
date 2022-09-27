import type { OrdoFile } from "@core/app/types"

import React, { useState } from "react"

import { useIcon } from "@client/use-icon"
import { useAppDispatch, useAppSelector } from "@client/state"
import { deleteFileOrFolder, openFile, renameFileOrFolder } from "@client/app/store"
import { selectActivity } from "@client/activity-bar/store"
import { useContextMenu } from "@client/context-menu"
import { useModalWindow } from "@client/app/modal"
import { useTranslation } from "react-i18next"

type Props = {
  item: OrdoFile
}

export default function File({ item }: Props) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [newFileName, setNewFileName] = useState(item.readableName)

  const currentFile = useAppSelector((state) => state.app.currentFile)
  const { showModal, hideModal, Modal } = useModalWindow()

  const { showContextMenu, ContextMenu } = useContextMenu({
    children: [
      {
        title: "app.file.rename",
        icon: "BsPencilSquare",
        action: () => showModal(),
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
        action: () => dispatch(deleteFileOrFolder(item.path)),
      },
      { title: "separator" },
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

      <Modal>
        <div className="h-full flex items-center justify-center">
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-neutral-100 dark:bg-neutral-700 shadow-xl rounded-md w-full max-w-lg p-8 flex flex-col space-y-4 items-center"
          >
            <div className="text-xl">{t("app.modal.rename.title")}</div>
            <input
              autoFocus
              type="text"
              className="w-full outline-none"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") return hideModal()
                if (e.key === "Enter") {
                  const oldPath = item.path
                  const newPath = item.path.replace(item.readableName, newFileName)
                  dispatch(renameFileOrFolder({ oldPath, newPath }))
                  hideModal()
                }
              }}
            />
            <div className="text-sm text-neutral-500">{t("app.modal.rename.hint")}</div>
          </div>
        </div>
      </Modal>
    </>
  )
}
