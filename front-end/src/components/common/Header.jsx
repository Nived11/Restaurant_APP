import { Link } from "react-router-dom";
import { ShoppingCart, User, MapPin, Search } from "lucide-react";
import Logo from "../../assets/Logo-web.png"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="The Crunch Logo" className="h-12 w-auto" />
        </Link>

        {/* MIDDLE-LEFT: Location Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-transparent focus-within:border-yellow-400">
          <MapPin size={18} className="text-yellow-600" />
          <input 
            type="text"
            placeholder="Search location..."
            className="bg-transparent outline-none text-sm w-48"
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/menu" className="hover:text-yellow-500 transition">Menu</Link>
          <Link to="/orders" className="hover:text-yellow-500 transition">Orders</Link>
        </nav>

        <div className="flex items-center gap-4 border-l pl-6">
          <Link to="/cart" className="relative p-2 hover:bg-yellow-50 rounded-full transition">
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-1.5 rounded-full">3</span>
          </Link>
          <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition">
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;