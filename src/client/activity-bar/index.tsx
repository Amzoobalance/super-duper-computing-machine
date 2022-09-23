import React from "react"

import { bottomActivities } from "@client/activity-bar/activities"
import { useAppSelector } from "@client/state"

import ActivityGroup from "@client/activity-bar/components/activity-group"

/**
 * ActivityBar allows the user to switch between separate parts of the
 * application, e.g. Editor, Graph, Checkboxes, Calendar, etc.
 */
export default function ActivityBar() {
  const activities = useAppSelector((state) => state.activityBar.activities)
  const currentActivity = useAppSelector((state) => state.activityBar.currentActivity)

  return (
    <div className="flex flex-col items-center justify-between py-4 pl-4 pr-2 bg-neutral-200 dark:bg-neutral-900 activity-bar">
      <ActivityGroup activities={activities} currentActivity={currentActivity} />

      <ActivityGroup activities={bottomActivities} currentActivity={currentActivity} />
    </div>
  )
}
