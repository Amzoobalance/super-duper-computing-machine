import i18next from "i18next"
import { initReactI18next } from "react-i18next"

// TODO: Add a convenient way to import these
// TODO: Automatically append extension name `@{extension}`
import ru from "@i18n/translations/ru.json"
import ruSettings from "@core/settings/translations/ru.json"
import en from "@i18n/translations/en.json"
import enSettings from "@core/settings/translations/en.json"

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...enSettings } },
    ru: { translation: { ...ru, ...ruSettings } },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
