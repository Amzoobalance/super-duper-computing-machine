import React from "react"

import { useAppSelector } from "@client/state"

import Null from "@client/null"
import Settings from "@client/app/settings"

export default function Workspace() {
  const currentActivity = useAppSelector((state) => state.activityBar.currentActivity)

  return (
    <div className="p-2 workspace h-full outline-none">
      {currentActivity === "settings" ? <Settings /> : <Null />}
    </div>
  )
}
