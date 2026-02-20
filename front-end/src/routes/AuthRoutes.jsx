import { Route } from "react-router-dom";
import { Login, Signup, Otp , AdminLogin} from "../Pages/auth";

const AuthRoutes = () => (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/otp" element={<Otp />} />
    <Route path="/admin/login" element={<AdminLogin />} />
  </>
);

export default AuthRoutes;
