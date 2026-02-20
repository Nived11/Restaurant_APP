import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

const BannersListMobile = ({ banners, openAddModal, openEditModal, setDeleteId }) => {
  return (
    <div className="block md:hidden w-full">
      
      {/* Add Button */}
      <button 
        onClick={openAddModal} 
        className="w-full py-4 mb-6 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 text-gray-400 font-bold active:scale-95 transition-transform hover:border-[#f9a602] hover:text-[#f9a602]"
      >
        <Plus size={20} /> Add New Banner
      </button>

      {/* Cards List */}
      <div className="flex flex-col gap-4 w-full">
        {banners.map((banner) => (
          // Card Container - w-full ensures it fits within screen padding
          <div key={banner.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-full">
            
            {/* Image Section */}
            <div className="relative w-full aspect-video">
               <img 
                 src={banner.image} 
                 alt={banner.title} 
                 className="w-full h-full object-cover"
               />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
               
               {/* Title & Subtitle */}
               <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-black text-lg leading-tight line-clamp-1">{banner.title}</h3>
                  <p className="text-gray-300 text-xs line-clamp-1 mt-1 opacity-90">{banner.subtitle}</p>
               </div>
            </div>

            {/* Action Footer (Button Label & Actions) */}
            <div className="flex items-center justify-between p-3 bg-white border-t border-gray-50">
                {/* Banner Button Text Display */}
                <span className="bg-yellow-50 text-yellow-700 border border-yellow-100 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                  {banner.buttonText}
                </span>
                
                {/* Edit & Delete Buttons */}
                <div className="flex gap-3">
                   <button 
                     onClick={(e) => { e.stopPropagation(); openEditModal(banner); }}
                     className="p-2.5 bg-gray-50 text-black rounded-xl border border-gray-200 hover:bg-black hover:text-white transition-colors active:scale-90"
                     title="Edit"
                   >
                     <Edit2 size={16} />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setDeleteId(banner.id); }}
                     className="p-2.5 bg-red-50 text-red-500 rounded-xl border border-red-100 hover:bg-red-500 hover:text-white transition-colors active:scale-90"
                     title="Delete"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BannersListMobile;