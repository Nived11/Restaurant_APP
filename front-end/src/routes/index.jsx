import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../Layouts/AdminLayout";
import PublicLayout from "../Layouts/PublicLayout";

// Pages
import { Login, Signup, Otp, AdminLogin } from "../Pages/auth";
import { Home, Cart, Menu as UserMenu, About, Contact, Profile } from "../Pages/user";
import { Dashboard, Orders, Menu as AdminMenu, Banners, Inbox, Customers, Revenue } from "../Pages/admin";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
  const token = localStorage.getItem("admin_token");
  const role = localStorage.getItem("admin_role"); // "admin" or "staff"
  const user = { name: localStorage.getItem("admin_user"), role };

  return (
    <Routes>
      {/* 1. ADMIN AUTH: Redirect to dashboard if logged in */}
      <Route 
        path="/admin/login" 
        element={token ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} 
      />

      {/* 2. PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<UserMenu />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* 3. PROTECTED ADMIN & STAFF AREA */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout user={user} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Shared Pages */}
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="orders" element={<Orders user={user} />} />
          <Route path="menu" element={<AdminMenu user={user} />} />
          <Route path="banners" element={<Banners user={user} />} />
          <Route path="inbox" element={<Inbox user={user} />} />

          {/* Role Protection: Only "admin" can enter these paths */}
          <Route 
            path="customers" 
            element={role === "admin" ? <Customers user={user} /> : <Navigate to="/admin/dashboard" replace />} 
          />
          <Route 
            path="revenue" 
            element={role === "admin" ? <Revenue user={user} /> : <Navigate to="/admin/dashboard" replace />} 
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;