import type { SettingsItemProps } from "@core/settings/types"

import React from "react"
import { useTranslation } from "react-i18next"

import { useSettingInput } from "@core/settings/hooks/use-setting-input"

/**
 * A configurable application option.
 */
export default function SettingsItem({
  schemaKey,
  schema,
  value,
}: SettingsItemProps) {
  const { t } = useTranslation()

  const titleTranslationKey = `${schemaKey}.title`
  const descriptionTranslationKey = `${schemaKey}.description`

  const InputComponent = useSettingInput(schemaKey, schema)

  return (
    <div className="settings-item">
      <label className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between md:items-center p-8 lg:px-64 settings-item-label">
        <div className="md:w-3/4">
          <h2 className="text-center md:text-left text-lg font-bold settings-item-title">
            {t(titleTranslationKey)}
          </h2>
          <h3 className="text-sm text-center md:text-left text-neutral-500 settings-item-description">
            {t(descriptionTranslationKey)}
          </h3>
        </div>

        <div className="md:w-1/4 flex justify-center md:justify-end items-center">
          <InputComponent value={value} schema={schema} schemaKey={schemaKey} />
        </div>
      </label>
    </div>
  )
}
