import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import enTranslation from './assets/locales/en/translation.json';
import plTranslation from './assets/locales/pl/translation.json';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      pl: {
        translation: plTranslation,
      },
    },
    lng: 'pl', 
    fallbackLng: 'pl', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
