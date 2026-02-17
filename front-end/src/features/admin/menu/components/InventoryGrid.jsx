import React, { useState } from "react";
import { Edit3, Trash2, ImageIcon, AlertTriangle } from "lucide-react";

const ProductCard = ({ item, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-[1.5rem] border-2 border-slate-100 overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        
        {/* Image Section */}
        <div className="relative h-44 xs:h-48 overflow-hidden bg-slate-50 shrink-0">
          {item.previewUrl ? (
            <img 
              src={item.previewUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <ImageIcon size={32} strokeWidth={1.5} />
            </div>
          )}
          
          {/* Floating Delete (Top Right) */}
          <button 
            onClick={() => setShowConfirm(true)} 
            className="absolute top-3 right-3 p-2.5 bg-white shadow-lg hover:bg-red-600 hover:text-white text-red-600 rounded-full transition-all z-10"
            title="Delete Product"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-slate-900 border-[1px] border-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
              {item.category}
            </span>
            <span className="bg-primary border-[1px] border-primary text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
              {item.section}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight truncate">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-tight">
                  {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => onEdit(item)} 
              className="p-2.5 bg-slate-100 text-slate-700 hover:bg-primary hover:text-white rounded-xl transition-all shrink-0"
              title="Edit Product"
            >
              <Edit3 size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Description - Clamped to 2 lines */}
          <p className="text-slate-600 text-xs font-medium leading-relaxed line-clamp-2 mb-4">
            {item.description || "No description provided for this product."}
          </p>

          {/* Pricing & Stock Bar */}
          <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 line-through mb-0.5">₹{item.actualPrice}</p>
              <p className="text-2xl font-black text-slate-900 leading-none">₹{item.discountPrice}</p>
            </div>
            <div className="bg-slate-900 px-3 py-2 rounded-xl text-right">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">STOCK</p>
              <p className={`text-xs font-black  ${parseInt(item.quantity) < 10 ? 'text-yellow-400' : 'text-white'}`}>
                {item.quantity} left
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40">
          <div className="relative bg-white w-full max-w-[420px] rounded-[2rem] shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Delete Item?</h3>
            <p className="text-slate-600 text-sm font-bold mb-8">
              Are you sure you want to remove <span className="text-red-600">"{item.name}"</span>?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer py-4 text-xs font-black text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl uppercase"
              >
                Go Back
              </button>
              <button 
                onClick={() => { onDelete(item.id); setShowConfirm(false); }}
                className="cursor-pointer py-4 text-xs font-black text-white bg-red-600 hover:bg-red-700 rounded-2xl uppercase shadow-lg shadow-red-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InventoryGrid = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="mt-12 text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-slate-200 border-dashed mx-4">
        <ImageIcon className="text-slate-400 mx-auto mb-4" size={48} />
        <h3 className="text-slate-900 font-black uppercase text-lg">No Items Found</h3>
        <p className="text-slate-500 font-bold mt-1">Your inventory grid is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 px-4 sm:px-0">
      {items.map((item) => (
        <ProductCard 
          key={item.id} 
          item={item} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default InventoryGrid;