import React from "react";
import { Plus, Search, ChevronDown } from "lucide-react";

const MenuHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  onAddClick, 
  sections = [], 
  activeSection, 
  setActiveSection 
}) => (
  <div className="flex flex-col gap-6">
    {/* Row 1: Title & Search */}
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
          className="w-full bg-white border border-primary  rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    {/* Row 2: Sections & Add Button (Combined on same row in Desktop) */}
    <div className="flex flex-row items-center justify-between gap-3">
      {/* Mobile: Dropdown | Desktop: The List is handled in SectionFilters */}
      <div className="relative flex-grow lg:hidden">
        <select 
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full appearance-none bg-gray-100 border-none rounded-xl py-3 px-4 pr-10 text-[10px] font-black uppercase tracking-widest outline-none"
        >
          {sections.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
      </div>

      {/* Desktop Section View (Visible only on Desktop) */}
      <div className="hidden lg:block flex-grow">
        <div className="bg-gray-200 p-1.5 rounded-2xl flex gap-1 w-max">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`cursor-pointer px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeSection === sec ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-600"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Add Button - Stays right-aligned on all views */}
      <button 
        onClick={onAddClick}
        className="cursor-pointer flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-5 py-3 lg:py-4 lg:px-8 rounded-xl lg:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-lg hover:bg-primary transition-all active:scale-95 whitespace-nowrap"
      >
        <Plus size={14} strokeWidth={3} />
        <span>Add Item</span>
      </button>
    </div>
  </div>
);

export default MenuHeader;