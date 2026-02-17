import React from "react";
import { X, ImageIcon, ChevronDown } from "lucide-react";

const MenuFormModal = ({ 
  formData, 
  setFormData, 
  onClose, 
  onSubmit, 
  editingId, 
  sections, 
  categories, 
  fileInputRef, 
  handleImageChange 
}) => {
  
  // UPDATED: Added a visible border (border-slate-200) and high-contrast text
  const inputClass = " w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-950 focus:bg-white transition-all appearance-none";
  const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-2 sm:px-4  bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
            {editingId ? "Edit" : "New"} <span className="text-primary">Product</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-gray-400 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Side: Image & Veg/Non-Veg Toggle */}
            <div className="md:col-span-4 space-y-5">
              <div 
                onClick={() => fileInputRef.current.click()}
                className="relative aspect-square rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-950 transition-all"
              >
                {formData.previewUrl ? (
                  <img src={formData.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-[9px] font-black text-slate-400 uppercase">Upload Photo</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>

              <div>
                <label className={labelClass}>Dietary Preference</label>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, isVeg: true})} 
                    className={` cursor-pointer flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                      formData.isVeg 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Veg
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, isVeg: false})} 
                    className={` cursor-pointer flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                      !formData.isVeg 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="md:col-span-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative ">
                  <label className={labelClass}>Section</label>
                  <div className="relative ">
                    <select 
                      className={inputClass} 
                      required
                      
                      value={formData.section} 
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                    >
                      {sections.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div className="relative">
                  <label className={labelClass}>Category</label>
                  <div className="relative">
                    <select 
                      className={inputClass} 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Product Name</label>
                <input 
                  required 
                  className={inputClass} 
                  placeholder="Double Cheese Margherita..." 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea 
                  className={`${inputClass} resize-none h-20`} 
                  placeholder="What makes this dish special?" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>actual Price ₹</label>
                  <input type="number" className={inputClass} value={formData.actualPrice} onChange={(e) => setFormData({...formData, actualPrice: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>discount Price ₹</label>
                  <input type="number" className={inputClass} value={formData.discountPrice} onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Qty</label>
                  <input type="number" className={inputClass} value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-0  sm:pt-4 sticky  bg-white">
            <button 
              type="submit" 
              className="cursor-pointer w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-xl hover:bg-primary transition-all active:scale-[0.98]"
            >
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuFormModal;