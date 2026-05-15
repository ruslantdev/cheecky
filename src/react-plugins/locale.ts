import en from '@i18n/en.json';
import CONFIG from '@constants/config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
  },
  lng: CONFIG.defaultLocale,
  fallbackLng: CONFIG.defaultLocale,
  supportedLngs: Object.values(CONFIG.locales),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
