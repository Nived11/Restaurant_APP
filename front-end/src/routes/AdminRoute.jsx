import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Redux ഇംപോർട്ട് ചെയ്തു

const AdminRoute = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return null; // അല്ലെങ്കിൽ നിങ്ങളുടെ ലോഡർ കൊടുക്കാം
  }

  const isAdminOrStaff = isAuthenticated && (user?.role === "admin" || user?.role === "staff");

  if (!isAdminOrStaff) {
    return <Navigate to="/admin/login" replace />;
  }

  const userInfo = { role: user.role };

  return <Outlet context={{ user: userInfo }} />;
};

export default AdminRoute;