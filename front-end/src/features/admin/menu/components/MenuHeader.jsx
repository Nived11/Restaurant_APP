import React from "react";
import { Search } from "lucide-react";

const MenuHeader = ({ searchQuery, setSearchQuery }) => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div className="flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
        Menu <span className="text-primary">Manager</span>
      </h1>
      <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">
        Inventory Control
      </p>
    </div>

    <div className="relative w-full lg:w-96">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
      <input 
        type="text" 
        placeholder="Search products..."
        className="w-full bg-white border border-primary rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
);

export default MenuHeader;