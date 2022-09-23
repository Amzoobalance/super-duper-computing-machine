import i18next, { use } from "i18next"
import { initReactI18next } from "react-i18next"

// TODO: Add a convenient way to import these
// TODO: Automatically append extension name `@{extension}`
import ruActivityBar from "@core/activity-bar/translations/ru.json"
import enActivityBar from "@core/activity-bar/translations/en.json"

import ruNotifications from "@core/notifications/translations/ru.json"
import enNotifications from "@core/notifications/translations/en.json"

import ruApp from "@client/app/translations/ru.json"
import enApp from "@client/app/translations/en.json"

use(initReactI18next).init({
  resources: {
    en: { translation: { ...enApp, ...enActivityBar, enNotifications } },
    ru: { translation: { ...ruApp, ...ruActivityBar, ruNotifications } },
  },
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18next
