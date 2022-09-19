import type { Activity } from "@core/activity-bar/types"

import React from "react"

import ActivityBarItem from "@core/activity-bar/components/activity-bar-item"

type Props = {
  activities: Activity[]
  currentActivity: string
}

export default function ActivityGroup({ activities, currentActivity }: Props) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      {activities.map((activity) => (
        <ActivityBarItem
          key={activity.name}
          icon={activity.icon}
          title={activity.title}
          name={activity.name}
          currentActivityName={currentActivity}
        />
      ))}
    </div>
  )
}
