import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { MenuHeader, MenuGrid, MenuFilters, MenuFormModal, CategoryFormModal } from "../../features/admin/menu";
import { useMenu } from "../../features/admin/menu/hooks/useMenu";
import { useCategory } from "../../features/admin/menu/hooks/useCategory";

const Menu = () => {
  const [view, setView] = useState("list"); 
  const { items, formData, setFormData, editingId, fileInputRef, handleImageChange, handleSubmit, handleEdit, handleDelete, resetForm } = useMenu();
  const { categories, isCatModalOpen, setIsCatModalOpen, addCategory, loading, error } = useCategory();

  const [activeSection, setActiveSection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const sections = ["All", "Banner", "Combo Menu", "Best Seller", "Today's Special", "Others"];

  const filteredItems = items.filter(item => {
    const matchesSection = activeSection === "All" || item.section === activeSection;
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesCategory && matchesSearch;
  });

  const handleProductSubmit = async (e) => {
    const success = await handleSubmit(e);
    if (success !== false) setView("list");
  };

  return (
    <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-4 sm:px-8">
      {view === "list" ? (
        <>
          <div className="pt-8 flex flex-col gap-8">
            <MenuHeader />
            <MenuFilters 
              sections={sections} activeSection={activeSection} setActiveSection={setActiveSection}
              categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              onAddCategoryClick={() => setIsCatModalOpen(true)}
              onAddClick={() => setView("add")}
            />
          </div>
          <MenuGrid items={filteredItems} onEdit={(item) => { handleEdit(item); setView("add"); }} onDelete={handleDelete} />
        </>
      ) : (
        <div className="pt-8 animate-in slide-in-from-right duration-300">
          <button onClick={() => { resetForm(); setView("list"); }} className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] mb-6">
            <ArrowLeft size={18} /> Back to Menu
          </button>
          <MenuFormModal 
            formData={formData} setFormData={setFormData} editingId={editingId}
            sections={sections} categories={categories} fileInputRef={fileInputRef}
            handleImageChange={handleImageChange} onClose={() => setView("list")} 
            onSubmit={handleProductSubmit}
          />
        </div>
      )}

      {isCatModalOpen && (
        <CategoryFormModal 
          onClose={() => setIsCatModalOpen(false)} 
          onSave={addCategory}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Menu;