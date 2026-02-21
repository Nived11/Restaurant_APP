import React from "react";
import { ImageIcon, ChevronDown, ArrowLeft } from "lucide-react";

const MenuFormModal = ({ 
  formData, 
  setFormData, 
  onClose, 
  onSubmit, 
  editingId, 
  sections, 
  categories, 
  fileInputRef, 
  handleImageChange,
  isPage = true 
}) => {
  
  // Responsive classes
  const inputClass = "w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-[12px] md:text-[13px] font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-950 focus:bg-white transition-all appearance-none";
  const labelClass = "text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block";

  const formContent = (
    <form onSubmit={onSubmit} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        
        {/* Left Side: Image & Toggle */}
        <div className="md:col-span-5 lg:col-span-4 space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label className={labelClass}>Product Image</label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="relative aspect-square md:aspect-auto md:h-[300px] rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-950 transition-all shadow-sm"
            >
              {formData.previewUrl ? (
                <img src={formData.previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="text-center p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-3">
                    <ImageIcon size={20} className="text-slate-400" />
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Upload Photo</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Dietary Preference</label>
            <div className="flex p-1 bg-slate-100 rounded-xl md:rounded-2xl gap-1">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, isVeg: true})} 
                className={`cursor-pointer flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase transition-all ${
                  formData.isVeg ? 'bg-green-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Veg
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, isVeg: false})} 
                className={`cursor-pointer flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase transition-all ${
                  !formData.isVeg ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Non-Veg
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:col-span-7 lg:col-span-8 space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Section</label>
              <div className="relative">
                <select className={inputClass} required value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})}>
                  {sections.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select className={inputClass} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Product Name</label>
            <input required className={inputClass} placeholder="e.g. Double Cheese Margherita" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Description</label>
            <textarea className={`${inputClass} resize-none h-24 md:h-28`} placeholder="Describe the taste, ingredients, etc." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          {/* Price & Qty - Stacked in 3 lines on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Actual Price (₹)</label>
              <input type="number" className={inputClass} value={formData.actualPrice} onChange={(e) => setFormData({...formData, actualPrice: e.target.value})} placeholder="0.00" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Offer Price (₹)</label>
              <input type="number" className={inputClass} value={formData.discountPrice} onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} placeholder="0.00" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Quantity</label>
              <input type="number" className={inputClass} value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="1" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 border-t border-slate-100">
        <button 
          type="button"
          onClick={onClose}
          className="bg-slate-200  cursor-pointer flex-1 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-[12px] font-black uppercase tracking-widest text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all order-2 sm:order-1"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="cursor-pointer flex-[2] bg-slate-900 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] md:text-[12px] shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] order-1 sm:order-2"
        >
          {editingId ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </form>
  );

  if (isPage) {
    // Increased max-width for desktop (max-w-6xl)
    return <div className="max-w-6xl mx-auto px-2 md:px-0 pb-10">{formContent}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">
            {editingId ? "Edit" : "New"} <span className="text-primary">Product</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar">
          {formContent}
        </div>
      </div>
    </div>
  );
};

export default MenuFormModal;