import React from "react";
import { ChevronDown, Search } from "lucide-react";

const MenuFilters = ({ 
  sections, activeSection, setActiveSection, 
  categories, activeCategory, setActiveCategory,
  searchQuery, setSearchQuery
}) => (
  <div className="flex flex-col lg:flex-row gap-4 w-full">
    {/* Search Box */}
    <div className="relative flex-1 lg:max-w-xs">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input 
        type="text" 
        placeholder="Search items..."
        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-primary transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Dropdowns */}
    <div className="flex gap-3">
      <div className="relative min-w-[140px]">
        <select 
          value={activeSection} 
          onChange={(e) => setActiveSection(e.target.value)} 
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase outline-none cursor-pointer"
        >
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>

      <div className="relative min-w-[140px]">
        <select 
          value={activeCategory} 
          onChange={(e) => setActiveCategory(e.target.value)} 
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>
    </div>
  </div>
);

export default MenuFilters;