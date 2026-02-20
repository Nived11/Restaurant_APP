import { Outlet } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";

const PublicRoute = () => {
  return (
    <Route path="/" element={<PublicLayout />}>
       <Outlet />
    </Route>
  );
};

// We will simplify this and put it directly in the index.jsx below