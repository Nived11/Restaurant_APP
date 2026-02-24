import React from "react";
import { ChevronDown, Search } from "lucide-react";

const MenuFilters = ({ 
  sections, activeSection, setActiveSection, 
  categories, activeCategory, setActiveCategory,
  searchQuery, setSearchQuery
}) => (
  <div className="flex flex-col lg:flex-row gap-4 w-full">
    <div className="relative flex-1 lg:max-w-xs">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input 
        type="text" 
        placeholder="Search items..."
        className="w-full bg-white border border-primary/60 rounded-xl py-2.5 pl-11 pr-4 text-[12px] font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="flex gap-3">
      <div className="relative min-w-[140px] flex-1 sm:flex-none">
        <select 
          value={activeSection} 
          onChange={(e) => setActiveSection(e.target.value)} 
          className="w-full appearance-none bg-white border border-primary/60 rounded-xl py-2.5 px-4 text-[12px] font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
        >
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>

      <div className="relative min-w-[140px] flex-1 sm:flex-none">
        <select 
          value={activeCategory} 
          onChange={(e) => setActiveCategory(e.target.value)} 
          className="w-full appearance-none bg-white border border-primary/60 rounded-xl py-2.5 px-4 text-[12px] font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-xl placeholder:text-gray-500"
        >
          <option value="All">All Categories</option>
          {categories && categories.length > 0 ? (
            categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))
          ) : (
             <option disabled>Loading Categories...</option>
          )}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>
    </div>
  </div>
);

export default MenuFilters;