import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/home";
import Game from "pages/game";
import Login from "pages/login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/:lang" element={<Login />} />
      <Route path="/:lang/home/" element={<Home />} />
      <Route path="/:lang/home/:idgame" element={<Game />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter;
