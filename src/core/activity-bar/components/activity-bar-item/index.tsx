import type { Activity } from "@core/activity-bar/types"

import React, { MouseEvent } from "react"

import { useIcon } from "@utils/hooks/use-icon"
import { useActivityBarItemClass } from "@core/activity-bar/components/activity-bar-item/use-activity-bar-item-class"

type Props = Activity & { currentActivityName: string }

export default function ActivityItem({
  icon,
  name,
  title,
  currentActivityName,
}: Props) {
  const Icon = useIcon(icon)
  const className = useActivityBarItemClass({ name, currentActivityName })

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    window.ordo.emit("@activity-bar/activity-selected", name)
  }

  return (
    <button onClick={handleClick}>
      <Icon className={className} title={title} />
    </button>
  )
}
