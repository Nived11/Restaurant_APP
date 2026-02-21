import React from "react";
import { ImageIcon, ChevronDown, ArrowLeft } from "lucide-react";

const MenuFormModal = ({ formData, setFormData, onClose, onSubmit, editingId, sections, categories, fileInputRef, handleImageChange, isPage = true }) => {
  const inputClass = "w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-[12px] md:text-[13px] font-bold text-slate-900 outline-none focus:border-slate-950 focus:bg-white transition-all appearance-none";
  const labelClass = "text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block";

  const formContent = (
    <form onSubmit={onSubmit} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <label className={labelClass}>Product Image</label>
            <div onClick={() => fileInputRef.current.click()} className="relative aspect-square md:h-[300px] rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-950 transition-all shadow-sm">
              {formData.previewUrl ? <img src={formData.previewUrl} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center"><ImageIcon size={20} className="text-slate-400 mx-auto mb-2" /><p className="text-[9px] font-black text-slate-400 uppercase">Upload Photo</p></div>}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Dietary Preference</label>
            <div className="flex p-1 bg-slate-100 rounded-2xl gap-1">
              <button type="button" onClick={() => setFormData({...formData, isVeg: true})} className={`cursor-pointer flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.isVeg ? 'bg-green-600 text-white shadow-sm' : 'text-slate-500'}`}>Veg</button>
              <button type="button" onClick={() => setFormData({...formData, isVeg: false})} className={`cursor-pointer flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${!formData.isVeg ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500'}`}>Non-Veg</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Section</label>
              <div className="relative">
                <select className={inputClass} required value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})}>
                  <option value="">Select Section</option>
                  {sections.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select className={inputClass} required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
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
            <textarea className={`${inputClass} resize-none h-28`} placeholder="Description..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="number" className={inputClass} value={formData.actualPrice} onChange={(e) => setFormData({...formData, actualPrice: e.target.value})} placeholder="Actual ₹" />
            <input type="number" className={inputClass} value={formData.discountPrice} onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} placeholder="Offer ₹" />
            <input type="number" className={inputClass} value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="Qty" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-slate-100">
        <button type="button" onClick={onClose} className="cursor-pointer flex-1 py-4 rounded-2xl text-[11px] font-black uppercase text-slate-600 bg-slate-200">Cancel</button>
        <button type="submit" className="cursor-pointer flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[11px] shadow-xl">
          {editingId ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </form>
  );

  return isPage ? <div className="max-w-6xl mx-auto pb-10">{formContent}</div> : <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"><div className="bg-white w-full max-w-5xl rounded-[2rem] p-8 overflow-y-auto max-h-[90vh]">{formContent}</div></div>;
};

export default MenuFormModal;