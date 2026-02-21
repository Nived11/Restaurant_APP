import React, { useState } from "react";
import { Filter, ArrowLeft } from "lucide-react";
import { MenuHeader, MenuGrid, MenuFilters, MenuFormModal , CategoryFormModal} from "../../features/admin/menu"; // Note: MenuFormModal is now used as a page content
import { useMenu } from "../../features/admin/menu/hooks/useMenu";
import { useCategory } from "../../features/admin/menu/hooks/useCategory";

const Menu = () => {
  const [view, setView] = useState("list"); // 'list' or 'add'
  const { items, formData, setFormData, editingId, fileInputRef, handleImageChange, handleSubmit, handleEdit, handleDelete, resetForm } = useMenu();
  const { categories, isCatModalOpen, setIsCatModalOpen, addCategory } = useCategory();

  const [activeSection, setActiveSection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const sections = ["All", "Banner", "Combo Menu", "Best Seller", "Today's Special", "Others"];

  // Form handling with View change
  const handleFormSubmit = (e) => {
    handleSubmit(e);
    setView("list");
  };

  const handleEditItem = (item) => {
    handleEdit(item);
    setView("add");
  };

  const handleBack = () => {
    resetForm();
    setView("list");
  };

  const filteredItems = items.filter(item => {
    const matchesSection = activeSection === "All" || item.section === activeSection;
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesCategory && matchesSearch;
  });

  // --- VIEW 1: ADD/EDIT ITEM PAGE ---
  if (view === "add") {
    return (
      <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-4 sm:px-8 animate-in slide-in-from-right duration-300">
        <div className="pt-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-all mb-6"
          >
            <ArrowLeft size={18} /> Back to Menu
          </button>
          
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
              {editingId ? "Edit" : "Add New"} <span className="text-primary">Product</span>
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Product Details & Configuration</p>
          </div>

          <MenuFormModal 
            isPage={true} // New prop to handle page styling
            formData={formData} setFormData={setFormData} editingId={editingId}
            sections={sections} categories={categories} fileInputRef={fileInputRef}
            handleImageChange={handleImageChange} onClose={handleBack} onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    );
  }

  // --- VIEW 2: MENU LIST PAGE ---
  return (
    <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-4 sm:px-8 animate-in fade-in duration-300">
      <div className="pt-8 flex flex-col gap-6">
        <MenuHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <MenuFilters 
          sections={sections} activeSection={activeSection} setActiveSection={setActiveSection}
          categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          onAddCategoryClick={() => setIsCatModalOpen(true)}
          onAddClick={() => setView("add")}
        />
      </div>

      {filteredItems.length > 0 ? (
        <MenuGrid items={filteredItems} onEdit={handleEditItem} onDelete={handleDelete} />
      ) : (
        <div className="flex flex-col items-center justify-center py-40">
           <Filter className="text-gray-300 mb-4" size={60} />
           <p className="text-md font-black text-gray-400 uppercase tracking-widest">No products found</p>
        </div>
      )}

      {/* Category Modal stays as a popup as it's a small action */}
      {isCatModalOpen && (
        <CategoryFormModal onClose={() => setIsCatModalOpen(false)} onSave={addCategory} />
      )}
    </div>
  );
};

export default Menu;