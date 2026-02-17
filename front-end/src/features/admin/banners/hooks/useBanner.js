import { useState } from 'react';

export const useBanner = () => {
  // Mock Data (Initial Banners)
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "CRAVE-WORTHY PIZZAS",
      subtitle: "FRESHLY BAKED WOODFIRED PIZZAS DELIVERED HOT.",
      buttonText: "GRAB NOW",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3540&auto=format&fit=crop",
      link: "/menu/pizza"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // To track which banner is being edited

  // Banner Form State
  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    buttonText: "ORDER NOW",
    image: "",
    link: ""
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBanner(prev => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewBanner(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // 1. Open Modal for ADDING
  const openAddModal = () => {
    setEditingId(null); // Reset editing ID
    setNewBanner({      // Clear form
      title: "",
      subtitle: "",
      buttonText: "ORDER NOW",
      image: "",
      link: ""
    });
    setIsModalOpen(true);
  };

  // 2. Open Modal for EDITING
  const openEditModal = (banner) => {
    setEditingId(banner.id); // Set ID to know we are editing
    setNewBanner(banner);    // Fill form with existing data
    setIsModalOpen(true);
  };

  // 3. Save Banner (Handles both Add & Edit)
  const saveBanner = () => {
    if (!newBanner.image) return alert("Please upload an image!");
    
    if (editingId) {
      // Update Existing Banner
      setBanners(prev => prev.map(b => (b.id === editingId ? { ...newBanner, id: editingId } : b)));
    } else {
      // Add New Banner
      setBanners(prev => [...prev, { ...newBanner, id: Date.now() }]);
    }
    
    setIsModalOpen(false); // Close Modal
  };

  // Remove Banner
  const removeBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return {
    banners,
    isModalOpen,
    setIsModalOpen,
    newBanner,
    editingId,       // Exported to check if editing mode
    handleInputChange,
    handleImageUpload,
    openAddModal,    // New function
    openEditModal,   // New function
    saveBanner,      // Updated function
    removeBanner
  };
};