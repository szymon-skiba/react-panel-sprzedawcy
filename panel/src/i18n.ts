import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./assets/locales/en/translation.json";
import plTranslation from "./assets/locales/pl/translation.json";

const savedLanguage = localStorage.getItem("i18nextLng") || "pl";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    pl: {
      translation: plTranslation,
    },
  },
  lng: savedLanguage,
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
