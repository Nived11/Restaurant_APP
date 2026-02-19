import React, { useState } from 'react';

import { 
  useBanner, 
  BannersList, 
  BannerFormModal, 
  BannerDetailModal, 
  DeleteModal 
} from '../../features/admin/banners'; 

const Banners = () => {
  const { 
    banners, isModalOpen, setIsModalOpen, newBanner, editingId,
    handleInputChange, handleImageUpload, openAddModal, openEditModal,
    saveBanner, removeBanner 
  } = useBanner();

  const [deleteId, setDeleteId] = useState(null);
  const [viewBanner, setViewBanner] = useState(null);

  // --- Handlers ---
  const handleConfirmDelete = () => {
    if (deleteId) {
       removeBanner(deleteId);
       setDeleteId(null);
       setViewBanner(null);
    }
  };

  const handleEditFromView = (banner) => {
    setViewBanner(null);
    openEditModal(banner);
  };

  const handleDeleteFromView = (id) => {
    setViewBanner(null);
    setDeleteId(id);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans text-[#0A0A0A] p-4 md:p-8 lg:p-12">
      
      <BannersList 
        banners={banners}
        openAddModal={openAddModal}
        openEditModal={openEditModal}
        setViewBanner={setViewBanner}
        setDeleteId={setDeleteId}
      />

      <BannerFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={!!editingId}
        newBanner={newBanner}
        handleInputChange={handleInputChange}
        handleImageUpload={handleImageUpload}
        saveBanner={saveBanner}
      />

      <BannerDetailModal 
        banner={viewBanner}
        onClose={() => setViewBanner(null)}
        onEdit={handleEditFromView}
        onDelete={handleDeleteFromView}
      />

      <DeleteModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
};

export default Banners;