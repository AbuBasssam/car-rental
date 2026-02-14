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

i18n.on("languageChanged", (lng) => {
  if (!window.location.pathname.includes("/login")) {
    const isRTL = lng === keys.kAR;
    document.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    document.body.dir = isRTL ? "rtl" : "ltr";
  }

  localStorage.setItem(keys.kLanguage, lng);
});

export default i18n;
