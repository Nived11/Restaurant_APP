import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../Layouts/AdminLayout";
import PublicLayout from "../Layouts/PublicLayout";

import { UserLogin, UserSignup, AdminLogin } from "../Pages/auth";
import { Home, Cart, Menu as UserMenu, About, Contact, Profile } from "../Pages/user";
import { Dashboard, Orders, Menu as AdminMenu, Bookings, Inbox, Customers, Revenue, Settings } from "../Pages/admin";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
  const adminToken = localStorage.getItem("admin_token");
  const adminRole = localStorage.getItem("admin_role");
  const adminUser = { name: localStorage.getItem("admin_user"), role: adminRole };

  const userToken = localStorage.getItem("user_token");

  return (
    <Routes>
      {/* -----------------------------------------------------------
          1. AUTH ROUTES (User & Admin Login/Signup)
      -------------------------------------------------------------- */}
      
      <Route path="/login" element={userToken ? <Navigate to="/" replace /> : <UserLogin />} />
      <Route path="/signup" element={userToken ? <Navigate to="/" replace /> : <UserSignup />} />

      <Route path="/admin/login" element={adminToken ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} />

      {/* -----------------------------------------------------------
          2. PUBLIC ROUTES (Common for all users)
      -------------------------------------------------------------- */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<UserMenu />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        
        <Route  path="profile"  element={userToken ? <Profile /> : <Navigate to="/login" replace />} />
      </Route>

      {/* -----------------------------------------------------------
          3. PROTECTED ADMIN & STAFF AREA
      -------------------------------------------------------------- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout user={adminUser} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard user={adminUser} />} />
          <Route path="orders" element={<Orders user={adminUser} />} />
          <Route path="menu" element={<AdminMenu user={adminUser} />} />
          <Route path="bookings" element={<Bookings user={adminUser} />} />
          <Route path="inbox" element={<Inbox user={adminUser} />} />

          {/* Admin Role Only Pages */}
          <Route 
            path="customers" 
            element={adminRole === "admin" ? <Customers user={adminUser} /> : <Navigate to="/admin/dashboard" replace />} 
          />
          <Route 
            path="revenue" 
            element={adminRole === "admin" ? <Revenue user={adminUser} /> : <Navigate to="/admin/dashboard" replace />} 
          />
          <Route 
            path="settings" 
            element={adminRole === "admin" ? <Settings user={adminUser} /> : <Navigate to="/admin/dashboard" replace />} 
          />
        </Route>
      </Route>

      {/* 4. 404 NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;