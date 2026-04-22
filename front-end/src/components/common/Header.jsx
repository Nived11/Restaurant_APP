import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, LayoutGroup } from "framer-motion";
import { RiRestaurantLine, RiUserFill, RiStore2Line } from "react-icons/ri";
import { X } from "lucide-react";

import Logo from "../../assets/Logo-web.webp";
import mapicon from "../../assets/mapicon.webp"; 
import shopicon from "../../assets/shop.webp";
import ReserveTable from "./ReserveTable.jsx";
import SearchBar from "./SearchBar.jsx";
import ProductModal from "./ProductModal.jsx";
import Location from "./Location.jsx";
import LocationPicker from "./LocationPicker.jsx";
import { useMenu } from "../../features/user/menu/hooks/useMenu";
import { handleLocationUpdate } from "../../hooks/locationActions.js";
import { clearError } from "../../redux/locationSlice.js";
import { useAddress } from "../../features/user/profile/hooks/useAddress.js";

// Import the separated components
import { MobileNav, DesktopNav } from "./Navbar.jsx";
import CartBadge from "./CartBadge.jsx";

const modalVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
  exit: { y: "100%", opacity: 0, transition: { type: "tween", ease: "easeIn", duration: 0.2 } }
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtras, setShowExtras] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const { getCurrentLocation, isLocating } = useAddress();
  const storedName = localStorage.getItem('user_name');
  const dispatch = useDispatch();

  const { currentLocation, errorPopup, isOpen } = useSelector((state) => state.location);
  
  const searchRef = useRef(null);
  const { categories = [], allItems = [] } = useMenu();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const words = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories
        .map(cat => (typeof cat === 'object' ? cat.name : cat))
        .filter(name => name && name.toLowerCase() !== "all");
    }
    return ["Delicious Food", "Pizza", "Burger", "Biriyani"];
  }, [categories]);

  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.style.overflow = showLocationPicker ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [showLocationPicker]);

  const checkpointY = useRef(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const distanceFromCheckpoint = latest - checkpointY.current;

    if (latest < 20) {
      setShowExtras(true);
      checkpointY.current = latest;
    } else if (distanceFromCheckpoint > 60) {
      setShowExtras(false);
      checkpointY.current = latest;
    } else if (distanceFromCheckpoint < -40) {
      setShowExtras(true);
      checkpointY.current = latest;
    }
  });

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) handleCloseSearch();
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    let timeoutId;
    if (!currentLocation?.lat) {
      timeoutId = setTimeout(() => {
        getCurrentLocation()
          .then(async (loc) => {
            await dispatch(handleLocationUpdate(loc.latitude, loc.longitude));
          })
          .catch((err) => {
            setShowLocationPicker(true);
          });
      }, 6000); 
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentLocation?.lat]);

  const getErrorMessage = () => errorPopup ? (typeof errorPopup === 'object' ? errorPopup.message : errorPopup) : "";
  const isStoreClosedError = () => isOpen === false;

  return (
    <LayoutGroup>
      {/* --- Mobile Header --- */}
      <div className="rounded-b-2xl md:hidden sticky top-0 z-[100] transition-all duration-300" style={{ background: "linear-gradient(180deg, #f9a602 0%, #fffbeb 60%, #ffffff 100%)" }}>
        <div className="flex justify-center pt-0">
          <Link to="/"><img src={Logo} loading="eager" alt="Logo" className="h-20 w-50 object-contain" /></Link>
        </div>
        <div className="px-5 pb-4">
          <SearchBar
            isMobile={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} words={words}
            categories={categories} allItems={allItems} handleCloseSearch={handleCloseSearch} onSelectItem={setSelectedItem}
          />
        </div>
        <motion.div animate={{ height: showExtras ? "auto" : 0, opacity: showExtras ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
          <Location variant="mobile" address={currentLocation.address} onClick={() => setShowLocationPicker(true)} />
        </motion.div>

        <MobileNav setIsReserveOpen={setIsReserveOpen} />
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

            <DesktopNav searchOpen={searchOpen} />

            <div className="flex items-center gap-1 md:gap-3 lg:gap-6 shrink-0 relative">
              <div ref={searchRef}>
                <SearchBar
                  searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                  handleCloseSearch={handleCloseSearch} words={words} categories={categories} allItems={allItems} onSelectItem={setSelectedItem}
                />
              </div>
              <div className="flex items-center gap-1 md:gap-3 lg:gap-6">
                <CartBadge />
                <Link to="/profile" className="p-2 bg-primary border border-accent/30 shadow-md hover:bg-primary/90 rounded-full text-gray-700 flex items-center justify-center">
                  {storedName ? (
                    <div className="w-[28px] h-[28px] flex items-center justify-center text-black/80 font-black text-[18px] uppercase leading-none">
                      {storedName.charAt(0)}
                    </div>
                  ) : (
                    <RiUserFill size={26} className="text-black/80" />
                  )}
                </Link>
              </div>
            </div>
          </div>
          <motion.div initial={false} animate={{ height: showExtras ? "auto" : 0, opacity: showExtras ? 1 : 0, marginBottom: showExtras ? "12px" : "0px" }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className="flex xl:hidden w-full px-6 justify-start border-t border-gray-50 pt-2 overflow-hidden">
            <Location variant="default" address={currentLocation.address} onClick={() => setShowLocationPicker(true)} />
          </motion.div>
        </header>
      </div>

      {/* --- Modals and Popups --- */}
      <AnimatePresence>
        {errorPopup && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => dispatch(clearError())} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-[400px] rounded-[1rem] overflow-hidden shadow-2xl px-8 py-8 flex flex-col items-center">
              <div className="relative mb-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0  scale-150 " />
                <div className="relative ">
                  {isStoreClosedError() ? <img src={shopicon} alt="shopicon" className="w-20 h-20 "/> : <img src={mapicon} alt="mapicon" className="w-20 h-20" />}
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 text-center uppercase tracking-tight">
                {isStoreClosedError() ? "Store Closed !" : "Out of Range !"}
              </h3>
              <p className="text-gray-600 font-semibold text-sm leading-relaxed mb-8 text-center px-2">{getErrorMessage()}</p>
              <button onClick={() => { const closed = isStoreClosedError(); dispatch(clearError()); if (!closed) setShowLocationPicker(true); }} className="cursor-pointer w-full py-4 bg-black hover:bg-gray-900 text-white text-sm rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl"> OK</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLocationPicker && (
          <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLocationPicker(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div variants={modalVariants} initial="initial" animate="animate" exit="exit" drag={isMobile ? "y" : false} dragConstraints={{ top: 0 }} dragElastic={0.1} onDragEnd={(e, { offset, velocity }) => { if (offset.y > 100 || velocity.y > 500) setShowLocationPicker(false); }} className="relative bg-white w-full max-w-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col h-[86vh] md:h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="md:hidden flex justify-center pt-3 shrink-0"><div className="w-12 h-1 bg-gray-200 rounded-full" /></div>
              <div className="flex justify-between items-center p-6 border-b bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full "><img src={mapicon} alt="mapicon" className="w-6 h-6 object-contain" /></div>
                  <div>
                    <h4 className="font-black text-[14px] uppercase tracking-tighter text-gray-900 leading-none">Select Delivery Location</h4>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pin your exact location on map</p>
                  </div>
                </div>
                <button onClick={() => setShowLocationPicker(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"><X size={20} className="text-gray-600" /></button>
              </div>
              <div className="flex-1 relative bg-gray-50 overflow-hidden">
                <LocationPicker 
                  initialPos={currentLocation.lat ? { lat: currentLocation.lat, lng: currentLocation.lng } : null} 
                  onConfirm={async (data) => { 
                    const result = await dispatch(handleLocationUpdate(data.lat, data.lng)); 
                    if (result === true || result === "CLOSED") {
                      setShowLocationPicker(false);
                    }
                  }} 
                  getCurrentLocation={getCurrentLocation} 
                  isLocating={isLocating} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Reserve Table --- */}
      <div className="hidden md:block fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
        <motion.button 
          onTap={() => setIsReserveOpen(true)} 
          onClick={(e) => e.preventDefault()}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="cursor-pointer relative w-20 h-20 lg:w-25 lg:h-25 bg-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-4 lg:border-6 border-primary flex items-center justify-center group transition-all"
        >
          <svg className="absolute inset-0 w-full h-full " viewBox="0 0 100 100">
            <defs>
              <path id="topCurve" d="M 25,45 a 25,25 0 1,1 50,0" />
              <path id="bottomCurve" d="M 25,60 a 25,25 0 0,0 50,0" />
            </defs>
            <text className="fill-white font-black uppercase text-[8px] lg:text-[10px] tracking-[0.2em]"><textPath xlinkHref="#topCurve" startOffset="50%" textAnchor="middle">Reserve</textPath></text>
            <text className="fill-white font-black uppercase text-[8px] lg:text-[10px] tracking-[0.3em]"><textPath xlinkHref="#bottomCurve" startOffset="50%" textAnchor="middle">Table</textPath></text>
          </svg>
          <RiRestaurantLine className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 w-6 h-6 lg:w-8 lg:h-8" />
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
      <ReserveTable isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />
    </LayoutGroup>
  );
};

export default Header;