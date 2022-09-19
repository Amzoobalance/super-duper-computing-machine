import type { Activity } from "@core/activity-bar/types"

import React, { useState, useEffect } from "react"

import { topActivities, bottomActivities } from "@core/activity-bar/activities"
import { useGlobalEvent } from "@utils/hooks/use-global-event"

import ActivityGroup from "@core/activity-bar/components/activity-group"

export default function ActivityBar() {
  const [activities, setActivities] = useState<any[]>(topActivities)
  const [currentActivity, setCurrentActivity] = useState("editor")

  useGlobalEvent("@activity-bar/activity-selected", (payload: string) => {
    setCurrentActivity(payload)
  })

  useGlobalEvent("@activity-bar/activities-loaded", (payload: Activity[]) => {
    setActivities(payload)
  })

  useEffect(() => {
    window.ordo.emit("@activity-bar/request-activities")
  }, [])

  return (
    <div className="flex flex-col items-center justify-between py-4 pl-4 pr-2 bg-neutral-100 activity-bar">
      <ActivityGroup
        activities={activities}
        currentActivity={currentActivity}
      />

      <ActivityGroup
        activities={bottomActivities}
        currentActivity={currentActivity}
      />
    </div>
  )
}
