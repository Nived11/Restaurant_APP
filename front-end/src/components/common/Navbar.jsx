import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  RiHome4Fill, RiHome4Line, RiRestaurantLine,
  RiUserFill, RiUserLine, RiShoppingBag3Fill, RiShoppingBag3Line,
  RiUserStarLine, RiChatSmile3Line
} from "react-icons/ri";
import { IoFastFoodOutline, IoFastFood } from "react-icons/io5";

const springConfig = { type: "spring", stiffness: 350, damping: 30, mass: 0.5 };

export const MobileNav = memo(({ setIsReserveOpen }) => {
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
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
        <motion.button 
          onTap={() => setIsReserveOpen(true)} 
          onClick={(e) => e.preventDefault()}
          whileTap={{ scale: 0.9 }} 
          className="cursor-pointer w-14 h-14 bg-black rounded-full border-4 border-white shadow-lg flex items-center justify-center text-primary"
        >
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
  );
});

export const DesktopNav = memo(({ searchOpen }) => {
  const location = useLocation();

  return (
    <motion.nav
      animate={{ opacity: searchOpen ? 0 : 1, y: searchOpen ? 10 : 0, pointerEvents: searchOpen ? "none" : "auto" }}
      className="flex items-center gap-1 lg:gap-3 bg-white/40 backdrop-blur-md border border-white p-1.5 rounded-full relative shadow-md"
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
  );
});