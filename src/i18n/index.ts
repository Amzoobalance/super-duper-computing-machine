import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import ru from "@i18n/translations/ru.json"
import en from "@i18n/translations/en.json"

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
