import type { UserSettings } from "@core/settings/types"

import React, { useState, useEffect } from "react"

import { Nullable } from "@core/types"
import { USER_SETTINGS_SCHEMA } from "@core/settings/user-settings-schema"
import { useGlobalEvent } from "@utils/hooks/use-global-event"
import Either from "@utils/either"
import i18n from "@i18n/index"

import Setting from "@core/settings/components/settings-item"
import NoOp from "@utils/no-op"
import { useOrdoEmitWithAPI } from "@utils/hooks/use-ordo-emit"

/**
 * Application settings page.
 */
export default function Settings() {
  // TODO: Disallow opening sidebar
  const schemaKeys = Object.keys(USER_SETTINGS_SCHEMA) as (keyof typeof USER_SETTINGS_SCHEMA)[]

  const [userSettings, setUserSettings] = useState<Nullable<UserSettings>>(null)

  const emitSetUserSetting = useOrdoEmitWithAPI("@app/set-user-setting")
  const emitGetUserSettings = useOrdoEmitWithAPI("@app/get-user-settings")

  useEffect(() => {
    emitGetUserSettings().then(setUserSettings)
  }, [])

  useGlobalEvent("@app/set-user-setting::applied", () => {
    emitGetUserSettings().then(setUserSettings)
  })

  return Either.fromNullable(userSettings).fold(NoOp, (settings) => (
    <div className="settings">
      <form className="settings-form">
        {schemaKeys.map((key) => (
          <Setting
            key={key}
            schemaKey={key}
            schema={USER_SETTINGS_SCHEMA[key]}
            value={settings[key]}
            onChange={(key, value) => emitSetUserSetting([key, value])}
          />
        ))}
      </form>
    </div>
  ))
}
