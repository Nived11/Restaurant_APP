import React from 'react';
import { Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';

const BannersListTablet = ({ banners, openAddModal, openEditModal, setViewBanner, setDeleteId }) => {
  return (
    <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
      {/* Add Button Card */}
      <button onClick={openAddModal} className="group h-[300px] rounded-[2rem] border-2 border-dashed border-gray-300 hover:border-[#f9a602] bg-white hover:bg-[#f9a602]/5 transition-all flex flex-col items-center justify-center text-center p-6 cursor-pointer">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:text-[#f9a602]"><Plus size={28} /></div>
        <h3 className="text-lg font-black text-gray-800 group-hover:text-[#f9a602]">Add Banner</h3>
      </button>

      {/* Banner Cards */}
      {banners.map((banner) => (
        <div key={banner.id} onClick={() => setViewBanner(banner)} className="group relative h-[300px] bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer">
          <div className="absolute inset-0">
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          </div>
          <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white">
             <h3 className="font-black text-xl leading-tight mb-2 line-clamp-2">{banner.title}</h3>
             <button className="px-4 py-2 bg-white text-black text-[10px] font-black rounded-xl flex items-center gap-2 mt-2">{banner.buttonText} <ArrowRight size={14}/></button>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-14 group-hover:translate-x-0 transition-transform duration-300">
             <button onClick={(e) => { e.stopPropagation(); openEditModal(banner); }} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black shadow-lg"><Edit2 size={16} /></button>
             <button onClick={(e) => { e.stopPropagation(); setDeleteId(banner.id); }} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 shadow-lg"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannersListTablet;