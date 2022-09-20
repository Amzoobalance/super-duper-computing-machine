import type { SettingsItemProps } from "@core/settings/types"

import React, { MouseEvent } from "react"
import { useTranslation } from "react-i18next"
import { BsFolder2Open } from "react-icons/bs"

/**
 * Input for string settings.
 */
export default function SelectFolderSetting({
  schemaKey,
  value,
}: SettingsItemProps<"project.personal.directory">) {
  const { t } = useTranslation()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    window.api
      .emit("@app/select-project-directory")
      .then((folder: string) =>
        window.api
          .emit("@app/set-user-setting", [schemaKey, folder])
          .then(() =>
            window.ordo.emit("@app/user-settings-updated", [schemaKey, folder])
          )
      )
  }

  return (
    <div className="flex space-x-4 items-end">
      <div className="text-sm break-all">{value}</div>
      <button
        title={t("project.personal.select-directory")}
        onClick={handleClick}
        className="bg-neutral-200 ring-neutral-500 dark:bg-neutral-700 p-4 border border-neutral-300 dark:border-neutral-900"
      >
        <BsFolder2Open />
      </button>
    </div>
  )
}
