import React from "react";
import { motion } from "framer-motion";
import { LogOut, User2, ShoppingBag, MapPin } from "lucide-react";
import { useUserLogout } from "../../../../hooks/useUserLogout";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const { handleLogout } = useUserLogout();

  const tabItems = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <User2 size={14} strokeWidth={2.5} /> 
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: <ShoppingBag size={14} strokeWidth={2.5} /> 
    },
    { 
      id: 'address', 
      label: 'Address', 
      icon: <MapPin size={14} strokeWidth={2.5} /> 
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center border-b border-gray-100 bg-white relative">
      
      {/* 1. Logout Button - Size slightly increased for mobile */}
      <div className="flex justify-end p-3 md:p-0 md:absolute md:right-8 lg:right-14">
        <button 
          onClick={handleLogout}
          className="cursor-pointer group flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2 bg-red-50 hover:bg-red-600 rounded-xl transition-all duration-300 border border-red-100 hover:border-red-600 shadow-sm"
        >
          <LogOut size={12} className="text-red-600 group-hover:text-white transition-colors" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-red-600 group-hover:text-white">
            Logout
          </span>
        </button>
      </div>

      {/* 2. Tabs Section */}
      <div className="flex w-full md:w-auto md:mx-auto px-2 md:px-0">
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none cursor-pointer py-4 md:py-7 px-1 md:px-10 relative flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 transition-all group`}
            >
              {/* Icon Container */}
              <div className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105" 
                  : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900"
              }`}>
                {tab.icon}
              </div>
              
              {/* Text Visibility Improved */}
              <span className={`text-[9px] md:text-[12px] font-black uppercase tracking-wider transition-colors ${
                isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
              }`}>
                {tab.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-1 bg-primary rounded-t-full" 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;