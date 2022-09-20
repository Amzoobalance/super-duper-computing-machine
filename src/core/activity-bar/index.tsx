import React, { useState, useEffect } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { topActivities, bottomActivities } from "@core/activity-bar/activities"
import { useGlobalEvent } from "@utils/hooks/use-global-event"

import ActivityGroup from "@core/activity-bar/components/activity-group"

/**
 * ActivityBar allows the user to switch between separate parts of the
 * application, e.g. Editor, Graph, Checkboxes, Calendar, etc.
 */
export default function ActivityBar() {
  const [currentActivity, setCurrentActivity] = useState("editor")

  useGlobalEvent("@activity-bar/select-activity", (payload: string) => {
    setCurrentActivity(payload)
  })

  useEffect(() => window.ordo.emit("@activity-bar/request-activities"), [])

  // TODO: Add a convenient way to register this
  useHotkeys("ctrl+e", () =>
    window.ordo.emit("@activity-bar/select-activity", "editor")
  )

  useHotkeys("ctrl+,", () =>
    window.ordo.emit("@activity-bar/select-activity", "settings")
  )

  useHotkeys("ctrl+shift+n", () =>
    window.ordo.emit("@activity-bar/select-activity", "notifications")
  )

  return (
    <div className="flex flex-col items-center justify-between py-4 pl-4 pr-2 bg-neutral-100 dark:bg-neutral-900 activity-bar">
      <ActivityGroup
        activities={topActivities}
        currentActivity={currentActivity}
      />

      <ActivityGroup
        activities={bottomActivities}
        currentActivity={currentActivity}
      />
    </div>
  )
}
