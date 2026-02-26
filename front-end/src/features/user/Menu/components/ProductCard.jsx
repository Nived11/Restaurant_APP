import React, { memo } from 'react';
import { Plus, Leaf, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ item, onProductClick, onAddToCart }) => {
  const offerPrice = Math.round(parseFloat(item.offer_price || 0));
  const actualPrice = Math.round(parseFloat(item.actual_price || item.offer_price || 0));
  const hasDiscount = actualPrice > offerPrice;
  
  const discountPercent = hasDiscount 
    ? Math.round(((actualPrice - offerPrice) / actualPrice) * 100) 
    : 0;

  const isVeg = item.dietary_preference === 'VEG';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col bg-white rounded-[1.2rem] md:rounded-[2rem] p-2.5 md:p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
      onClick={() => onProductClick?.(item)}
    >
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] bg-gray-50">
        <motion.img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="h-full w-full object-cover will-change-transform transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges Layer */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-[#f9a602] text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
              {discountPercent}% OFF
            </span>
          )}
          
          <div className={`p-1.5 rounded-lg backdrop-blur-md shadow-sm border border-white/20 ${isVeg ? 'bg-green-50/90' : 'bg-red-50/90'}`}>
            {isVeg ? (
              <Leaf size={12} className="text-green-600 fill-current" />
            ) : (
              <Flame size={12} className="text-red-600 fill-current" />
            )}
          </div>
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="mt-3 px-1 pb-1 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-[12px] md:text-base font-black text-gray-900 leading-tight line-clamp-1 uppercase tracking-tight">
            {item.name}
          </h3>
          <p className="text-gray-500 text-[10px] md:text-xs whitespace-pre-line font-medium line-clamp-2 mt-1 min-h-[2.5em]">
            {item.description || "Authentic flavor in every bite."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[10px] md:text-[11px] text-gray-400 line-through font-bold">
                ₹{actualPrice}
              </span>
            )}
            <span className="text-base md:text-xl font-black text-black tracking-tighter">
              ₹{offerPrice}
            </span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(item);
            }}
            className="cursor-pointer h-9 w-9 md:h-11 md:w-11 bg-black text-white rounded-xl md:rounded-[1.2rem] flex items-center justify-center shadow-lg hover:bg-[#f9a602] hover:text-black transition-colors duration-300 group/btn"
          >
            <Plus size={18} md:size={22} strokeWidth={3} className="transition-transform group-hover/btn:rotate-90" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProductCard);