import React, { useState, useEffect } from "react";
import { Edit2, Trash2, AlertTriangle, X } from "lucide-react";

const CategoryList = ({ categories, onEdit, onDelete, fetching }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [skeletonCount, setSkeletonCount] = useState(10);
  
  // Swipe State
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const updateCount = () => setSkeletonCount(window.innerWidth < 640 ? 4 : 10);
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Smooth Swipe Logic
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientY);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd < -70) setSelectedCategory(null); // Swipe down
  };

  if (fetching) {
    return (
      <div className="w-full overflow-hidden mt-4 px-2">
        <div className="flex gap-6 overflow-hidden">
          {[...Array(skeletonCount)].map((_, n) => (
            <div key={n} className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
              <div className="h-2.5 w-12 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      {/* Scrollbar hide using inline style for safety */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex gap-6 overflow-x-auto no-scrollbar px-2 py-2 select-none">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => setSelectedCategory(cat)}
            className="group flex flex-col items-center gap-3 cursor-pointer min-w-fit"
          >
            {/* Old Size: w-20 h-20 */}
           {/* Old Size: w-20 h-20 */}
<div className="relative w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white transition-all duration-300 sm:group-hover:scale-110 active:scale-90">
  <img 
    src={cat.image || "/placeholder-food.png"} 
    alt={cat.name} 
    loading="lazy"
    className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:blur-[2px]"
  />
  
  {/* Hover Text: "CLICK" */}
  <div className="absolute inset-0 bg-slate-900/40 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
    <span className="text-[10px] font-black text-white uppercase tracking-widest">
      Click
    </span>
  </div>
</div>

            <span className="text-[11px] font-black uppercase tracking-tight text-slate-800 transition-colors">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* --- Smooth Bottom Sheet (Mobile) / Centered Modal (Desktop) --- */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center transition-opacity duration-300 ease-out"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedCategory(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`
              bg-white w-full sm:max-w-sm 
              rounded-t-[2.5rem] sm:rounded-[2rem] 
              shadow-2xl overflow-hidden 
              transform transition-transform duration-300 ease-out
              ${selectedCategory ? 'translate-y-0' : 'translate-y-full'}
              animate-in slide-in-from-bottom-full
            `}
          >
            {/* Mobile Swipe Handle */}
            <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto mt-4 mb-2 sm:hidden" />

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Actions</h4>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tight">{selectedCategory.name}</p>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="p-2 bg-slate-50 rounded-full text-slate-500 sm:block hidden">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => { onEdit(selectedCategory); setSelectedCategory(null); }}
                  className="cursor-pointer flex items-center gap-4 w-full p-4 bg-slate-200  border-2 border-transparent  hover:bg-slate-300 rounded-2xl transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl text-slate-900">
                    <Edit2 size={16} />
                  </div>
                  <span className="font-black uppercase text-[10px] tracking-widest text-slate-700">Edit Category</span>
                </button>

                <button 
                  onClick={() => { setConfirmDelete(selectedCategory); setSelectedCategory(null); }}
                  className="cursor-pointer flex items-center gap-4 w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl text-red-600">
                    <Trash2 size={16} />
                  </div>
                  <span className="font-black uppercase text-[10px] tracking-widest text-red-600">Delete Category</span>
                </button>
              </div>

              <button 
                onClick={() => setSelectedCategory(null)}
                className="w-full mt-6 py-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] sm:hidden"
              >
                Swipe down to close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation (Always Centered) --- */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-[380px] rounded-[2.5rem] shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={30} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase">Delete?</h3>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              Remove <span className="text-red-600 font-bold">"{confirmDelete.name}"</span> permanently?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setConfirmDelete(null)}
                className="cursor-pointer py-4 bg-slate-300 text-slate-800 rounded-xl font-black uppercase text-[9px] tracking-widest"
              >
                Cancel
              </button>
              <button 
                onClick={() => { onDelete(confirmDelete.id); setConfirmDelete(null); }}
                className="cursor-pointer py-4 bg-red-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg shadow-red-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;