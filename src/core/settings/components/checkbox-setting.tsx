import type { SettingsItemProps } from "@core/settings/types"

import React from "react"

// TODO: Find a better way for SettingsItemProps that does not involve Settings property keys
/**
 * Input for settings with boolean values.
 */
export default function CheckboxSetting({
  schemaKey,
  value,
  onChange,
}: SettingsItemProps<"files.confirm-move">) {
  const handleChange = () => {
    const newValue = !value
    onChange(schemaKey, newValue)
  }

  return (
    <input
      className="w-10 h-10 md:w-5 md:h-5 accent-green-700"
      type="checkbox"
      checked={value}
      onChange={handleChange}
    />
  )
}
