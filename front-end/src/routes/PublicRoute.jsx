import { Route } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import { Home, Cart, Menu, About, Contact, Profile } from "../Pages/user";

const PublicRoute = () => (
  <Route path="/" element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path="cart" element={<Cart />} />
    <Route path="menu" element={<Menu />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="profile" element={<Profile />} />
  </Route>
);

export default PublicRoute;