import React from 'react';
import { Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';

const BannersListLaptop = ({ banners, openAddModal, openEditModal, setViewBanner, setDeleteId }) => {
  return (
    <div className="hidden lg:grid grid-cols-3 gap-8">
      {/* Add Button Card */}
      <button onClick={openAddModal} className="group h-[340px] rounded-[2.5rem] border-2 border-dashed border-gray-300 hover:border-[#f9a602] bg-white hover:bg-[#f9a602]/5 transition-all flex flex-col items-center justify-center text-center p-8 cursor-pointer active:scale-95">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400 group-hover:text-[#f9a602]"><Plus size={32} /></div>
        <h3 className="text-xl font-black text-gray-800 group-hover:text-[#f9a602]">Add New Banner</h3>
      </button>

      {/* Banner Cards */}
      {banners.map((banner) => (
        <div key={banner.id} className="group relative h-[340px] bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 cursor-pointer">
           <div className="absolute inset-0">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
           </div>
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
  );
};

export default BannersListLaptop;