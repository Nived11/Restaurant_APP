import React, { useState } from "react";
import { Plus, PackageOpen, RefreshCcw, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useMenu } from "../hooks/useMenu";
import { useCategory } from "../hooks/useCategory";
import MenuFilters from "./MenuFilters";
import MenuGrid from "./MenuGrid";
import MenuFormModal from "./MenuFormModal";
import ProductCardSkeleton from "./ProductCardSkeleton"; 
import { AnimatePresence } from "framer-motion";

const ProductSection = () => {
  const [activeSection, setActiveSection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categories, fetchCategories } = useCategory();
  
  const { 
    items, formData, setFormData, editingId, loading, 
    fetching, error, fileInputRef, handleImageChange, 
    handleSubmit, handleEdit, handleDelete, resetForm,
    fetchMenuItems, nextPage 
  } = useMenu({ activeSection, activeCategory, searchQuery });
  
  const sections = ["All", "BANNER", "COMBO MENU", "BEST SELLER", "TODAY'S SPECIAL", "OTHERS"];

  const handleOpenAdd = () => {
    fetchCategories();
    resetForm();
    setIsModalOpen(true);
  };

  const handleSeeLess = () => {
    fetchMenuItems(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 border-t-2 border-slate-50 pt-10 min-h-[400px]">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        
        {/* 1. Title & Count */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Menu Items</h2>
          {!fetching && !error && (
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
              {items.length} Items
            </span>
          )}
        </div>

        {/* 2. Mobile order management using Flexbox */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          
          <div className="order-first md:order-last">
            <button 
              onClick={handleOpenAdd} 
              className="w-full md:w-auto cursor-pointer bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add New Item
            </button>
          </div>

          <div className="flex-1 order-last md:order-first">
            <MenuFilters 
              sections={sections} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              categories={categories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
          </div>

        </div>
      </div>

      {/* Product Display Area */}
      {fetching && items.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-red-50 bg-red-50/10 rounded-3xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-slate-900 font-black uppercase tracking-tight mb-2">{error}</h3>
          <button onClick={() => fetchMenuItems(false)} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-slate-50 transition-all">
            <RefreshCcw size={14} /> Try To Reconnect
          </button>
        </div>
      ) : items.length > 0 ? (
        <>
          <MenuGrid items={items} onEdit={(item) => { handleEdit(item); setIsModalOpen(true); }} onDelete={handleDelete} />
          
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            {nextPage ? (
              <button 
                onClick={() => fetchMenuItems(true)}
                disabled={fetching}
                className="cursor-pointer group flex items-center gap-3 bg-black border-2 border-slate-900 px-6 py-2 rounded-2xl text-[11px] text-white font-black uppercase hover:bg-slate-900 transition-all shadow-md active:scale-95"
              >
                {fetching ? <RefreshCcw size={14} className="animate-spin" /> : <ChevronDown size={14} />}
                Show More Items
              </button>
            ) : items.length > 12 ? (
              <button 
                onClick={handleSeeLess}
                className="cursor-pointer flex items-center gap-2 text-slate-600 hover:text-slate-900 text-[10px] font-black uppercase transition-all"
              >
                <ChevronUp size={14} className="animate-bounce" /> See Less & Back to top
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl text-center">
          <PackageOpen size={40} className="text-slate-200 mb-3 mx-auto" />
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No products found</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MenuFormModal 
            formData={formData} setFormData={setFormData} editingId={editingId}
            categories={categories} fileInputRef={fileInputRef}
            handleImageChange={handleImageChange} loading={loading}
            onClose={() => { resetForm(); setIsModalOpen(false); }} 
            onSubmit={async (e) => {
              const success = await handleSubmit(e);
              if (success) setIsModalOpen(true); // Keep modal open if submission is successful to show success message, otherwise close it
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSection;