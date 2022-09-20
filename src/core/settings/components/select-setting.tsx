import type { SettingsItemProps } from "@core/settings/types"

import React, { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

import Either from "@utils/either"

import NoOp from "@utils/no-op"

/**
 * Input for enum settings.
 */
export default function SelectSetting({
  schemaKey,
  value,
  schema,
}: SettingsItemProps<"project.personal.directory">) {
  // TODO: Add extension-level `useTranslation` that automatically appends the scope
  const { t } = useTranslation()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    window.api
      .emit("@app/set-user-setting", [schemaKey, value])
      .then(() =>
        window.ordo.emit("@app/user-settings-updated", [schemaKey, value])
      )
  }

  return Either.fromNullable(schema.enum).fold(NoOp, (options) => (
    <select
      className="w-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-900 px-2 py-1"
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={`${schemaKey}-${option}`} value={option}>
          {t(option)}
        </option>
      ))}
    </select>
  ))
}
