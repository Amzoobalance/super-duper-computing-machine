import Null from "@client/null"
import { IconName, useIcon } from "@client/use-icon"
import { Thunk } from "@core/types"
import Either from "@core/utils/either"
import React, { useState, useCallback, MouseEvent } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslation } from "react-i18next"

type TProps = {
  structure: TMenu
  isShown: boolean
  hideContextMenu: (event: MouseEvent) => void
  x: number
  y: number
}

export const useContextMenu = (structure: TMenu) => {
  const [isShown, setIsShown] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const showContextMenu = (event: MouseEvent) => {
    event.stopPropagation()
    setX(event.pageX)
    setY(event.pageY)
    setIsShown(true)
  }

  const hideContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setIsShown(false)
  }

  const Component = useCallback(
    () => (
      <ContextMenu
        isShown={isShown}
        structure={structure}
        hideContextMenu={hideContextMenu}
        x={x}
        y={y}
      />
    ),
    [x, y, isShown, structure]
  )

  return {
    showContextMenu,
    hideContextMenu,
    ContextMenu: Component,
  }
}

export default function ContextMenu({ structure, isShown, hideContextMenu, x, y }: TProps) {
  useHotkeys("escape", (event) => hideContextMenu(event as any))

  return Either.fromBoolean(isShown).fold(Null, () => (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 cursor-default"
      onClick={hideContextMenu}
      onContextMenu={hideContextMenu}
    >
      <div
        style={{ marginLeft: `${x}px`, marginTop: `${y}px` }}
        className="inline-block bg-neutral-200 dark:bg-neutral-600 w-auto shadow-lg"
      >
        {structure.children.map((child, index) => (
          <MenuItem item={child} key={index} hideContextMenu={hideContextMenu} />
        ))}
      </div>
    </div>
  ))
}

const MenuItem = ({
  item,
  hideContextMenu,
}: {
  item: TMenuItem
  hideContextMenu: (event: MouseEvent) => void
}) => {
  const Icon = useIcon(item.icon)
  const { t } = useTranslation()

  const title = t(item.title)

  const onClick = (event: MouseEvent) => {
    hideContextMenu(event)

    if (item.action) item.action()
  }

  return item.title === "separator" ? (
    <hr className="border-t border-neutral-300 dark:border-nutral-700" />
  ) : (
    <div className="hover-passive px-4 py-1 text-sm flex items-center space-x-2" onClick={onClick}>
      <Icon className="shrink-0" />
      <div title={title} className="truncate">
        {title}
      </div>
    </div>
  )
}

export type TMenuItem = {
  accelerator?: string
  title: string
  icon?: IconName
  action?: Thunk<any>
}

export type TMenu = {
  children: TMenuItem[]
}
