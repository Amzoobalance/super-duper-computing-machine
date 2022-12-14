import type { TMenu } from "@client/context-menu/types"

import React, { useState, useCallback, MouseEvent } from "react"

import Menu from "@client/context-menu/components/menu"

export const useContextMenu = (structure: TMenu) => {
  const [isShown, setIsShown] = useState(false)
  // TODO: Check if the menu may render outside the viewport. If it does, stick to X and Y with another corner.
  // TODO: Add support for submenus
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const showContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setX(event.pageX)
    setY(event.pageY)
    setIsShown(true)
  }

  const hideContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setX(0)
    setY(0)
    setIsShown(false)
  }

  const Component = useCallback(
    () => (
      <Menu isShown={isShown} structure={structure} x={x} y={y} hideContextMenu={hideContextMenu} />
    ),
    [x, y, isShown, structure]
  )

  return {
    showContextMenu,
    hideContextMenu,
    ContextMenu: Component,
  }
}
