import React from "react";
import { Plus } from "lucide-react";
import { useCategory } from "../hooks/useCategory";
import CategoryList from "./CategoryList";
import CategoryFormModal from "./CategoryFormModal";

const CategorySection = () => {
  const { 
    categories, isCatModalOpen, setIsCatModalOpen, 
    addCategory, deleteCategory, handleEditCategory, 
    editingCategory, closeModal, loading, fetching, error 
  } = useCategory();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
          Categories
        </h2>
        <button 
          onClick={() => setIsCatModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      <CategoryList 
        categories={categories} 
        onEdit={handleEditCategory} 
        onDelete={deleteCategory} 
        fetching={fetching} // Pass fetching state for skeleton
      />

      {isCatModalOpen && (
        <CategoryFormModal 
          onClose={closeModal}
          onSave={addCategory}
          loading={loading}
          editingCategory={editingCategory}
          error={error}
        />
      )}
    </div>
  );
};

export default CategorySection;