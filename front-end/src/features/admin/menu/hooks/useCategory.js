import { useState, useEffect } from "react";
import api from "../../../../api/axios"; 
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await api.get('/inventory/categories/');
      setCategories(response.data);
    } catch (err) {
      console.error("Fetch Error:", extractErrorMessages(err));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (newCat) => {
    if (!newCat.name.trim()) {
      setError("Category name is required");
      return false;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", newCat.name);
      if (newCat.image) formData.append("image", newCat.image);

      const response = await api.post('/inventory/categories/', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201 || response.data) {
        toast.success("Category added successfully!");
        setCategories((prev) => [...prev, response.data]);
        setIsCatModalOpen(false);
        return true;
      }
    } catch (err) {
      const cleanError = extractErrorMessages(err);
      setError(cleanError);
      toast.error(cleanError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { categories, isCatModalOpen, setIsCatModalOpen, addCategory, loading, error };
};