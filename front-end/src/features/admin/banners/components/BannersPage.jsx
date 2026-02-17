import React, { useState } from 'react';
import { Plus, Trash2, Upload, X, Image as ImageIcon, Link as LinkIcon, Type, Edit2, CheckCircle2, ArrowRight, AlertCircle, Eye, MousePointerClick, AlignLeft, Globe } from 'lucide-react';
import { useBanner } from '../hooks/useBanner';

const BannersPage = () => {
  const { 
    banners, 
    isModalOpen, 
    setIsModalOpen, 
    newBanner, 
    editingId,
    handleInputChange, 
    handleImageUpload, 
    openAddModal, 
    openEditModal,
    saveBanner, 
    removeBanner 
  } = useBanner();

  const [deleteId, setDeleteId] = useState(null);
  const [viewBanner, setViewBanner] = useState(null);

  const confirmDelete = () => {
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

  // --- COMPONENT HELPERS ---
  const MobileAddButton = () => (
    <button onClick={openAddModal} className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#f9a602] bg-white text-gray-400 hover:text-[#f9a602] hover:bg-[#f9a602]/5 transition-all flex items-center justify-center gap-2 mb-6 active:scale-95">
       <Plus size={20} /> <span className="font-bold text-sm">Add New Banner</span>
    </button>
  );

  const MobileBannerCard = ({ banner }) => (
    <div onClick={() => setViewBanner(banner)} className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
       <img src={banner.image} alt={banner.title} className="w-full h-full object-cover"/>
       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
       <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg"><Eye size={14} className="text-white"/></div>
       <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-black text-lg leading-tight mb-1 line-clamp-1">{banner.title}</h3>
          <div className="flex items-center gap-2">
             <span className="bg-[#f9a602] text-black text-[10px] font-bold px-2 py-0.5 rounded">{banner.buttonText}</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans text-[#0A0A0A]">
      
      {/* 📱 1. MOBILE S VIEW */}
      <div className="block min-[375px]:hidden p-4">
         <h1 className="text-2xl font-black mb-1 text-[#0A0A0A]">Banners</h1>
         <p className="text-xs text-gray-500 mb-6">{banners.length} Active Slides</p>
         <MobileAddButton />
         <div className="flex flex-col gap-4">
            {banners.map(banner => <MobileBannerCard key={banner.id} banner={banner} />)}
         </div>
      </div>

      {/* 📱 2. MOBILE M VIEW */}
      <div className="hidden min-[375px]:block sm:hidden p-5">
         <div className="flex justify-between items-end mb-6">
            <div><h1 className="text-3xl font-black text-[#0A0A0A]">Banners</h1><p className="text-xs text-gray-500 font-medium">Manage Home Slider</p></div>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-lg">{banners.length} Items</span>
         </div>
         <MobileAddButton />
         <div className="flex flex-col gap-5">
            {banners.map(banner => <MobileBannerCard key={banner.id} banner={banner} />)}
         </div>
      </div>

      {/* 📱 3. MOBILE L VIEW */}
      <div className="hidden sm:block md:hidden p-8">
         <div className="mb-8 text-center"><h1 className="text-4xl font-black text-[#0A0A0A]">Hero Banners</h1><p className="text-sm text-gray-500">Visual highlights of your app</p></div>
         <MobileAddButton />
         <div className="grid grid-cols-2 gap-5">
            {banners.map(banner => <MobileBannerCard key={banner.id} banner={banner} />)}
         </div>
      </div>

      {/* 📟 4. TABLET VIEW */}
      <div className="hidden md:block lg:hidden p-8">
         <div className="mb-10"><h1 className="text-4xl font-black text-[#0A0A0A] tracking-tight">Banners.</h1><p className="text-gray-500 font-medium mt-1">Tablet Layout Manager</p></div>
         <div className="grid grid-cols-2 gap-6">
            <button onClick={openAddModal} className="group h-[320px] rounded-[2rem] border-2 border-dashed border-gray-300 hover:border-[#f9a602] bg-white hover:bg-[#f9a602]/5 transition-all flex flex-col items-center justify-center text-center p-6 cursor-pointer active:scale-95">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:text-[#f9a602]"><Plus size={28} /></div><h3 className="text-lg font-black text-gray-800 group-hover:text-[#f9a602]">Add Banner</h3>
            </button>
            {banners.map(banner => (
               <div key={banner.id} onClick={() => setViewBanner(banner)} className="group relative h-[320px] bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer active:scale-[0.98]">
                  <div className="absolute inset-0"><img src={banner.image} alt={banner.title} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white">
                     <h3 className="font-black text-xl leading-tight mb-2 line-clamp-2">{banner.title}</h3>
                     <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-medium opacity-80">{banner.subtitle}</p>
                     <div className="flex items-center gap-2">
                        <span className="px-4 py-2 bg-white text-black text-[10px] font-black rounded-xl">{banner.buttonText}</span>
                        <span className="text-[10px] font-bold text-[#f9a602] bg-black/50 px-3 py-2 rounded-xl backdrop-blur-md">Click to Manage</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 💻 5. LAPTOP VIEW */}
      <div className="hidden lg:block p-12 max-w-[1600px] mx-auto">
         <div className="mb-12"><h1 className="text-5xl font-black text-[#0A0A0A] tracking-tighter mb-3">Hero Banners.</h1><p className="text-gray-500 text-lg">Manage visual highlights ({banners.length} Active)</p></div>
         <div className="grid grid-cols-3 gap-8">
            <button onClick={openAddModal} className="group h-[340px] rounded-[2.5rem] border-2 border-dashed border-gray-300 hover:border-[#f9a602] bg-white hover:bg-[#f9a602]/5 transition-all flex flex-col items-center justify-center text-center p-8 cursor-pointer">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400 group-hover:text-[#f9a602]"><Plus size={32} /></div><h3 className="text-xl font-black text-gray-800 group-hover:text-[#f9a602]">Add New Banner</h3>
            </button>
            {banners.map((banner) => (
               <div key={banner.id} className="group relative h-[340px] bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                  <div className="absolute inset-0"><img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-black text-2xl leading-tight mb-2 line-clamp-2">{banner.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-6 font-medium opacity-80">{banner.subtitle}</p>
                        <button className="px-6 py-3 bg-white text-black text-xs font-black rounded-xl flex items-center gap-2">{banner.buttonText} <ArrowRight size={14}/></button>
                     </div>
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-20 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                     <button onClick={(e) => { e.stopPropagation(); openEditModal(banner); }} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black shadow-lg"><Edit2 size={18} /></button>
                     <button onClick={(e) => { e.stopPropagation(); setDeleteId(banner.id); }} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 shadow-lg"><Trash2 size={18} /></button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 🛑 VIEW DETAIL MODAL (Updated for Responsive Layout) */}
      {viewBanner && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md animate-in fade-in duration-200">
           {/* Set max-w-[320px] for mobile testing look, or keep max-w-lg for general use */}
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
              
              <div className="relative h-56 w-full">
                 <img src={viewBanner.image} alt="Preview" className="w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                 <button onClick={() => setViewBanner(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white"><X size={20}/></button>
                 <div className="absolute bottom-4 left-6 right-6 text-white"><h3 className="font-black text-2xl leading-tight mb-1">{viewBanner.title}</h3></div>
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                 
                 {/* Description Section */}
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Description</label>
                    <p className="text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 break-words">
                        {viewBanner.subtitle}
                    </p>
                 </div>

                 {/* UPDATED GRID: Stacks vertically on mobile (cols-1), grid on larger screens (sm:cols-2) */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Button</label>
                        <p className="font-bold text-[#0A0A0A]">{viewBanner.buttonText}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 overflow-hidden">
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Link</label>
                        <p className="font-bold text-[#f9a602] truncate">{viewBanner.link || "No Link"}</p>
                    </div>
                 </div>

                 {/* Action Buttons - Stack on very small screens */}
                 <div className="flex flex-col xs:flex-row gap-3 pt-2">
                    <button onClick={() => handleDeleteFromView(viewBanner.id)} className="flex-1 py-4 rounded-2xl font-bold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 flex items-center justify-center gap-2">
                        <Trash2 size={18}/> Delete
                    </button>
                    <button onClick={() => handleEditFromView(viewBanner)} className="flex-1 sm:flex-[2] py-4 rounded-2xl font-bold bg-[#0A0A0A] text-white hover:bg-[#f9a602] hover:text-black flex items-center justify-center gap-2 shadow-xl">
                        <Edit2 size={18}/> Edit Banner
                    </button>
                 </div>

              </div>
           </div>
        </div>
      )}

      {/* 🛑 DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
           <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={32} /></div>
              <h3 className="text-2xl font-black text-center text-[#0A0A0A] mb-2">Delete Banner?</h3>
              <p className="text-center text-gray-500 text-sm font-medium mb-8">This action cannot be undone.</p>
              <div className="flex gap-3"><button onClick={() => setDeleteId(null)} className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100">Cancel</button><button onClick={confirmDelete} className="flex-1 py-4 rounded-2xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-xl">Yes, Delete</button></div>
           </div>
        </div>
      )}

      {/* =====================================================================================
          ✨ IMPROVED: ADD / EDIT BANNER MODAL (Premium UI)
      ===================================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95">
              
              {/* LEFT: DARK PREVIEW SECTION */}
              <div className="w-full lg:w-5/12 bg-[#111] p-8 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 
                 <div className="relative z-10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 text-center">Live Mobile Preview</h3>
                    
                    {/* Phone Frame Mockup */}
                    <div className="mx-auto w-[280px] bg-white rounded-[2rem] p-3 shadow-2xl ring-4 ring-gray-800">
                       <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[9/16] relative group cursor-pointer border border-gray-800">
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"/>
                          
                          {newBanner.image ? (
                             <>
                                <img src={newBanner.image} alt="Preview" className="w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-4 right-4 text-white">
                                   <h4 className="font-black text-2xl leading-tight mb-2 drop-shadow-md">{newBanner.title || "Your Title Here"}</h4>
                                   <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-medium opacity-90">{newBanner.subtitle || "Your catchy description goes here..."}</p>
                                   <span className="px-4 py-2 bg-[#f9a602] text-black text-[10px] font-black rounded-lg shadow-lg inline-block">
                                      {newBanner.buttonText || "BUTTON"}
                                   </span>
                                </div>
                             </>
                          ) : (
                             <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                <Upload size={32} className="mb-2 text-[#f9a602]"/>
                                <span className="text-xs font-bold">Tap to Upload Image</span>
                             </div>
                          )}
                       </div>
                    </div>
                    <p className="text-center text-gray-600 text-[10px] mt-4">Click screen to upload image</p>
                 </div>
              </div>

              {/* RIGHT: MODERN FORM SECTION */}
              <div className="w-full lg:w-7/12 flex flex-col bg-white">
                 <div className="p-8 lg:p-10 overflow-y-auto flex-1">
                    <div className="flex justify-between items-center mb-8">
                       <div>
                          <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">{editingId ? "Edit Banner" : "New Banner"}</h2>
                          <p className="text-sm text-gray-500 mt-1">Fill in the details for your slider.</p>
                       </div>
                       <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                    </div>

                    <div className="space-y-6">
                       {/* Title Input */}
                       <div className="group">
                          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Headline Title</label>
                          <div className="relative">
                             <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors"/>
                             <input type="text" name="title" value={newBanner.title} onChange={handleInputChange} placeholder="e.g. Delicious Pizza" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-lg focus:bg-white focus:border-[#f9a602] outline-none transition-all placeholder:text-gray-300"/>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="group">
                             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Button Label</label>
                             <div className="relative">
                                <MousePointerClick size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors"/>
                                <input type="text" name="buttonText" value={newBanner.buttonText} onChange={handleInputChange} placeholder="ORDER NOW" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold focus:bg-white focus:border-[#f9a602] outline-none transition-all"/>
                             </div>
                          </div>
                          <div className="group">
                             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Link URL</label>
                             <div className="relative">
                                <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors"/>
                                <input type="text" name="link" value={newBanner.link} onChange={handleInputChange} placeholder="/menu" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-medium focus:bg-white focus:border-[#f9a602] outline-none transition-all"/>
                             </div>
                          </div>
                       </div>

                       <div className="group">
                          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Description</label>
                          <div className="relative">
                             <AlignLeft size={18} className="absolute left-4 top-5 text-gray-400 group-focus-within:text-[#f9a602] transition-colors"/>
                             <textarea name="subtitle" value={newBanner.subtitle} onChange={handleInputChange} placeholder="Write a short description..." rows="3" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-medium focus:bg-white focus:border-[#f9a602] outline-none transition-all resize-none"></textarea>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Modal Footer */}
                 <div className="p-6 lg:p-8 border-t border-gray-100 flex gap-4 bg-white sticky bottom-0 z-20">
                    <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors">Cancel</button>
                    <button onClick={saveBanner} className="flex-1 py-4 rounded-2xl font-bold bg-[#0A0A0A] text-white hover:bg-[#f9a602] hover:text-black transition-all shadow-xl flex items-center justify-center gap-2">
                       <CheckCircle2 size={20}/> {editingId ? "Update Banner" : "Publish Banner"}
                    </button>
                 </div>
              </div>

           </div>
        </div>
      )}

    </div>
  );
};

export default BannersPage;