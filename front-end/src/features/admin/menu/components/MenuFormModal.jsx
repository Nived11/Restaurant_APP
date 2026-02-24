import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ImageIcon, ChevronDown, X, Loader2 } from "lucide-react";

const MenuFormModal = ({ 
  formData, 
  setFormData, 
  onClose, 
  onSubmit, 
  editingId, 
  categories, 
  fileInputRef, 
  handleImageChange, 
  loading 
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const inputClass = "w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-[12px] font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none placeholder:text-slate-400";
  const labelClass = "text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1 mb-1.5 block";

  const sectionOptions = [
    { label: "Banner", value: "BANNER" },
    { label: "Combo Menu", value: "COMBO MENU" },
    { label: "Best Seller", value: "BEST SELLER" },
    { label: "Today's Special", value: "TODAY'S SPECIAL" },
    { label: "Others", value: "OTHERS" },
  ];

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />

      <motion.div 
        initial={isMobile ? { y: "100%" } : { opacity: 0, y: 20 }}
        animate={{ y: 0, opacity: 1 }}
        exit={isMobile ? { y: "100%" } : { opacity: 0, y: 20 }}
        className="relative bg-white w-full md:max-w-5xl rounded-t-[2rem] md:rounded-[1.5rem] shadow-2xl flex flex-col max-h-[98vh] md:max-h-none overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-4 md:px-8 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <X size={20} className="cursor-pointer text-slate-600 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto md:overflow-visible p-6 md:p-8 bg-white">
          <form id="product-form" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Side: Image & Dietary */}
              <div className="md:col-span-4 space-y-5">
                <div className="space-y-2">
                  <label className={labelClass}>Product Image</label>
                  <div 
                    onClick={() => fileInputRef.current.click()} 
                    className="relative aspect-square rounded-[1.5rem] border-2 border-dashed border-slate-400 bg-slate-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-900 hover:bg-slate-100 transition-all"
                  >
                    {formData.previewUrl ? (
                      <img src={formData.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={32} className="text-slate-400 mx-auto mb-2" />
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Click to upload photo</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Dietary Type</label>
                  <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-xl gap-1.5 border border-slate-300">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, dietary_preference: "VEG"})} 
                      className={`cursor-pointer py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.dietary_preference === "VEG" ? 'bg-green-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Veg
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, dietary_preference: "NON-VEG"})} 
                      className={`cursor-pointer py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.dietary_preference === "NON-VEG" ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Non-Veg
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Menu Section</label>
                    <div className="relative">
                      <select 
                        className={inputClass} 
                        required 
                        value={formData.section} 
                        onChange={(e) => setFormData({...formData, section: e.target.value})}
                      >
                        {sectionOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Category</label>
                    <div className="relative">
                      <select 
                        className={inputClass} 
                        required 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Product Name</label>
                  <input 
                    required 
                    placeholder="Enter item name..."
                    className={inputClass} 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Description</label>
                  <textarea 
                    placeholder="Short description about the item..."
                    className={`${inputClass} h-20 resize-none py-3`} 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className={labelClass}>MRP (₹)</label>
                    <input type="number" placeholder="0" className={inputClass} value={formData.actual_price} onChange={(e) => setFormData({...formData, actual_price: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Offer Price (₹)</label>
                    <input type="number" placeholder="0" className={inputClass} value={formData.offer_price} onChange={(e) => setFormData({...formData, offer_price: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Stock Count</label>
                    <input type="number" placeholder="0" className={inputClass} value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-200 flex gap-4 bg-slate-50 shrink-0">
  <button 
    disabled={loading} 
    type="button" 
    onClick={onClose} 
    className={`px-8 py-3.5 rounded-xl text-[11px] font-black uppercase text-slate-600 transition-colors border border-slate-300 bg-white 
      ${loading ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-200 cursor-pointer'}`}
  >
    Cancel
  </button>
  
  <button 
    disabled={loading} 
    form="product-form" 
    type="submit" 
    className={`flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase text-[11px] shadow-lg flex items-center justify-center gap-2 transition-all 
      ${loading ? 'opacity-70 pointer-events-none' : 'hover:bg-black active:scale-95 cursor-pointer'}`}
  >
    {loading ? (
      <>
        <Loader2 size={16} className="animate-spin" />
        {editingId ? 'Updating...' : 'Creating...'}
      </>
    ) : (
      editingId ? 'Save Changes' : 'Create New Item'
    )}
  </button>
</div>
      </motion.div>
    </div>
  );
};

export default MenuFormModal;