import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import { Dashboard, Orders, Menu, Banners, Inbox, Customers, Revenue } from "../Pages/admin";

const AdminRoute = () => {
  const user = { name: "Designer Mode", role: "SUPER_ADMIN" };

  return (
    <Route path="/admin" element={<AdminLayout user={user} />}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="dashboard" element={<Dashboard user={user} />} />
      <Route path="orders" element={<Orders user={user} />} />
      <Route path="menu" element={<Menu user={user} />} />
      <Route path="banners" element={<Banners user={user} />} />
      <Route path="inbox" element={<Inbox user={user} />} />
      <Route path="customers" element={<Customers user={user} />} />
      <Route path="revenue" element={<Revenue user={user} />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Route>
  );
};

export default AdminRoute;