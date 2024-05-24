import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import tr from "./translations/tr.json";
import pt from "./translations/pt.json";
import ar from "./translations/ar.json";
import ko from "./translations/ko.json";
import ja from "./translations/ja.json";
import vi from "./translations/vi.json";
import id from "./translations/id.json";
import cn from "./translations/cn.json";

const resources = {
  en: { translation: { ...en } },
  tr: { translation: { ...tr } },
  pt: { translation: { ...pt } },
  ar: { translation: { ...ar } },
  ko: { translation: { ...ko } },
  ja: { translation: { ...ja } },
  vi: { translation: { ...vi } },
  id: { translation: { ...id } },
  cn: { translation: { ...cn } },
};

i18n.use(initReactI18next).init(
  {
    resources,
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "tr", "pt", "ar", "ko", "ja", "vi", "id", "cn"],
    interpolation: {
      escapeValue: false,
    },
  },
  undefined
);

export default i18n;
