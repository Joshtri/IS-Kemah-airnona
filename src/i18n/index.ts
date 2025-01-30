import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import detector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "id"], // Bahasa yang didukung
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path untuk file JSON bahasa
    },
    fallbackLng: "en", // Bahasa fallback jika tidak ada
    debug: false, // Ganti ke true untuk debugging
    interpolation: {
      escapeValue: false, // React sudah aman dari XSS
    },
  });

export default i18n;
