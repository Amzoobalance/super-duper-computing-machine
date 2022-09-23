import i18next, { use } from "i18next"
import { initReactI18next } from "react-i18next"

// TODO: Add a convenient way to import these
// TODO: Automatically append extension name `@{extension}`
import ruEditor from "@core/editor/translations/ru.json"
import enEditor from "@core/editor/translations/en.json"

import ruNotifications from "@core/notifications/translations/ru.json"
import enNotifications from "@core/notifications/translations/en.json"

import ruApp from "@core/app/translations/ru.json"
import enApp from "@core/app/translations/en.json"

use(initReactI18next).init({
  resources: {
    en: { translation: { ...enApp, ...enEditor, ...enNotifications } },
    ru: { translation: { ...ruApp, ...ruEditor, ...ruNotifications } },
  },
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18next
