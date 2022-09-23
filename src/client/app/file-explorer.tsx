import { useAppSelector } from "@client/state"
import React from "react"

export default function FileExplorer() {
  const currentProjectDirectory = useAppSelector((state) => state.app.personalDirectory)

  return <h1>FileExplorer</h1>
}
