import React from 'react';
import { X, Trash2, Edit2 } from 'lucide-react';

const BannerDetailModal = ({ banner, onClose, onEdit, onDelete }) => {
  if (!banner) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md animate-in fade-in duration-200">
       <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
          <div className="relative h-56 w-full">
             <img src={banner.image} alt="Preview" className="w-full h-full object-cover"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white"><X size={20}/></button>
             <div className="absolute bottom-4 left-6 right-6 text-white"><h3 className="font-black text-2xl leading-tight mb-1">{banner.title}</h3></div>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Description</label>
                <p className="text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 break-words">{banner.subtitle}</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Button</label>
                    <p className="font-bold text-[#0A0A0A]">{banner.buttonText}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 overflow-hidden">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Link</label>
                    <p className="font-bold text-[#f9a602] truncate">{banner.link || "No Link"}</p>
                </div>
             </div>
             <div className="flex flex-col xs:flex-row gap-3 pt-2">
                <button onClick={() => onDelete(banner.id)} className="flex-1 py-4 rounded-2xl font-bold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 flex items-center justify-center gap-2"><Trash2 size={18}/> Delete</button>
                <button onClick={() => onEdit(banner)} className="flex-1 sm:flex-[2] py-4 rounded-2xl font-bold bg-[#0A0A0A] text-white hover:bg-[#f9a602] hover:text-black flex items-center justify-center gap-2 shadow-xl"><Edit2 size={18}/> Edit Banner</button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default BannerDetailModal;