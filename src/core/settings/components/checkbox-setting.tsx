import type { SettingsItemProps } from "@core/settings/types"

import React from "react"

/**
 * Input for settings with boolean values.
 */
export default function CheckboxSetting({
  schemaKey,
  value,
}: SettingsItemProps<"files.confirm-move">) {
  const handleChange = () => {
    const newValue = !value

    window.api
      .emit("@app/set-user-setting", [schemaKey, newValue])
      .then(() =>
        window.ordo.emit("@app/user-settings-updated", [schemaKey, newValue])
      )
  }

  return (
    <input
      className="w-10 h-10 md:w-5 h-5 accent-green-700"
      type="checkbox"
      checked={value}
      onChange={handleChange}
    />
  )
}
