import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 border-b flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
    </header>
  );
};

export default Header;
