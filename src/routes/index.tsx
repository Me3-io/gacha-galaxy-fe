import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Home from "pages/home";
import Game from "pages/game";
import Login from "pages/login";

const languages = ["en", "tr", "pt", "ar", "ko", "ja", "vi", "id", "cn"];

const AppRouter = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const tokenLS = localStorage.getItem("session.token");
  const localLang = window.navigator?.language.slice(0, 2) || "en";
  const lang = window.location.pathname.split("/")[1] || localLang;

  const Secure = (component: JSX.Element): JSX.Element => {
    if (!tokenLS) return <Navigate to={`/${lang}/`} />;
    return component;
  };

  useEffect(() => {
    const langExist = languages.find((x) => x === lang);
    if (langExist) {
      i18n.changeLanguage(lang);
    } else {
      const localLangExist = languages.find((x) => x === localLang);
      if (localLangExist) {
        i18n.changeLanguage(localLang);
        navigate(`/${localLang}/`);
      } else {
        navigate(`/en/`);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to={`/${lang}/`} />} />
      <Route path="/" element={<Navigate to={`/${lang}/`} />} />
      <Route path="/:lang" element={<Login />} />
      <Route path="/:lang/home/" element={Secure(<Home />)} />
      <Route path="/:lang/game/:code" element={Secure(<Game />)} />
    </Routes>
  );
};
export default AppRouter;
