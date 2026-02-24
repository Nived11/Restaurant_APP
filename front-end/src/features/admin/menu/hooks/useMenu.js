import { useState, useEffect, useRef, useCallback } from "react";
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useMenu = (filters) => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "", description: "", section: "OTHERS", category: "",
    actual_price: "", offer_price: "", quantity: "",
    image: null, previewUrl: null, dietary_preference: "VEG", is_available: true,
  });

  const fetchMenuItems = useCallback(async (isLoadMore = false) => {
    if (!isLoadMore) {
      setFetching(true);
      setItems([]); 
    }
    setError(null);

    try {
      const params = {
        search: filters.searchQuery || undefined,
        category: filters.activeCategory !== "All" ? filters.activeCategory : undefined,
        section: filters.activeSection !== "All" ? filters.activeSection : undefined,
        page: isLoadMore ? currentPage + 1 : 1
      };

      const response = await api.get("/inventory/admin/menu-items/",   );
      const newData = response.data.results || response.data;
      
      if (isLoadMore) {
        setItems(prev => [...prev, ...newData]);
        setCurrentPage(prev => prev + 1);
      } else {
        setItems(Array.isArray(newData) ? newData : []);
        setCurrentPage(1);
      }
      setNextPage(response.data.next);
    } catch (err) {
      setError(extractErrorMessages(err));
    } finally {
      setFetching(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMenuItems(false);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [filters.searchQuery, filters.activeCategory, filters.activeSection]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, previewUrl: URL.createObjectURL(file) });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", description: "", section: "OTHERS", category: "",
      actual_price: "", offer_price: "", quantity: "",
      image: null, previewUrl: null, dietary_preference: "VEG", is_available: true
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'previewUrl' && key !== 'image') data.append(key, formData[key]);
    });
    if (formData.image instanceof File) data.append("image", formData.image);

    try {
      if (editingId) {
        await api.patch(`/inventory/admin/menu-items/${editingId}/`, data);
        toast.success("Item updated!");
      } else {
        await api.post("/inventory/admin/menu-items/", data);
        toast.success("Item added!");
      }
      fetchMenuItems(false);
      resetForm();
      return true;
    } catch (err) {
      toast.error(extractErrorMessages(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item, previewUrl: item.image, image: null, category: item.category });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/admin/menu-items/${id}/`);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Item removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return {
    items, formData, setFormData, editingId, loading, fetching, error,
    fileInputRef, handleImageChange, handleSubmit, handleEdit, handleDelete, 
    resetForm, nextPage, fetchMenuItems
  };
};