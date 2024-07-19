import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/home";
import Game from "pages/game";
import Login from "pages/login";

const AppRouter = () => {

  const lang = "en"; // <- TODO: Detect language from browser

  return (
    <Routes>
      <Route path="*" element={<Navigate to={`/${lang}/`} />} />
      <Route path="/" element={<Navigate to={`/${lang}/`} />} />
      <Route path="/:lang" element={<Login />} />
      <Route path="/:lang/home/" element={<Home />} />
      <Route path="/:lang/game/:code" element={<Game />} />
    </Routes>
  );
};
export default AppRouter;
