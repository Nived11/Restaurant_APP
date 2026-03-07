import { useState, useRef } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

export const useMenu = (filters) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "", description: "", section: "OTHERS", category: "",
    actual_price: "", offer_price: "", quantity: "",
    image: null, previewUrl: null,
    banner_image: null, bannerPreviewUrl: null,
    dietary_preference: "VEG", is_available: true,
  });

  const queryKey = ["menuItems", filters.searchQuery, filters.activeCategory, filters.activeSection];

  // 1. Fetching Menu Items with useInfiniteQuery
  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const params = {
        search: filters.searchQuery || undefined,
        category: filters.activeCategory !== "All" ? filters.activeCategory : undefined,
        section: filters.activeSection !== "All" ? filters.activeSection : undefined,
        page: pageParam
      };
      const response = await api.get("/inventory/admin/menu-items/", { params });
      return response.data; 
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page");
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const items = data ? data.pages.flatMap(page => page.results || page) : [];
  const totalCount = data?.pages[0]?.count || 0;

  // 2. Add/Update Mutation
  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (editingId) {
        return api.patch(`/inventory/admin/menu-items/${editingId}/`, payload);
      }
      return api.post("/inventory/admin/menu-items/", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] }); 
      toast.success(editingId ? "Item updated successfully!" : "Item added successfully!");
      resetForm(); 
    },
    onError: (err) => {
      toast.error(extractErrorMessages(err));
    }
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/inventory/admin/menu-items/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Item removed");
    },
    onError: () => toast.error("Delete failed")
  });

  const handleImageChange = (e, type = 'product') => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'banner') {
        setFormData(prev => ({ ...prev, banner_image: file, bannerPreviewUrl: URL.createObjectURL(file) }));
      } else {
        setFormData(prev => ({ ...prev, image: file, previewUrl: URL.createObjectURL(file) }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", description: "", section: "OTHERS", category: "",
      actual_price: "", offer_price: "", quantity: "",
      image: null, previewUrl: null,
      banner_image: null, bannerPreviewUrl: null,
      dietary_preference: "VEG", is_available: true
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const mrp = parseFloat(formData.actual_price);
    const offer = parseFloat(formData.offer_price);

    if (offer > mrp) {
      toast.error("Invalid Pricing: Offer price must be less than or equal to MRP");
      return false;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (!['previewUrl', 'bannerPreviewUrl', 'image', 'banner_image'].includes(key)) {
        data.append(key, formData[key]);
      }
    });

    if (formData.image instanceof File) data.append("image", formData.image);
    if (formData.banner_image instanceof File) data.append("banner_image", formData.banner_image);

    mutation.mutate(data);
    return true;
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ 
      ...item, 
      previewUrl: item.image, 
      bannerPreviewUrl: item.banner_image,
      image: null, 
      banner_image: null,
    });
  };

  return {
    items,totalCount, formData, setFormData, editingId, 
    loading: mutation.isPending, 
    fetching: isFetching, 
    isLoading, 
    error: error ? "Failed to fetch menu items" : null,
    fileInputRef, bannerInputRef, handleImageChange, handleSubmit, handleEdit, 
    handleDelete: deleteMutation.mutate, 
    resetForm, 
    fetchMenuItems: (isLoadMore) => {
        if (isLoadMore) {
            fetchNextPage();
        } else {
            queryClient.resetQueries({ queryKey: queryKey });
        }
    },
    hasNextPage
  };
};