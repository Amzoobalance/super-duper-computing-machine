import React, { useState, useEffect } from "react"

import { topActivities, bottomActivities } from "@core/activity-bar/activities"
import { useGlobalEvent } from "@utils/hooks/use-global-event"

import ActivityGroup from "@core/activity-bar/components/activity-group"

export default function ActivityBar() {
  const [currentActivity, setCurrentActivity] = useState("editor")

  useGlobalEvent("@activity-bar/activity-selected", (payload: string) => {
    setCurrentActivity(payload)
  })

  useEffect(() => {
    window.ordo.emit("@activity-bar/request-activities")
  }, [])

  return (
    <div className="flex flex-col items-center justify-between py-4 pl-4 pr-2 bg-neutral-100 activity-bar">
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
