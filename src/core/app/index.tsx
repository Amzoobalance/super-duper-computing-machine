import type { UserSettings } from "@core/settings/types"

import React, { useLayoutEffect, useState } from "react"
import SplitView from "react-split"
import { useHotkeys } from "react-hotkeys-hook"

import {
  SPLIT_DEFAULT_SIZES,
  SPLIT_SNAP_OFFSET,
  SPLIT_MIN_SIZE,
} from "@core/app/constants"

import ActivityBar from "@core/activity-bar"
import SideBar from "@core/side-bar"
import Workspace from "@core/workspace"
import { useGlobalEvent } from "@utils/hooks/use-global-event"
// import Overlay from "@core/overlay"
// import StatusBar from "@core/status-bar"
// import CommandBar from "@core/command-bar"
// import ContextMenu from "@core/context-menu"

export default function App() {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(true)
  const [isRightCollapsed, setIsRightCollapsed] = useState(false)
  const [sizes, setSizes] = useState<[number, number]>(SPLIT_DEFAULT_SIZES)
  const [fontSize, setFontSize] = useState(16)

  useGlobalEvent("@app/user-settings-updated", ([key, value]: any) => {
    if (key === "editor.font-size") {
      setFontSize(value)
    }
  })

  useLayoutEffect(() => {
    const body = document.querySelector(":root") as HTMLElement

    if (!body) return

    const size = fontSize >= 8 ? fontSize : 8

    body.style.fontSize = `${size}px`
  }, [fontSize])

  useHotkeys(
    "ctrl+b",
    () => {
      setIsLeftCollapsed((prev) => !prev)

      if (isLeftCollapsed && sizes[0] < 2) {
        setSizes([30, 70])
      } else {
        setSizes([0, 100])
      }
    },
    [isLeftCollapsed, sizes[0]]
  )

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
          className="flex grow"
          sizes={sizes}
          snapOffset={SPLIT_SNAP_OFFSET}
          minSize={SPLIT_MIN_SIZE}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <div
            className={`bg-neutral-100 dark:bg-neutral-900 ${
              isLeftCollapsed && "hidden"
            }`}
          >
            <SideBar />
          </div>
          <div className={`${isRightCollapsed && "hidden"}`}>
            <Workspace />
          </div>
        </SplitView>
      </div>

      {/* <StatusBar />
      <CommandBar />
      <Overlay />
      <ContextMenu /> */}
    </div>
  )
}
