import { Route } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import { Home, Cart } from "../Pages/user";

const PublicRoute = () => (
  <Route element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path="cart" element={<Cart />} />
  </Route>
);

export default PublicRoute;
