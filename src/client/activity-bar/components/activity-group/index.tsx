import type { Activity } from "@client/activity-bar/types"

import React from "react"

import ActivityBarItem from "@client/activity-bar/components/activity-bar-item"

type Props = {
  activities: Activity[]
  currentActivity: string
}

/**
 * ActivityBar icon section with a set of icons displayed either at the top or
 * at the bottom of the ActivityBar.
 */
export default function ActivityGroup({ activities, currentActivity }: Props) {
  return (
    <div className="flex flex-col space-y-4 items-center activity-bar-group">
      {activities.map((activity) => (
        <ActivityBarItem
          key={activity.id}
          icon={activity.icon}
          title={activity.title}
          id={activity.id}
          currentActivityName={currentActivity}
        />
      ))}
    </div>
  )
}
