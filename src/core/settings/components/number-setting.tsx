import type { SettingsItemProps } from "@core/settings/types"

import React, { ChangeEvent } from "react"

/**
 * Input for string settings.
 */
export default function NumberSetting({
  schemaKey,
  value,
}: SettingsItemProps<"editor.font-size">) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    window.api
      .emit("@app/set-user-setting", [schemaKey, value])
      .then(() =>
        window.ordo.emit("@app/user-settings-updated", [schemaKey, value])
      )
  }

  return (
    <input
      type="number"
      className="w-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-900 px-2 py-1"
      value={value}
      onChange={handleChange}
    />
  )
}
