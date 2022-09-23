import type { SettingsItemProps } from "@client/app/types"

import React, { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

import Either from "@core/utils/either"
import { useAppDispatch } from "@client/state"
import { setUserSetting } from "@client/app/store"

import Null from "@client/null"

/**
 * Input for enum settings.
 */
export default function SelectSetting({
  schemaKey,
  value,
  schema,
}: SettingsItemProps<"project.personal.directory">) {
  const dispatch = useAppDispatch()
  // TODO: Add extension-level `useTranslation` that automatically appends the scope
  const { t } = useTranslation()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setUserSetting([schemaKey, event.target.value]))

  return Either.fromNullable(schema.enum).fold(Null, (options) => (
    <select
      className="w-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-900 px-2 py-1"
      value={value}
      onChange={handleChange}
    >
      {options.map((option: string) => (
        <option key={`${schemaKey}-${option}`} value={option}>
          {t(option)}
        </option>
      ))}
    </select>
  ))
}
