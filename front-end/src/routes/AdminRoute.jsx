// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // We read this EVERY time the route changes
  const token = localStorage.getItem("admin_token");
  const role = localStorage.getItem("admin_role");
  const username = localStorage.getItem("admin_user");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const user = { name: username, role: role };

  // Passing user through context is good, but ensure Layout receives it
  return <Outlet context={{ user }} />;
};

export default AdminRoute;