import { Language } from "@core/locales"
import { Theme } from "@core/theme"
import { USER_SETTINGS_SCHEMA } from "@core/settings/user-settings-schema"

/**
 * Settings applied on each device. Controlled by user.
 */
export type UserSettings = {
  "appearance.theme": Theme
  "appearance.language": Language
  "project.personal.directory": string
  // TODO: Move to appropriate extensions
  // "graph.show-folders": boolean
  // "graph.show-links": boolean
  // "graph.show-tags": boolean
  // "graph.show-dates": boolean
  // "graph.show-checkboxes": boolean
  // "editor.show-line-numbers": boolean
  // "editor.auto-close-brackets": boolean
  // "editor.auto-close-quotes": boolean
  // "editor.auto-close-braces": boolean
  // "editor.auto-close-curly-braces": boolean
  // "editor.empty-selection-line-to-clipboard": boolean
  "files.confirm-delete": boolean
  "files.confirm-move": boolean
  "editor.font-size": number
  // "files.confirm-nested-create": boolean
}

/**
 * Settings for each device. Controlled internally.
 */
export type LocalSettings = {
  "window.position.x": number
  "window.position.y": number
  "window.width": number
  "window.height": number
  "side-bar.width": number
  "file-explorer.expanded-folders": string[]
  // "project.external.directories": string[]
}

/**
 * Project settings.
 */
export const FileAssociations: Record<string, string[]> = {
  image: [
    ".apng",
    ".avif",
    ".gif",
    ".jpg",
    ".jpeg",
    ".pgpeg",
    ".pjp",
    ".svg",
    ".webp",
    ".bmp",
    ".ico",
    ".cur",
    ".tif",
    ".tiff",
  ],
  ordo: [".mdx"],
  markdown: [".md"],
  text: [".txt"],
}

export type SettingsItemProps<
  Key extends keyof UserSettings = keyof UserSettings
> = {
  schema: typeof USER_SETTINGS_SCHEMA[Key]
  schemaKey: Key
  value: UserSettings[Key]
}
