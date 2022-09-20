import type { UserSettings } from "@core/settings/types"

import React, { useState, useEffect } from "react"

import { Nullable } from "@core/types"
import { USER_SETTINGS_SCHEMA } from "@core/settings/user-settings-schema"
import { useGlobalEvent } from "@utils/hooks/use-global-event"
import Either from "@utils/either"
import i18n from "@i18n/index"

import Setting from "@core/settings/components/settings-item"
import NoOp from "@utils/no-op"
import { tap } from "ramda"

const changeLanguage = (settings: UserSettings) => {
  const newLanguage = settings["appearance.language"]
  const oldLanguage = i18n.language

  if (oldLanguage !== newLanguage) {
    i18n.changeLanguage(newLanguage)
  }
}

export default function Settings() {
  const schemaKeys = Object.keys(
    USER_SETTINGS_SCHEMA
  ) as (keyof typeof USER_SETTINGS_SCHEMA)[]

  const [userSettings, setUserSettings] = useState<Nullable<UserSettings>>(null)

  useEffect(() => {
    window.api
      .emit("@app/get-user-settings")
      .then(tap(changeLanguage))
      .then(setUserSettings)
  }, [])

  useGlobalEvent("@app/user-settings-updated", () => {
    window.api
      .emit("@app/get-user-settings")
      .then(tap(changeLanguage))
      .then(setUserSettings)
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
          />
        ))}
      </form>
    </div>
  ))
}
