import { dialog } from "electron"

import UserSettingsStore from "@main/app/user-settings-store"

export const handleSelectPersonalProjectDirectory = () => {
  const currentProjectDirectory = UserSettingsStore.get("project.personal.directory")

  const userInput = dialog.showOpenDialogSync({
    properties: ["openDirectory", "createDirectory", "promptToCreate", "dontAddToRecent"],
  })

  if (!userInput) return currentProjectDirectory

  return userInput[0]
}
