import { useState, useRef } from "react";

export const useMenu = () => {
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", description: "", section: "Today's Special",
    category: "Burger", actualPrice: "", discountPrice: "",
    quantity: "", image: null, previewUrl: null, isVeg: true,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, previewUrl: URL.createObjectURL(file) });
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", description: "", section: "Today's Special", category: "Burger", 
      actualPrice: "", discountPrice: "", quantity: "", image: null, previewUrl: null, isVeg: true 
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData, id: editingId || Date.now() };
    if (editingId) setItems(items.map(item => item.id === editingId ? newItem : item));
    else setItems([...items, newItem]);
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => setItems(items.filter(i => i.id !== id));

  return {
    items, formData, setFormData, isFormOpen, setIsFormOpen, 
    editingId, fileInputRef, handleImageChange, handleSubmit, handleEdit, handleDelete, resetForm
  };
};