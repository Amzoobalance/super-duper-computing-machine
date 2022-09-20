import React, { useState } from "react"

import Either from "@utils/either"

import NoOp from "@utils/no-op"

export default function CommandBar() {
  const [isShown, setIsShown] = useState(false)

  return Either.fromBoolean(isShown).fold(NoOp, () => (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-neutral-500 bg-opacity-50 flex justify-center items-start p-48 nav-bar">
      <input
        type="search"
        className="w-96 border border-neutral-600 px-2"
        placeholder="Search"
      />
    </div>
  ))
}
