import React, { useState, useRef } from "react";
import { X, ImageIcon, Upload } from "lucide-react";

const CategoryFormModal = ({ onClose, onSave }) => {
  const [catName, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: catName, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-black uppercase text-slate-900 tracking-tight">Add <span className="text-primary">Category</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Image Upload */}
          <div 
            onClick={() => fileRef.current.click()}
            className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-slate-950 transition-all overflow-hidden"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <>
                <Upload size={24} className="text-slate-300 mb-1" />
                <p className="text-[9px] font-black text-slate-400 uppercase">Category Image</p>
              </>
            )}
            <input type="file" ref={fileRef} className="hidden" onChange={handleImg} />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Category Name</label>
            <input 
              required
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-slate-950 transition-all"
              placeholder="e.g. Desserts, Sea Food"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-primary transition-all shadow-lg">
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;