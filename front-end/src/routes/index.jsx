import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import AuthRoutes from "./AuthRoutes";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoute()}
      {AuthRoutes()}
      {AdminRoute(false)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
