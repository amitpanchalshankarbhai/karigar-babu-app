import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./English.json";
import Hindi from "./Hindi.json";
import Gujrati from "./Gujrati.json";

i18n.use(initReactI18next).init({
  lng: "English",
  fallbackLng: "English",
  resources: {
    English: English,
    Gujrati: Gujrati,
    Hindi: Hindi,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
