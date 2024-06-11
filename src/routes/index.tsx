import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/home";
import Game from "pages/game";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:lang/" element={<Home />} />
      <Route path="/:lang/:idgame" element={<Game />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter;
