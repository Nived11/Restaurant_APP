import { motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState } from "react";

const ProductModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-20 bg-white/90 p-2.5 rounded-full shadow-lg border border-gray-100">
          <X size={20} className="text-black" />
        </button>

        <div className="h-72 md:h-80 w-full relative">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-8 text-white">
            <h2 className="text-3xl font-black mb-1">{item.name}</h2>
            <div className="flex items-center gap-2">
               <span className="bg-primary/90 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                 {item.category_name}
               </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-3">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description || "Experience the authentic flavors with our chef's special preparation using fresh ingredients."}
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest block mb-1">Total Price</span>
              <span className="text-3xl font-black text-black">₹{item.price * quantity}</span>
            </div>

            <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-inner">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                <Minus size={18} />
              </button>
              <span className="w-12 text-center font-black text-xl">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                <Plus size={18} />
              </button>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-black font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all"
          >
            <ShoppingBag size={22} />
            Add to Bag
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;