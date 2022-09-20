import { dialog, nativeTheme } from "electron"

import type { UserSettings } from "@core/settings/types"
import { registerMainHandlers } from "@core/app/register-main-handlers"
import UserSettingsStore from "@core/settings/main/user-settings"
import { Theme } from "@core/theme"

export default registerMainHandlers({
  "@app/set-user-setting": <K extends keyof UserSettings>(
    params: [K, UserSettings[K]]
  ) => {
    const [key, value] = params

    UserSettingsStore.set(key, value)

    if (key === "appearance.theme") {
      nativeTheme.themeSource = value as Theme
    }
  },
  "@app/get-user-settings": () => UserSettingsStore.store,
  "@app/select-project-directory": () => {
    const currentProjectDirectory = UserSettingsStore.get(
      "project.personal.directory"
    )

    const userInput = dialog.showOpenDialogSync({
      properties: [
        "openDirectory",
        "createDirectory",
        "promptToCreate",
        "dontAddToRecent",
      ],
    })

    if (!userInput) return currentProjectDirectory

    return userInput[0]
  },
})
