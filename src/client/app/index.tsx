import React, { useLayoutEffect, useState, useEffect } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import SplitView from "react-split"

import { SPLIT_DEFAULT_SIZES, SPLIT_SNAP_OFFSET, SPLIT_MIN_SIZE } from "@client/app/constants"
import { useAppDispatch, useAppSelector } from "@client/state"
import { selectActivity } from "@client/activity-bar/store"
import { getLocalSettings, getUserSettings, listFolder } from "@client/app/store"
import i18n from "@client/i18n"

import ActivityBar from "@client/activity-bar"
import SideBar from "@client/side-bar"
import Workspace from "@client/workspace"

// import Overlay from "@core/overlay"
// import CommandBar from "@core/command-bar"
// import ContextMenu from "@core/context-menu"

export default function App() {
  const dispatch = useAppDispatch()
  const fontSize = useAppSelector((state) => state.app.userSettings?.["editor.font-size"]) ?? 16
  const language =
    useAppSelector((state) => state.app.userSettings?.["appearance.language"]) ?? "en"
  const personalProjectDirectory = useAppSelector(
    (state) => state.app.userSettings?.["project.personal.directory"]
  )

  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)
  const [isRightCollapsed, setIsRightCollapsed] = useState(false)
  const [sizes, setSizes] = useState<[number, number]>(SPLIT_DEFAULT_SIZES)

  useHotkeys("ctrl+e", () => void dispatch(selectActivity("editor")))
  useHotkeys("ctrl+,", () => void dispatch(selectActivity("settings")))
  useHotkeys("ctrl+shift+n", () => void dispatch(selectActivity("notifications")))

  useLayoutEffect(() => {
    const body = document.querySelector(":root") as HTMLElement
    const size = fontSize >= 8 ? fontSize : 8

    if (body) body.style.fontSize = `${size}px`
  }, [fontSize])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useHotkeys(
    "ctrl+b",
    () => {
      setIsLeftCollapsed((prev) => !prev)
      const isNotFullyCollapsed = isLeftCollapsed && sizes[0] > 0
      const newSizes: [number, number] = isNotFullyCollapsed ? [30, 70] : [0, 100]

      setSizes(newSizes)
    },
    [isLeftCollapsed, sizes[0]]
  )

  useEffect(() => {
    dispatch(getUserSettings())
    dispatch(getLocalSettings())
  }, [])

  useEffect(() => {
    if (!personalProjectDirectory) return

    dispatch(listFolder(personalProjectDirectory))
  }, [personalProjectDirectory])

  const handleDragEnd = (sectionSizes: [number, number]) => {
    setSizes(sectionSizes)
  }

  const handleDrag = (sectionSizes: [number, number]) => {
    const [leftSize, rightSize] = sectionSizes

    const isSideBarCollapsed = leftSize < 2
    const isWorkspaceCollapsed = rightSize < 2

    setIsLeftCollapsed(isSideBarCollapsed)
    setIsRightCollapsed(isWorkspaceCollapsed)
  }

  return (
    <div className="flex flex-col min-h-screen text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 app">
      <div className="flex grow">
        <ActivityBar />
        <SplitView
          className="fixed top-0 left-11 right-0 bottom-0 flex grow"
          sizes={sizes}
          snapOffset={SPLIT_SNAP_OFFSET}
          minSize={SPLIT_MIN_SIZE}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <div
            className={`overflow-y-scroll h-full bg-neutral-200 dark:bg-neutral-900 ${
              isLeftCollapsed && "hidden"
            }`}
          >
            <SideBar />
          </div>
          <div className={`overflow-y-scroll h-full ${isRightCollapsed && "hidden"}`}>
            <Workspace />
          </div>
        </SplitView>
      </div>
    </div>
  )
}
