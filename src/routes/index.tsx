import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter;
