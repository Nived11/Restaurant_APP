import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useMenu } from "../hooks/useMenu";
import { useCategory } from "../hooks/useCategory";
import MenuFilters from "./MenuFilters";
import MenuGrid from "./MenuGrid";
import MenuFormModal from "./MenuFormModal";

const ProductSection = () => {
  const [view, setView] = useState("list"); 
  const { items, formData, setFormData, editingId, fileInputRef, handleImageChange, handleSubmit, handleEdit, handleDelete, resetForm } = useMenu();
  const { categories } = useCategory();

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

  if (view === "add") {
    return (
      <div className="animate-in slide-in-from-right duration-300">
        <MenuFormModal 
          formData={formData} setFormData={setFormData} editingId={editingId}
          sections={sections} categories={categories} fileInputRef={fileInputRef}
          handleImageChange={handleImageChange} onClose={() => { resetForm(); setView("list"); }} 
          onSubmit={handleProductSubmit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 border-t-2 border-slate-50 pt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 mb-4">
            Menu Items
          </h2>
          <MenuFilters 
            sections={sections} activeSection={activeSection} setActiveSection={setActiveSection}
            categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          />
        </div>
        <button 
          onClick={() => setView("add")}
          className="cursor-pointer h-fit flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-6 py-3.5 rounded-xl text-[11px] font-black uppercase transition-all shadow-lg hover:bg-primary"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <MenuGrid 
        items={filteredItems} 
        onEdit={(item) => { handleEdit(item); setView("add"); }} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default ProductSection;