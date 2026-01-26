import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import arTranslation from "./locales/ar.json";
import enTranslation from "./locales/en.json";
import { keys } from "./utils/constants";

const resources = {
  ar: { translation: arTranslation },
  en: { translation: enTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: keys.kEN,
    lng: localStorage.getItem(keys.kLanguage) || keys.kEN,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// تحديث اتجاه الصفحة عند تغيير اللغة
i18n.on("languageChanged", (lng) => {
  document.dir = lng === keys.kAR ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem(keys.kLanguage, lng);
});

export default i18n;
