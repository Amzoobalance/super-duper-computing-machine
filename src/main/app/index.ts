import { handleSelectPersonalProjectDirectory } from "@main/app/handlers/select-personal-project-directory"
import { handleSetUserSetting } from "@main/app/handlers/set-user-setting"
import { registerMainHandlers } from "@main/register-main-handlers"
import { handleListFolder } from "@main/app/handlers/list-folder"
import { handleOpenFile } from "@main/app/handlers/open-file"
import LocalSettingsStore from "@main/app/local-settings-store"
import UserSettingsStore from "@main/app/user-settings-store"

export default registerMainHandlers({
  "@app/openFile": handleOpenFile,
  "@app/listFolder": handleListFolder,
  "@app/setUserSetting": handleSetUserSetting,
  "@app/setLocalSetting": handleSetUserSetting,
  "@app/getUserSettings": () => UserSettingsStore.store,
  "@app/getLocalSettings": () => LocalSettingsStore.store,
  "@app/selectPersonalProjectDirectory": handleSelectPersonalProjectDirectory,
})
