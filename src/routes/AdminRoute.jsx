import { Route, Navigate } from "react-router-dom";

const AdminRoute = (isAdmin) => {
  return (
    <>
      <Route path="/admin/login" element={<div>Admin Login</div>} />

      <Route
        path="/admin/*"
        element={
          isAdmin ? (
            <div>Admin Layout</div>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<div>Dashboard</div>} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </>
  );
};

export default AdminRoute;
