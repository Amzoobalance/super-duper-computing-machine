import type { SettingsItemProps } from "@core/settings/types"

import React, { ChangeEvent } from "react"

/**
 * Input for string settings.
 */
export default function StringSetting({
  schemaKey,
  value,
  onChange,
}: SettingsItemProps<"project.personal.directory">) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(schemaKey, event.target.value)
  }

  return (
    <input
      type="text"
      className="w-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-900 px-2 py-1"
      value={value}
      onBlur={handleChange}
    />
  )
}
