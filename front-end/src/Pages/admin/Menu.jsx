import React, { useState, useRef } from "react";
import { Filter } from "lucide-react";
import { MenuHeader, InventoryGrid, MenuFormModal } from "../../features/admin/menu";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  // Configuration
  const sections = ["All", "Combo Menu", "Best Seller", "Today's Special", "Others"];
  const categories = ["Burger", "Pizza", "Cake", "Loaded Fries", "Beverages", "Sides", "Pasta"];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "Today's Special",
    category: "Burger",
    actualPrice: "",
    discountPrice: "",
    quantity: "",
    image: null,
    previewUrl: null,
    isVeg: true,
  });

  // Handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", description: "", section: "Today's Special", 
      category: "Burger", actualPrice: "", discountPrice: "", 
      quantity: "", image: null, previewUrl: null, isVeg: true 
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData, id: editingId || Date.now() };
    if (editingId) {
      setItems(items.map(item => item.id === editingId ? newItem : item));
    } else {
      setItems([...items, newItem]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => setItems(items.filter(i => i.id !== id));

  // Filtering Logic
  const filteredItems = items.filter(item => {
    const matchesSection = activeSection === "All" || item.section === activeSection;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="max-w-full min-h-screen bg-white rounded-tl-[2rem] rounded-tr-[2rem] pb-20 font-sans px-4 sm:px-8">
      <div className="pt-8">
        <MenuHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onAddClick={() => setIsFormOpen(true)} 
          sections={sections}             
          activeSection={activeSection}   
          setActiveSection={setActiveSection} 
        />
      </div>

      {filteredItems.length > 0 ? (
        <InventoryGrid items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <div className="flex flex-col items-center justify-center py-40">
           <Filter className="mx-auto text-gray-400 mb-4" size={60} />
           <p className="text-md sm:text-2xl font-black text-gray-400 uppercase tracking-widest">No matching products</p>
        </div>
      )}

      {/* FIXED: Passing all required props to the Modal */}
      {isFormOpen && (
        <MenuFormModal 
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          sections={sections}
          categories={categories}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          onClose={resetForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Menu;