import { Link, useLocation } from "react-router-dom";
import { MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  RiHome4Fill, RiHome4Line, RiRestaurantLine,
  RiUserFill, RiUserLine, RiShoppingBag3Fill, RiShoppingBag3Line,
  RiUserStarLine, RiChatSmile3Line,
} from "react-icons/ri";
import { IoFastFoodOutline, IoFastFood } from "react-icons/io5";

import Logo from "../../assets/Logo-web.png";
import ReserveTable from "./ReserveTable.jsx";
import SearchBar from "./SearchBar.jsx";
import ProductModal from "./ProductModal.jsx"; 
import { useMenu } from "../../features/user/menu/hooks/useMenu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtras, setShowExtras] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  
  const searchRef = useRef(null);
  const location = useLocation();

  const { categories = [], allItems = [] } = useMenu();

  const words = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories
        .map(cat => (typeof cat === 'object' ? cat.name : cat)) 
        .filter(name => name && name.toLowerCase() !== "all"); 
    }
    return ["Delicious Food", "Pizza", "Burger", "Biryani"]; 
  }, [categories]);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 5 && latest > 10) setShowExtras(false);
    else if (diff < -5) setShowExtras(true);
    lastScrollY.current = latest;
  });

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const springConfig = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 };

  return (
    <>
      {/* Mobile Header */}
      <div className="rounded-b-2xl md:hidden sticky top-0 z-[100] transition-all duration-300" style={{ background: "linear-gradient(180deg, #f9a602 0%, #fffbeb 60%, #ffffff 100%)" }}>
        <div className="flex justify-center pt-0">
          <Link to="/"><img src={Logo} alt="Logo" className="h-20 w-50 object-contain" /></Link>
        </div>
        
        <div className="px-5 pb-4">
          <SearchBar 
            isMobile={true} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            words={words} 
            categories={categories}
            allItems={allItems} 
            handleCloseSearch={handleCloseSearch}
            onSelectItem={(item) => setSelectedItem(item)} 
          />
        </div>

        <AnimatePresence>
          {showExtras && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center px-5 gap-1 pb-3 text-gray-500">
                <MapPin size={14} className="text-black" />
                <span className="text-[11px] font-bold text-gray-700">Kakkanad, Ernakulam, Kerala</span>
                <ChevronDown size={12} className="text-gray-700" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] px-2 py-1 flex items-center justify-around pb-4">
          {[
            { name: "Home", path: "/", icon: <RiHome4Line size={22} />, activeIcon: <RiHome4Fill size={22} /> },
            { name: "Menu", path: "/menu", icon: <IoFastFoodOutline size={22} />, activeIcon: <IoFastFood size={22} /> },
          ].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-xl">
                {isActive && <motion.div layoutId="mobileNavPill" className="absolute inset-0 bg-primary rounded-xl" transition={springConfig} />}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={isActive ? "text-black" : "text-gray-600"}>{isActive ? link.activeIcon : link.icon}</div>
                  <span className="text-[9px] font-black">{link.name}</span>
                </div>
              </Link>
            );
          })}
          
          <div className="relative -mt-12 mx-2">
            <motion.button onClick={() => setIsReserveOpen(true)} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-black rounded-full border-4 border-white shadow-lg flex items-center justify-center text-primary">
              <RiRestaurantLine size={24} />
              <div className="absolute -bottom-5"><span className="text-[9px] font-black text-black uppercase">Reserve</span></div>
            </motion.button>
          </div>

          {[
            { name: "Cart", path: "/cart", icon: <RiShoppingBag3Line size={22} />, activeIcon: <RiShoppingBag3Fill size={22} />, badge: 3 },
            { name: "Account", path: "/profile", icon: <RiUserLine size={22} />, activeIcon: <RiUserFill size={22} /> },
          ].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-xl">
                {isActive && <motion.div layoutId="mobileNavPill" className="absolute inset-0 bg-primary rounded-xl" transition={springConfig} />}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    {isActive ? link.activeIcon : link.icon}
                    {link.badge && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white">{link.badge}</span>}
                  </div>
                  <span className="text-[9px] font-black">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50">
        {/* Floating Reserve Button */}
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
          <motion.button 
            onClick={() => setIsReserveOpen(true)}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="cursor-pointer relative w-20 h-20 lg:w-25 lg:h-25 bg-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-4 lg:border-6 border-primary flex items-center justify-center group transition-all"
          >
            <svg className="absolute inset-0 w-full h-full " viewBox="0 0 100 100">
              <defs>
                <path id="topCurve" d="M 25,45 a 25,25 0 1,1 50,0" />
                <path id="bottomCurve" d="M 25,60 a 25,25 0 0,0 50,0" />
              </defs>
              <text className="fill-white font-black uppercase text-[8px] lg:text-[10px] tracking-[0.2em]">
                <textPath xlinkHref="#topCurve" startOffset="50%" textAnchor="middle">Reserve</textPath>
              </text>
              <text className="fill-white font-black uppercase text-[8px] lg:text-[10px] tracking-[0.3em]">
                <textPath xlinkHref="#bottomCurve" startOffset="50%" textAnchor="middle">Table</textPath>
              </text>
            </svg>
            <RiRestaurantLine className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 w-6 h-6 lg:w-8 lg:h-8" />
          </motion.button>
        </div>

        <header className="bg-white rounded-b-2xl shadow-xl w-[95%] mx-auto flex flex-col items-center border border-gray-100 overflow-visible">
          <div className="max-w-[1440px] h-20 md:h-24 lg:h-28 mx-auto px-4 md:px-6 lg:px-10 w-full flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <Link to="/" className="shrink-0 transition-transform hover:scale-105">
                <img src={Logo} alt="Logo" className="h-12 md:h-16 lg:h-24 w-auto object-contain" />
              </Link>
              <motion.div 
                animate={{ 
                  opacity: searchOpen ? 0 : 1, 
                  x: searchOpen ? -20 : 0,
                  display: searchOpen ? "none" : "flex"
                }}
                className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-100"
              >
                <div className="p-2 bg-primary rounded-full shadow-sm"><MapPin size={16} className="text-black" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Deliver To</span>
                  <div className="flex items-center gap-1"><span className="text-sm font-bold text-gray-800 whitespace-nowrap">Kakkanad, Ernakulam...</span><ChevronDown size={14} className="text-gray-500" /></div>
                </div>
              </motion.div>
            </div>

            <motion.nav 
              animate={{ 
                opacity: searchOpen ? 0 : 1, 
                y: searchOpen ? 10 : 0,
                pointerEvents: searchOpen ? "none" : "auto"
              }}
              className="flex items-center gap-1 lg:gap-3 bg-white/40 backdrop-blur-md border border-white/20 p-1.5 rounded-full relative shadow-sm"
            >
              {[
                { name: "Home", path: "/", icon: <RiHome4Line size={16} /> },
                { name: "Menu", path: "/menu", icon: <IoFastFoodOutline size={16} /> },
                { name: "About Us", path: "/about", icon: <RiUserStarLine size={16} /> },
                { name: "Contact Us", path: "/contact", icon: <RiChatSmile3Line size={16} /> }
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className={`relative flex items-center gap-1 px-3 lg:px-4 py-1.5 rounded-full text-[11px] lg:text-[12px] font-bold transition-colors duration-200 z-10 ${isActive ? "text-black" : "text-gray-800 hover:text-black"}`}>
                    <span className={isActive ? "scale-110" : "text-gray-500"}>{link.icon}</span>
                    <span className="whitespace-nowrap font-explorer tracking-wide">{link.name}</span>
                    {isActive && <motion.div layoutId="navPill" className="absolute inset-0 bg-primary border border-gray-700/20 rounded-full -z-20 shadow-md" transition={springConfig} />}
                  </Link>
                );
              })}
            </motion.nav>

            <div className="flex items-center gap-1 md:gap-3 lg:gap-6 shrink-0 relative">
              <div ref={searchRef} className="flex items-center justify-center relative">
                <SearchBar 
                  searchOpen={searchOpen} 
                  setSearchOpen={setSearchOpen}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleCloseSearch={handleCloseSearch}
                  words={words}
                  categories={categories}
                  allItems={allItems} 
                  onSelectItem={(item) => setSelectedItem(item)} // ഡെസ്ക്ടോപ്പിലും മോഡൽ ഓപ്പൺ ചെയ്യാൻ
                />
              </div>

              <div className="flex items-center gap-1 md:gap-3 lg:gap-6">
                <Link to="/cart" className="relative p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700">
                  <RiShoppingBag3Line size={23} className="text-black/80" />
                  <span className="absolute top-1 right-1 bg-black border-2 border-white text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full font-black">3</span>
                </Link>
                <Link to="/profile" className="p-2 bg-primary border border-accent/30 shadow-md hover:bg-primary/90 rounded-full text-gray-700">
                  <RiUserFill size={25} className="text-black/80" />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>

      <ReserveTable isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />
    </>
  );
};

export default Header;