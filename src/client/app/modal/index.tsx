import Null from "@client/null"
import Either from "@core/utils/either"
import React, { useState, useCallback, MouseEvent, PropsWithChildren } from "react"
import { useHotkeys } from "react-hotkeys-hook"

type TProps = {
  isShown: boolean
  hideModal: (event: MouseEvent) => void
}

export const useModalWindow = () => {
  const [isShown, setIsShown] = useState(false)

  const showModal = (event?: MouseEvent) => {
    if (event) event.stopPropagation()
    setIsShown(true)
  }

  const hideModal = (event?: MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setIsShown(false)
  }

  const Component = useCallback(
    ({ children }: PropsWithChildren) => (
      <Modal isShown={isShown} hideModal={hideModal}>
        {children}
      </Modal>
    ),
    [isShown]
  )

  return {
    showModal,
    hideModal,
    Modal: Component,
  }
}

export default function Modal({ isShown, hideModal, children }: PropsWithChildren<TProps>) {
  useHotkeys("escape", (event) => hideModal(event as any))

  return Either.fromBoolean(isShown).fold(Null, () => (
    <div
      className="fixed m-0 p-10 top-0 left-0 right-0 bottom-0 cursor-default z-50 bg-neutral-500 bg-opacity-50"
      onClick={hideModal}
      onContextMenu={hideModal}
    >
      {children}
    </div>
  ))
}
