import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, User, MapPin, Search, ChevronDown, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RiHome4Line, RiRestaurantLine,RiUserStarLine,RiChatSmile3Line } from "react-icons/ri";
import Logo from "../../assets/Logo-web.png";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const location = useLocation();

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <RiHome4Line size={18} /> },
    { name: "Menu", path: "/menu", icon: <RiRestaurantLine size={18} /> },
    { name: "About Us", path: "/about", icon: <RiUserStarLine size={18} /> },
    { name: "Contact Us", path: "/contact", icon: <RiChatSmile3Line size={18} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <>
      {/* 1. FIXED DESKTOP BUTTON: Hidden on mobile, fixed bottom-right on Desktop (lg and up) */}
     <div className="hidden lg:block fixed bottom-10 right-10 z-[100]  rounded-full shadow-lg border-1 border-red-400">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative w-25 h-25 bg-black rounded-full hover:cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-6 border-primary flex items-center justify-center group transition-all"
  >
    {/* SVG for Curved Text */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        {/* Top path for "Reserve" (Clockwise) */}
        <path id="topCurve" d="M 20,50 a 30,30 0 1,1 60,0" />
        {/* Bottom path for "Table" (Counter-Clockwise so text isn't upside down) */}
        <path id="bottomCurve" d="M 20,50 a 30,30 0 0,0 60,0" />
      </defs>

      {/* Top Text */}
      <text className="fill-white font-black uppercase text-[10px] tracking-[0.3em]">
        <textPath xlinkHref="#topCurve" startOffset="50%" textAnchor="middle">
          Reserve
        </textPath>
      </text>

      {/* Bottom Text - Adjusted dy to push it to the outer edge */}
      <text className="fill-white font-black uppercase text-[10px] tracking-[0.3em]">
        <textPath xlinkHref="#bottomCurve" startOffset="50%" textAnchor="middle">
          Table
        </textPath>
      </text>
    </svg>

    {/* Center Icon */}
    <RiRestaurantLine 
      size={30} 
      className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" 
    />
  </motion.button>
</div>

      <header className="sticky top-0 z-50 bg-white rounded-b-2xl shadow-xl h-20 md:h-28 w-[95%] mx-auto mt-2 flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full flex items-center justify-between">

          {/* LEFT: Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
              <img src={Logo} alt="Logo" className="h-14 md:h-20 lg:h-24 w-auto object-contain" />
            </Link>

            <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-primary rounded-full shadow-sm">
                <MapPin size={16} className="text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Deliver To</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Add Location</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Premium Nav */}
          <nav className={`hidden lg:flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/20 p-2 rounded-full relative transition-all duration-500 shadow-sm ${searchOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-1 px-4 py-1 rounded-full text-[12px] font-bold transition-colors duration-300 z-10 ${isActive ? "text-black" : "text-gray-800 hover:text-black group"}`}
                >
                  <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
                  <span className={`flex items-center justify-center p-1 rounded-lg transition-all duration-300 ${isActive ? "bg-transparent scale-110" : ""}`}>
                    {link.icon}
                  </span>
                 <span className="whitespace-nowrap font-explorer tracking-wide ">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-primary border border-gray-700/20 rounded-full -z-20 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions & Search */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div ref={searchRef} className="relative flex items-center">
              {!searchOpen && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-3 hover:bg-gray-100 rounded-full text-gray-700 transition-all active:scale-90 cursor-pointer"
                >
                  <Search size={23} className="text-black/80" />
                </button>
              )}

              <div
                className={`flex items-center bg-primary/2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                  ${searchOpen ? 'w-[200px] md:w-[350px] px-4 py-2 opacity-100 border-2 border-primary shadow-lg' : 'w-0 opacity-0 px-0 py-0 pointer-events-none border-0'}`}
              >
                <Search size={18} className="text-black/80 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-full font-semibold  placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={searchOpen}
                />
                <button onClick={handleCloseSearch} className="shrink-0 ml-1 p-1 hover:bg-gray-200 rounded-full">
                  <X size={16} className="text-black/80" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6 shrink-0">
             

              <Link to="/cart" className="relative p-3 hover:bg-gray-100 rounded-full text-gray-700">
                <ShoppingCart size={23} className="text-black/80" />
                <span className="absolute top-1 right-1 bg-black border border-2 border-yellow-500  text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black border-2 border-white">
                  3
                </span>
              </Link>
               <Link to="/profile" className="p-2 bg-primary border border-accent/30 shadow-md hover:bg-primary/90 rounded-full text-gray-700">
                <User size={25}  className="text-black/80"  />
              </Link>

              {/* 2. MOBILE/TABLET BUTTON: Hidden on large screens, shows in header for small screens */}
              <button className="lg:hidden bg-black text-white text-[12px] font-black px-5 py-2.5 rounded-full hover:bg-primary hover:text-black transition-all whitespace-nowrap uppercase tracking-tight active:scale-95">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;