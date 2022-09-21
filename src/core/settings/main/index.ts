import type { UserSettings } from "@core/settings/types"

import { dialog, nativeTheme } from "electron"

import UserSettingsStore from "@core/settings/main/user-settings"
import { registerMainHandlers } from "@core/app/register-main-handlers"
import { Theme } from "@core/theme"

export default registerMainHandlers({
  "@app/set-user-setting": <K extends keyof UserSettings>(payload: [K, UserSettings[K]]) => {
    const [key, value] = payload || []

    if (!key) return

    UserSettingsStore.set(key, value)

    if (key === "appearance.theme") {
      nativeTheme.themeSource = value as Theme
    }
  },
  "@app/get-user-settings": () => UserSettingsStore.store,
  "@app/select-project-directory": () => {
    const currentProjectDirectory = UserSettingsStore.get("project.personal.directory")

    const userInput = dialog.showOpenDialogSync({
      properties: ["openDirectory", "createDirectory", "promptToCreate", "dontAddToRecent"],
    })

    if (!userInput) return currentProjectDirectory

    return userInput[0]
  },
})
