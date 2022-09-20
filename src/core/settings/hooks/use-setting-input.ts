import { USER_SETTINGS_SCHEMA } from "@core/settings/user-settings-schema"
import Switch from "@utils/switch"

import CheckboxSetting from "@core/settings/components/checkbox-setting"
import SelectSetting from "@core/settings/components/select-setting"
import StringSetting from "@core/settings/components/string-setting"
import NumberSetting from "@core/settings/components/number-setting"
import SelectFolderSetting from "@core/settings/components/select-folder-setting"
import NoOp from "@utils/no-op"

export const useSettingInput = <Key extends keyof typeof USER_SETTINGS_SCHEMA>(
  key: Key,
  property: typeof USER_SETTINGS_SCHEMA[Key]
) =>
  Switch.of(property)
    .case((prop) => Boolean(prop.enum), SelectSetting)
    .case(() => key === "project.personal.directory", SelectFolderSetting)
    .case((prop) => prop.type === "boolean", CheckboxSetting)
    .case((prop) => prop.type === "string", StringSetting)
    .case((prop) => prop.type === "number", NumberSetting)
    .default(NoOp)
