  import { useState, useEffect } from "react";
  import api from "../../../../api/axios"; 
  import { toast } from "sonner";
  import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

  export const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [fetching, setFetching] = useState(true); // Initial data loading
    const [loading, setLoading] = useState(false);  // Form submission loading
    const [error, setError] = useState("");

    const fetchCategories = async () => {
      setFetching(true);
      try {
        const response = await api.get('/inventory/categories/');
        setCategories(response.data);
      } catch (err) {
        console.error("Fetch Error:", extractErrorMessages(err));
        toast.error("Failed to load categories");
      } finally {
        setFetching(false);
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const addCategory = async (newCat) => {
      setLoading(true);
      setError("");
      try {
        const formData = new FormData();
        formData.append("name", newCat.name);
        
        // പുതിയ ഫയൽ ഉണ്ടെങ്കിൽ മാത്രം ചേർക്കുക (PATCH നു വേണ്ടി)
        if (newCat.image instanceof File) {
          formData.append("image", newCat.image);
        }

        let response;
        if (editingCategory) {
          // PATCH method for partial updates
          response = await api.patch(`/inventory/categories/${editingCategory.id}/`, formData);
          setCategories(prev => prev.map(c => c.id === editingCategory.id ? response.data : c));
          fetchCategories(); 
          toast.success("Category updated!");

        } else {
          response = await api.post('/inventory/categories/', formData);
          setCategories(prev => [...prev, response.data]);
          toast.success("Category added!");
        }

        closeModal();
        return true;
      } catch (err) {
        setError(extractErrorMessages(err));
        return false;
      } finally {
        setLoading(false);
      }
    };

    const deleteCategory = async (id) => {
      try {
        await api.delete(`/inventory/categories/${id}/`);
        setCategories(prev => prev.filter(c => c.id !== id));
        toast.success("Category deleted");
        return true;
      } catch (err) {
        toast.error("Failed to delete category");
        return false;
      }
    };

    const handleEditCategory = (cat) => {
      setEditingCategory(cat);
      setIsCatModalOpen(true);
    };

    const closeModal = () => {
      setIsCatModalOpen(false);
      setEditingCategory(null);
      setError("");
    };

    return { 
      categories, isCatModalOpen, setIsCatModalOpen, 
      addCategory, deleteCategory, handleEditCategory,
      editingCategory, closeModal, loading, fetching, error 
    };
  };