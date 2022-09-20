import React, { useState } from "react"

import { useGlobalEvent } from "@utils/hooks/use-global-event"

import NoOp from "@utils/no-op"
import Settings from "@core/settings"

export default function Workspace() {
  const [activity, setActivity] = useState("editor")

  useGlobalEvent("@activity-bar/select-activity", (payload: string) => {
    setActivity(payload)
  })

  return (
    <div className="p-2 workspace h-full outline-none">
      {activity === "settings" ? <Settings /> : <NoOp />}
    </div>
  )
}
