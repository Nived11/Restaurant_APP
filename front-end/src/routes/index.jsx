// src/routes/index.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import AdminRoute from "./AdminRoute";
import AdminLayout from "../Layouts/AdminLayout";
import PublicLayout from "../Layouts/PublicLayout";

import { UserLogin, UserSignup, AdminLogin } from "../Pages/auth";
import { Home, Cart, Menu as UserMenu, About, Contact, Profile } from "../Pages/user";
import { Dashboard, Orders, Menu as AdminMenu, Bookings, Inbox, Reviews, Customers, Revenue, Settings } from "../Pages/admin";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

if (isLoading) {
      return null; 
  }

  const isAdminOrStaff = isAuthenticated && (user?.role === "admin" || user?.role === "staff");
  const isRegularUser = isAuthenticated && user?.role === "user";
  const adminInfo = isAdminOrStaff ? { role: user.role } : { role: null };

  return (
    <Routes>
      {/* -----------------------------------------------------------
           1. AUTH ROUTES 
      -------------------------------------------------------------- */}
      <Route
        path="/login"
        element={
          isRegularUser ? (
            <Navigate to="/" replace={true} state={{ from: null }} />
          ) : (
            <UserLogin />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isRegularUser ? (
            <Navigate to="/" replace={true} state={{ from: null }} />
          ) : (
            <UserSignup />
          )
        }
      />
      <Route
        path="/admin/login"
        element={isAdminOrStaff ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
      />

      {/* -----------------------------------------------------------
           2. PUBLIC & USER ROUTES
      -------------------------------------------------------------- */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<UserMenu />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="profile"
          element={isRegularUser ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Route>

      {/* -----------------------------------------------------------
           3. PROTECTED ADMIN & STAFF AREA
      -------------------------------------------------------------- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout user={adminInfo} />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard user={adminInfo} />} />
          <Route path="orders" element={<Orders user={adminInfo} />} />
          <Route path="menu" element={<AdminMenu user={adminInfo} />} />
          <Route path="bookings" element={<Bookings user={adminInfo} />} />
          <Route path="inbox" element={<Inbox user={adminInfo} />} />

          <Route
            path="reviews"
            element={user?.role === "admin" ? <Reviews user={adminInfo} /> : <Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="customers"
            element={user?.role === "admin" ? <Customers user={adminInfo} /> : <Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="revenue"
            element={user?.role === "admin" ? <Revenue user={adminInfo} /> : <Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="settings"
            element={user?.role === "admin" ? <Settings user={adminInfo} /> : <Navigate to="/admin/dashboard" replace />}
          />
        </Route>
      </Route>

      {/* 4. 404 NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;