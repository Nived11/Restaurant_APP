import React from "react";
import { CheckCircle, Phone, MapPin, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ProfileBanner = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="relative h-20 md:h-40 bg-gray-900 overflow-hidden">
      {/* High-Quality Food Banner */}
      <img 
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1440" 
        className="w-full h-full object-cover opacity-60 scale-105"
        alt="Delicious Food Banner"
      />
      {/* Darker Gradient for better text & button visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/70" />

      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-14">
        
        {/* Profile Info Left */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="shrink-0">
            {/* Perfectly Rounded Circular Avatar */}
            <div className="w-14 h-14 md:w-32 md:h-32 rounded-full border-[3px] md:border-[6px] border-white/20 shadow-2xl overflow-hidden bg-white">
              <img 
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&backgroundColor=f9a602" 
                alt="User Avatar"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
          
          <div className="text-white">
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-xs md:text-3xl font-black uppercase tracking-widest leading-none">
                Arjun
              </h2>
              <CheckCircle size={12} className="text-green-400 md:w-5 md:h-5" />
            </div>
            
            {/* Reduced Text Sizes */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-2 md:mt-2 opacity-80">
              <span className="flex items-center gap-1 text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em]">
                <Phone size={10} className="text-primary md:w-3 md:h-3" /> +91 98765 43210
              </span>
              <span className="hidden md:block text-white/30">|</span>
              <span className="flex items-center gap-1 text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em]">
                <MapPin size={10} className="text-primary md:w-3 md:h-3" /> Kochi, Kerala
              </span>
            </div>
          </div>
        </div>

        {/* Improved Sign Out Button (Higher Visibility) */}
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white shadow-xl transition-all group hover:border-red-500/50"
        >
          <div className=" bg-red-500 p-1 md:p-1.5 rounded-full group-hover:rotate-12 transition-transform">
            <LogOut size={10} className="md:w-3 md:h-3 text-white" />
          </div>
          <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] hidden sm:block">
            Sign Out
          </span>
        </motion.button>

      </div>
    </div>
  );
};

export default ProfileBanner;