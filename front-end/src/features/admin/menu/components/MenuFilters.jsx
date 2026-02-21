import React from "react";
import { ChevronDown, Plus, Search } from "lucide-react";

const MenuFilters = ({ 
  sections, activeSection, setActiveSection, 
  categories, activeCategory, setActiveCategory,
  searchQuery, setSearchQuery,
  onAddCategoryClick, 
  onAddClick 
}) => (
  <div className="relative flex flex-col gap-4">
    
    <div className="flex flex-nowrap items-center gap-2 w-full md:justify-end lg:hidden">
      <button onClick={onAddCategoryClick} className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap"><Plus size={14} /> <span>Category</span></button>
      <button onClick={onAddClick} className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap"><Plus size={14} /> <span>Item</span></button>
    </div>

    <div className="lg:absolute lg:-top-[76px] lg:right-0 w-full lg:w-96">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search products..."
          className="w-full bg-white border border-primary rounded-2xl py-3 pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-[2rem] border border-slate-100">
      <div className="flex flex-1 items-center gap-3 w-full">
        <div className="relative flex-1 max-w-[200px]">
          <label className="text-[8px] font-black text-slate-400 uppercase mb-1 ml-1 block">Section</label>
          <div className="relative">
            <select value={activeSection} onChange={(e) => setActiveSection(e.target.value)} className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase outline-none focus:border-primary cursor-pointer">
              {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        <div className="relative flex-1 max-w-[200px]">
          <label className="text-[8px] font-black text-slate-400 uppercase mb-1 ml-1 block">Category</label>
          <div className="relative">
            <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase outline-none focus:border-primary cursor-pointer">
              <option value="All">All Categories</option>
              {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <button onClick={onAddCategoryClick} className="cursor-pointer flex items-center justify-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap"><Plus size={14} /> <span>Category</span></button>
        <button onClick={onAddClick} className="cursor-pointer flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap"><Plus size={14} /> <span>Add Item</span></button>
      </div>
    </div>
  </div>
);

export default MenuFilters;