import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, MapPin, Search, ChevronDown, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { RiHome4Line, RiRestaurantLine, RiUserStarLine, RiChatSmile3Line } from "react-icons/ri";
import Logo from "../../assets/Logo-web.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtras, setShowExtras] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false); // For Desktop search logic
  const searchRef = useRef(null);
  const location = useLocation();

  // Optimized Scroll Logic
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (window.innerWidth < 768) {
      const diff = latest - lastScrollY.current;
      
      // If scrolled down more than 10px, hide extras
      if (diff > 10 && latest > 50) {
        setShowExtras(false);
      } 
      // If scrolled up more than 10px, show extras
      else if (diff < -10) {
        setShowExtras(true);
      }
      lastScrollY.current = latest;
    }
  });

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <RiHome4Line size={16} /> },
    { name: "Menu", path: "/menu", icon: <RiRestaurantLine size={16} /> },
    { name: "About Us", path: "/about", icon: <RiUserStarLine size={16} /> },
    { name: "Contact Us", path: "/contact", icon: <RiChatSmile3Line size={16} /> },
  ];

  return (
    <>
      {/* 1. MOBILE VIEW UI */}
      <div className="md:hidden sticky top-0 z-[100] bg-gradient-to-b from-[#FFD700] via-[#fffbeb] to-white shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Logo Container - Controlled Height for Smoothness */}
        <motion.div 
          animate={{ 
            height: showExtras ? "auto" : 0, 
            opacity: showExtras ? 1 : 0,
            marginBottom: showExtras ? "8px" : "0px" 
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center pt-4 overflow-hidden"
        >
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
        </motion.div>

        {/* Search Bar - Stays Sticky */}
        <div className="px-5 py-2">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for dishes..."
              className="bg-transparent outline-none text-sm w-full font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Location Bar - Controlled Height */}
        <motion.div 
          animate={{ 
            height: showExtras ? "auto" : 0, 
            opacity: showExtras ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-center gap-1 pb-3 text-gray-500">
            <MapPin size={14} className="text-black" />
            <span className="text-[11px] font-bold text-gray-700">Add Location</span>
            <ChevronDown size={12} className="text-gray-700" />
          </div>
        </motion.div>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] px-4 py-2 flex items-center justify-between pb-6">
          <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-primary' : 'text-gray-400'}`}>
            <RiHome4Line size={24} /><span className="text-[10px] font-bold">Home</span>
          </Link>
          <Link to="/menu" className={`flex flex-col items-center gap-1 ${location.pathname === '/menu' ? 'text-primary' : 'text-gray-400'}`}>
            <RiRestaurantLine size={24} /><span className="text-[10px] font-bold">Menu</span>
          </Link>
          <div className="relative -mt-10">
            <motion.button whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-black rounded-full border-4 border-white shadow-lg flex items-center justify-center text-primary">
              <RiRestaurantLine size={24} />
              <div className="absolute -bottom-5"><span className="text-[9px] font-black text-black uppercase">Reserve</span></div>
            </motion.button>
          </div>
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-gray-400">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] h-4 w-4 rounded-full flex items-center justify-center border border-white">3</span>
            <span className="text-[10px] font-bold">Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-400">
            <User size={24} /><span className="text-[10px] font-bold">Account</span>
          </Link>
        </nav>
      </div>

      {/* 2. DESKTOP & TABLET VIEW UI (Kept exactly as before) */}
      <div className="hidden md:block sticky top-0 z-50 pt-2">
        {/* Floating Reserve Button */}
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-20 h-20 lg:w-25 lg:h-25 bg-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-4 lg:border-6 border-primary flex items-center justify-center group transition-all">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs><path id="topCurve" d="M 25,45 a 25,25 0 1,1 50,0" /><path id="bottomCurve" d="M 25,60 a 25,25 0 0,0 50,0" /></defs>
              <text className="fill-white font-black uppercase text-[8px] lg:text-[12px] tracking-[0.2em]"><textPath xlinkHref="#topCurve" startOffset="50%" textAnchor="middle">Reserve</textPath></text>
              <text className="fill-white font-black uppercase text-[8px] lg:text-[10px] tracking-[0.3em]"><textPath xlinkHref="#bottomCurve" startOffset="50%" textAnchor="middle">Table</textPath></text>
            </svg>
            <RiRestaurantLine className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 w-6 h-6 lg:w-8 lg:h-8" />
          </motion.button>
        </div>

        <header className="bg-white rounded-b-2xl shadow-xl w-[95%] mx-auto flex flex-col items-center overflow-visible border border-gray-100">
          <div className="max-w-[1440px] h-20 md:h-24 lg:h-28 mx-auto px-4 md:px-6 lg:px-10 w-full flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
                <img src={Logo} alt="Logo" className="h-12 md:h-16 lg:h-24 w-auto object-contain" />
              </Link>
              <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-primary rounded-full shadow-sm"><MapPin size={16} className="text-black" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Deliver To</span>
                  <div className="flex items-center gap-1"><span className="text-sm font-bold text-gray-800 whitespace-nowrap">Add Location</span><ChevronDown size={14} className="text-gray-500" /></div>
                </div>
              </div>
            </div>

            <nav className={`flex items-center gap-1 lg:gap-3 bg-white/40 backdrop-blur-md border border-white/20 p-1.5 rounded-full relative transition-all duration-500 shadow-sm ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className={`relative flex items-center gap-1 px-3 lg:px-4 py-1 rounded-full text-[11px] lg:text-[12px] font-bold transition-colors duration-300 z-10 ${isActive ? "text-black" : "text-gray-800 hover:text-black"}`}>
                    <span className={isActive ? "scale-110" : "text-gray-500"}>{link.icon}</span>
                    <span className="whitespace-nowrap font-explorer tracking-wide">{link.name}</span>
                    {isActive && <motion.div layoutId="navPill" className="absolute inset-0 bg-primary border border-gray-700/20 rounded-full -z-20 shadow-md" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 md:gap-3 lg:gap-6 shrink-0 relative">
              <div ref={searchRef} className="flex items-center justify-end">
                {!searchOpen && (
                  <button onClick={() => setSearchOpen(true)} className="p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700 transition-all active:scale-90">
                    <Search size={20} className="lg:size-[23px] text-black/80" />
                  </button>
                )}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "clamp(200px, 30vw, 350px)", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white rounded-full px-4 py-2 border-2 border-primary shadow-xl z-50 overflow-hidden">
                      <Search size={18} className="text-black/80 shrink-0 mr-2" />
                      <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs lg:text-sm w-full font-semibold" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                      <button onClick={handleCloseSearch} className="shrink-0 p-1 hover:bg-gray-100 rounded-full ml-1"><X size={14} /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={`flex items-center gap-1 md:gap-3 lg:gap-6 transition-opacity duration-300 ${searchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                <Link to="/cart" className="relative p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700">
                  <ShoppingCart size={20} className="lg:size-[23px] text-black/80" />
                  <span className="absolute top-1 right-1 bg-black border-2 border-white text-white text-[9px] h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center rounded-full font-black">3</span>
                </Link>
                <Link to="/profile" className="p-2 bg-primary border border-accent/30 shadow-md hover:bg-primary/90 rounded-full text-gray-700">
                  <User size={20} className="lg:size-[25px] text-black/80" />
                </Link>
              </div>
            </div>
          </div>
          <div className="xl:hidden flex items-center px-4 md:px-6 w-full py-2 bg-gray-50/30 rounded-b-2xl">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <MapPin size={14} className="text-primary fill-primary/10" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Deliver To:</span>
              <span className="text-[11px] font-bold text-gray-800">Add Location</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;