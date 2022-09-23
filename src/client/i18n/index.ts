import i18next, { use } from "i18next"
import { initReactI18next } from "react-i18next"

// TODO: Add a convenient way to import these
// TODO: Automatically append extension name `@{extension}`
import ru from "@core/translations/ru.json"
import en from "@core/translations/en.json"

import ruSettings from "@client/app/translations/ru.json"
import enSettings from "@client/app/translations/en.json"

use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...enSettings } },
    ru: { translation: { ...ru, ...ruSettings } },
  },
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18next
