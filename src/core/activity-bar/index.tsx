import React, { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { topActivities, bottomActivities } from "@core/activity-bar/activities"
import { useGlobalEvent } from "@utils/hooks/use-global-event"

import ActivityGroup from "@core/activity-bar/components/activity-group"
import { useOrdoEmit } from "@utils/hooks/use-ordo-emit"

/**
 * ActivityBar allows the user to switch between separate parts of the
 * application, e.g. Editor, Graph, Checkboxes, Calendar, etc.
 */
export default function ActivityBar() {
  const [currentActivity, setCurrentActivity] = useState("editor")

  const emitSelectActivity = useOrdoEmit("@activity-bar/select-activity")

  useGlobalEvent("@activity-bar/select-activity", (payload: string) => {
    setCurrentActivity(payload)
  })

  // TODO: Add a convenient way to register this
  useHotkeys("ctrl+e", () => emitSelectActivity("editor"))
  useHotkeys("ctrl+,", () => emitSelectActivity("settings"))
  useHotkeys("ctrl+shift+n", () => emitSelectActivity("notifications"))

  return (
    <div className="flex flex-col items-center justify-between py-4 pl-4 pr-2 bg-neutral-200 dark:bg-neutral-900 activity-bar">
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
