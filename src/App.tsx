import { useEffect } from "react";
import AppRouter from "routes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./App.css";
import "./i18n";

const languages = ["en", "tr", "pt", "ar", "ko", "ja", "vi", "id", "cn"];

function App() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = window.location.pathname.split("/")[1];

  useEffect(() => {
    if (lang) {
      const exist = languages.find((x) => x === lang);
      if (exist) {
        i18n.changeLanguage(lang);
      } else {
        navigate(`/en/`);
      }
    } else {
      const localLang = window.navigator?.language.slice(0, 2) || "en";
      const exist = languages.find((x) => x === localLang);
      if (exist) {
        i18n.changeLanguage(localLang);
        navigate(`/${localLang}/`);
      } else {
        navigate(`/en/`);
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return <AppRouter />;
}

export default App;
