import React from "react";
import { motion } from "framer-motion";

const ProfileTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-50 px-4 md:px-14 bg-white overflow-x-auto no-scrollbar">
    {['profile', 'orders', 'address'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`cursor-pointer py-4 md:py-6 px-4 md:px-8 relative text-[9px] md:text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
          activeTab === tab ? "text-primary" : "text-gray-600 hover:text-gray-600"
        }`}
      >
        {tab === 'profile' ? 'Profile' : tab === 'orders' ? 'My Orders' : 'Addresses'}
        {activeTab === tab && (
          <motion.div 
            layoutId="activeTab" 
            className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-primary rounded-t-full" 
          />
        )}
      </button>
    ))}
  </div>
);

export default ProfileTabs;