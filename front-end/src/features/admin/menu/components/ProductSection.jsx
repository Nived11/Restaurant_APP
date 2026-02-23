import React, { useState } from "react";
import { Plus, PackageOpen, RefreshCcw, AlertCircle } from "lucide-react";
import { useMenu } from "../hooks/useMenu";
import { useCategory } from "../hooks/useCategory";
import MenuFilters from "./MenuFilters";
import MenuGrid from "./MenuGrid";
import MenuFormModal from "./MenuFormModal";
import ProductCardSkeleton from "./ProductCardSkeleton"; 
import { AnimatePresence } from "framer-motion";

const ProductSection = () => {
  const { 
    items, formData, setFormData, editingId, loading, 
    fetching, error, fileInputRef, handleImageChange, 
    handleSubmit, handleEdit, handleDelete, resetForm,
    fetchMenuItems 
  } = useMenu();
  
  const { categories, fetchCategories } = useCategory(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const sections = ["All", "BANNER", "COMBO MENU", "BEST SELLER", "TODAY'S SPECIAL", "OTHERS"];
  const displayItems = items || [];

  const handleOpenAdd = () => {
    fetchCategories();
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 border-t-2 border-slate-50 pt-10 min-h-[400px]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 sm:px-0">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
             <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Menu Items</h2>
             {!fetching && !error && (
               <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                 {displayItems.length} Total
               </span>
             )}
          </div>
          <MenuFilters 
            sections={sections} activeSection={activeSection} setActiveSection={setActiveSection}
            categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          />
        </div>
        <button onClick={handleOpenAdd} className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
          <Plus size={16} strokeWidth={3} /> Add New Item
        </button>
      </div>

      {/* Main Content Logic */}
      {fetching ? (
        /* 1. SKELETON LOADING STATE */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        /* 2. DETAILED ERROR STATE */
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-red-50 bg-red-50/10 rounded-3xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-slate-900 font-black uppercase tracking-tight mb-2">Syncing Failed</h3>
          <p className="text-slate-500 text-xs max-w-xs mb-6 font-medium leading-relaxed">
            {error}
          </p>
          <button 
            onClick={fetchMenuItems}
            className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-slate-50 transition-all"
          >
            <RefreshCcw size={14} /> Try To Reconnect
          </button>
        </div>
      ) : displayItems.length > 0 ? (
        /* 3. DATA LOADED STATE */
        <MenuGrid items={displayItems} onEdit={(item) => { handleEdit(item); setIsModalOpen(true); }} onDelete={handleDelete} />
      ) : (
        /* 4. EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl text-center">
          <PackageOpen size={40} className="text-slate-200 mb-3 mx-auto" />
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No products found in database</p>
        </div>
      )}

      {/* Modal remain the same */}
      <AnimatePresence>
        {isModalOpen && (
          <MenuFormModal 
            formData={formData} setFormData={setFormData} editingId={editingId}
            categories={categories} fileInputRef={fileInputRef}
            handleImageChange={handleImageChange} loading={loading}
            onClose={() => { resetForm(); setIsModalOpen(false); }} 
            onSubmit={async (e) => {
              const success = await handleSubmit(e);
              if (success) setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSection;