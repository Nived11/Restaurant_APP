import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import AdminRoute from "./AdminRoute";
import AdminLayout from "../Layouts/AdminLayout";
import PublicLayout from "../Layouts/PublicLayout";
import NotFound from "../Pages/NotFound.jsx";

// Auth Pages
const UserLogin = lazy(() => import("../Pages/auth").then(m => ({ default: m.UserLogin })));
const UserSignup = lazy(() => import("../Pages/auth").then(m => ({ default: m.UserSignup })));
const AdminLogin = lazy(() => import("../Pages/auth").then(m => ({ default: m.AdminLogin })));

// User Pages
const Home = lazy(() => import("../Pages/user").then(m => ({ default: m.Home })));
const Cart = lazy(() => import("../Pages/user").then(m => ({ default: m.Cart })));
const UserMenu = lazy(() => import("../Pages/user").then(m => ({ default: m.Menu })));
const About = lazy(() => import("../Pages/user").then(m => ({ default: m.About })));
const Contact = lazy(() => import("../Pages/user").then(m => ({ default: m.Contact })));
const Profile = lazy(() => import("../Pages/user").then(m => ({ default: m.Profile })));

// Admin Pages
const Dashboard = lazy(() => import("../Pages/admin").then(m => ({ default: m.Dashboard })));
const Orders = lazy(() => import("../Pages/admin").then(m => ({ default: m.Orders })));
const AdminMenu = lazy(() => import("../Pages/admin").then(m => ({ default: m.Menu })));
const Bookings = lazy(() => import("../Pages/admin").then(m => ({ default: m.Bookings })));
const Inbox = lazy(() => import("../Pages/admin").then(m => ({ default: m.Inbox })));
const Reviews = lazy(() => import("../Pages/admin").then(m => ({ default: m.Reviews })));
const Customers = lazy(() => import("../Pages/admin").then(m => ({ default: m.Customers })));
const Revenue = lazy(() => import("../Pages/admin").then(m => ({ default: m.Revenue })));
const Settings = lazy(() => import("../Pages/admin").then(m => ({ default: m.Settings })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#f9a602] rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
      return null; 
  }

  const isAdminOrStaff = isAuthenticated && (user?.role === "admin" || user?.role === "staff");
  const isRegularUser = isAuthenticated && user?.role === "user";
  const adminInfo = isAdminOrStaff ? { role: user.role } : { role: null };

  return (
    // 3. SUSPENSE WRAPPER
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
};

export default AppRoutes;