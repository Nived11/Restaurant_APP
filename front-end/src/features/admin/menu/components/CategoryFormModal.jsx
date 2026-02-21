import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import { useCategory } from "../hooks/useCategory"; // ഹുക്ക് ഇമ്പോർട്ട് ചെയ്യുക

const CategoryFormModal = ({ onClose }) => {
  const { addCategory, loading, error } = useCategory(); // ഹുക്കിൽ നിന്ന് സ്റ്റേറ്റുകൾ എടുക്കുക
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ഹുക്കിലെ ഫംഗ്‌ഷൻ നേരിട്ട് കോൾ ചെയ്യുന്നു
    await addCategory({ name: catName, image });
    // സക്സസ് ആണെങ്കിൽ മാത്രം ക്ലോസ് ചെയ്യും (ഹുക്കിൽ setIsCatModalOpen(false) ഉള്ളതിനാൽ ഇത് ഓപ്ഷണലാണ്)
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-black uppercase text-slate-900 tracking-tight">Add <span className="text-primary">Category</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-gray-500 transition-colors"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center bg-red-50 py-2 rounded-lg">{error}</p>}
          
          <div 
            onClick={() => fileRef.current.click()}
            className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-slate-950 transition-all overflow-hidden"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <>
                <Upload size={24} className="text-slate-500 mb-1" />
                <p className="text-[9px] font-black text-slate-500 uppercase">Category Image</p>
              </>
            )}
            <input type="file" ref={fileRef} className="hidden" onChange={handleImg} />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 mb-1.5 block">Category Name</label>
            <input 
              required
              className="w-full bg-slate-50 border-2 border-slate-400 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-slate-950 transition-all placeholder:text-slate-400"
              placeholder="e.g. Desserts, Sea Food"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-primary transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;