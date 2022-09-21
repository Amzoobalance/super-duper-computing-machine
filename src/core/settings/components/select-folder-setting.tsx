import type { SettingsItemProps } from "@core/settings/types"

import React, { MouseEvent } from "react"
import { useTranslation } from "react-i18next"

import { useOrdoEmitWithAPI } from "@utils/hooks/use-ordo-emit"
import { useIcon } from "@utils/hooks/use-icon"

/**
 * Input for string settings.
 */
export default function SelectFolderSetting({
  schemaKey,
  value,
  onChange,
}: SettingsItemProps<"project.personal.directory">) {
  const { t } = useTranslation()

  const FolderIcon = useIcon("BsFolder2Open")

  const emitSelectDirectory = useOrdoEmitWithAPI("@app/select-project-directory")

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    emitSelectDirectory().then((folder: string) => onChange(schemaKey, folder))
  }

  return (
    <div className="flex space-x-4 items-end">
      <div className="text-sm break-all">{value}</div>
      <button
        title={t("project.personal.select-directory")}
        onClick={handleClick}
        className="bg-neutral-200 ring-neutral-500 dark:bg-neutral-700 p-4 border border-neutral-300 dark:border-neutral-900"
      >
        <FolderIcon />
      </button>
    </div>
  )
}
