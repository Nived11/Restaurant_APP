import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  RiHome4Fill, RiHome4Line, RiRestaurantLine,
  RiUserFill, RiUserLine, RiShoppingBag3Fill, RiShoppingBag3Line,
  RiUserStarLine, RiChatSmile3Line,
} from "react-icons/ri";
import { IoFastFoodOutline, IoFastFood } from "react-icons/io5";
import { X, MapPin } from "lucide-react";

import Logo from "../../assets/Logo-web.png";
import ReserveTable from "./ReserveTable.jsx";
import SearchBar from "./SearchBar.jsx";
import ProductModal from "./ProductModal.jsx";
import Location from "./Location.jsx";
import LocationPicker from "./LocationPicker.jsx";
import { useMenu } from "../../features/user/menu/hooks/useMenu";
import { handleLocationUpdate } from "../../hooks/locationActions.js";
import { clearError } from "../../redux/locationSlice.js";
import { useAddress } from "../../features/user/profile/hooks/useAddress.js";
import { fetchCart } from "../../redux/cartSlice.js"; 

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtras, setShowExtras] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const { getCurrentLocation, isLocating } = useAddress();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { currentLocation, errorPopup } = useSelector((state) => state.location);

  const searchRef = useRef(null);
  const location = useLocation();
  const { categories = [], allItems = [] } = useMenu();

  const cartCount = cartItems.length;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const token = localStorage.getItem('user_access');
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

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

  // Background Scroll Toggle
  useEffect(() => {
    if (showLocationPicker) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showLocationPicker]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 10 && latest > 50) {
      setShowExtras(false);
    } else if (diff < -10 || latest < 20) {
      setShowExtras(true);
    }
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

  useEffect(() => {
    const askForLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported");
        return;
      }

      const options = {
        enableHighAccuracy: true, 
        timeout: 15000,           
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          dispatch(handleLocationUpdate(latitude, longitude));
        },
        (err) => {
        },
        options
      );
    };

    if (!currentLocation.lat) {
      askForLocation();
    }
  }, [dispatch, currentLocation.lat]);

  const springConfig = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 };

  const modalVariants = {
    initial: { y: "100%", opacity: 0.5 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 280, mass: 0.5 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <>
      {/* --- Mobile Header --- */}
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

        <motion.div
          animate={{ height: showExtras ? "auto" : 0, opacity: showExtras ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <Location variant="mobile" address={currentLocation.address} onClick={() => setShowLocationPicker(true)} />
        </motion.div>

        {/* Mobile Bottom Nav */}
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
            { name: "Cart", path: "/cart", icon: <RiShoppingBag3Line size={22} />, activeIcon: <RiShoppingBag3Fill size={22} />, badge: cartCount > 0 ? cartCount : null },
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

      {/* --- Desktop & Tablet Header --- */}
      <div className="hidden md:block sticky top-0 z-50">
        <header className="bg-white rounded-b-2xl shadow-xl w-[95%] mx-auto flex flex-col items-center border border-gray-100 relative">
          <div className="max-w-[1440px] h-20 md:h-24 lg:h-28 mx-auto px-4 md:px-6 lg:px-10 w-full flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <Link to="/" className="shrink-0 transition-transform hover:scale-105">
                <img src={Logo} alt="Logo" className="h-12 md:h-16 lg:h-24 w-auto object-contain" />
              </Link>
              {!searchOpen && <Location variant="desktop" address={currentLocation.address} onClick={() => setShowLocationPicker(true)} />}
            </div>

            <motion.nav
              animate={{ opacity: searchOpen ? 0 : 1, y: searchOpen ? 10 : 0, pointerEvents: searchOpen ? "none" : "auto" }}
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
                  <Link key={link.path} to={link.path} className={`relative flex items-center gap-1 px-3 lg:px-4 py-1.5 rounded-full text-[11px] lg:text-[12px] font-bold z-10 ${isActive ? "text-black" : "text-gray-800 hover:text-black"}`}>
                    <span className={isActive ? "scale-110" : "text-gray-500"}>{link.icon}</span>
                    <span className="whitespace-nowrap font-explorer tracking-wide">{link.name}</span>
                    {isActive && <motion.div layoutId="navPill" className="absolute inset-0 bg-primary border border-gray-700/20 rounded-full -z-20 shadow-md" transition={springConfig} />}
                  </Link>
                );
              })}
            </motion.nav>

            <div className="flex items-center gap-1 md:gap-3 lg:gap-6 shrink-0 relative">
              <div ref={searchRef}>
                <SearchBar
                  searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery} handleCloseSearch={handleCloseSearch} words={words}
                  categories={categories} allItems={allItems} onSelectItem={(item) => setSelectedItem(item)}
                />
              </div>
              <div className="flex items-center gap-1 md:gap-3 lg:gap-6">
                <Link to="/cart" className="relative p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700">
                  <RiShoppingBag3Line size={23} className="text-black/80" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-black border-2 border-white text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full font-black">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="p-2 bg-primary border border-accent/30 shadow-md hover:bg-primary/90 rounded-full text-gray-700">
                  <RiUserFill size={25} className="text-black/80" />
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: showExtras ? "auto" : 0,
              opacity: showExtras ? 1 : 0,
              marginBottom: showExtras ? "12px" : "0px"
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex xl:hidden w-full px-6 justify-start border-t border-gray-50 pt-2 overflow-hidden"
          >
            <Location variant="default" address={currentLocation.address} onClick={() => setShowLocationPicker(true)} />
          </motion.div>
        </header>
      </div>

      {/* --- Error Popup --- */}
      <AnimatePresence>
        {errorPopup && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => dispatch(clearError())} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl px-8 py-8 flex flex-col items-center">
              <div className="relative mb-6">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-sm" />
                <div className="relative bg-primary p-4 rounded-full shadow-lg shadow-primary/40"><MapPin size={32} className="text-white" /></div>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 text-center uppercase tracking-tight">Out of Range !</h3>
              <p className="text-gray-600 font-semibold text-sm leading-relaxed mb-8 text-center px-2">{errorPopup}</p>
              <button 
                onClick={() => {
                  dispatch(clearError());
                  setShowLocationPicker(true); 
                }} className="cursor-pointer w-full py-4 bg-black hover:bg-gray-900 text-white text-sm rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl"> OK</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Location Picker Modal --- */}
      <AnimatePresence>
        {showLocationPicker && (
          <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLocationPicker(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              variants={modalVariants} initial="initial" animate="animate" exit="exit"
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) setShowLocationPicker(false);
              }}
              className="relative bg-white w-full max-w-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col h-[90vh] md:h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:hidden flex justify-center pt-3 shrink-0"><div className="w-12 h-1 bg-gray-200 rounded-full" /></div>

              <div className="flex justify-between items-center p-6 border-b bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-xl"><MapPin size={20} className="text-black" /></div>
                  <div>
                    <h4 className="font-black text-[14px] uppercase tracking-tighter text-gray-900 leading-none">Select Delivery Location</h4>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pin your exact location on map</p>
                  </div>
                </div>
                <button onClick={() => setShowLocationPicker(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 relative bg-gray-50 overflow-hidden">
                <LocationPicker
                  initialPos={currentLocation.lat ? { lat: currentLocation.lat, lng: currentLocation.lng } : null}
                  onConfirm={(data) => {
                    dispatch(handleLocationUpdate(data.lat, data.lng));
                    setShowLocationPicker(false);
                  }}
                  getCurrentLocation={getCurrentLocation}
                  isLocating={isLocating}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Desktop Floating Reserve Button --- */}
      <div className="hidden md:block fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
        <motion.button onClick={() => setIsReserveOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer relative w-20 h-20 lg:w-25 lg:h-25 bg-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-4 lg:border-6 border-primary flex items-center justify-center group transition-all">
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

      <AnimatePresence>
        {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
      <ReserveTable isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />
    </>
  );
};

export default Header;