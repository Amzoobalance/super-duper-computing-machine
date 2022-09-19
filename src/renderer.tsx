import Either from "@utils/either"
import React from "react"
import { createRoot, Root } from "react-dom/client"
import App from "@core/app"

import "./index.css"

const selectContainer = (id: string) =>
  Either.fromNullable(document.querySelector(id))

const renderComponent = (element: JSX.Element) => (root: Root) =>
  root.render(element)

Either.of("#app")
  .chain(selectContainer)
  .map(createRoot)
  .fold(
    () => console.error("Could not find application root element"),
    renderComponent(<App />)
  )
