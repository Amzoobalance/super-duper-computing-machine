import type { Activity } from "@core/activity-bar/types"

import React from "react"
import { useTranslation } from "react-i18next"

import { useIcon } from "@utils/hooks/use-icon"
import { useOrdoEmit } from "@utils/hooks/use-ordo-emit"
import { useActivityBarItemClass } from "@core/activity-bar/hooks/use-activity-bar-item-class"

type Props = Activity & { currentActivityName: string }

/**
 * Activity bar icon with title and click handler.
 */
export default function ActivityBarItem({
  icon,
  id: name,
  title,
  currentActivityName,
}: Props) {
  const Icon = useIcon(icon)
  const className = useActivityBarItemClass({ name, currentActivityName })
  const { t } = useTranslation()
  const emitSelectActivity = useOrdoEmit("@activity-bar/select-activity")

  const translatedTitle = t(title)

  const handleClick = () => emitSelectActivity(name)

  return (
    <button onClick={handleClick} className="activity-bar-button">
      <Icon className={className} title={translatedTitle} />
    </button>
  )
}
