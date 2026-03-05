import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Leaf, Flame, Clock, Tag, ArrowRight, PlusCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCartUpdate } from "../../redux/cartSlice"; // syncCartUpdate ഇമ്പോർട്ട് ചെയ്തു
import { useNavigate } from "react-router-dom"; 

const ProductModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const cartItems = useSelector((state) => state.cart.items);
  const existingInCart = cartItems.find((i) => i.id === item.id);
  
  const alreadyInCartQty = existingInCart ? existingInCart.quantity : 0;
  const availableStock = item.quantity || 0;
  const maxAvailableToAdd = availableStock - alreadyInCartQty;

  const [quantity, setQuantity] = useState(maxAvailableToAdd > 0 ? 1 : 0);
  const [isAdded, setIsAdded] = useState(false); 

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleIncrease = () => {
    if (quantity < maxAvailableToAdd) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error(`Maximum stock limit reached!`);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      // 1. ലോക്കൽ സ്റ്റേറ്റ് അപ്‌ഡേറ്റ്
      dispatch(addToCart({ item, quantity }));
      
      // 2. ബാക്കെൻഡ് സിങ്ക് (യൂസർ ലോഗിൻ ചെയ്തിട്ടുണ്ടെങ്കിൽ മാത്രം)
      const token = localStorage.getItem('user_access'); // നിങ്ങളുടെ ടോക്കൺ കീ ഇവിടെ നൽകുക
      if (token) {
        dispatch(syncCartUpdate({ itemId: item.id, actionType: 'add' }));
      }

      toast.success(`${item.name} added to cart!`);
      setIsAdded(true); 
    }
  };

  const actualPrice = parseFloat(item.actual_price || 0);
  const offerPrice = parseFloat(item.offer_price || 0);
  const isVeg = item.dietary_preference === "VEG";

  let discountPercent = 0;
  if (actualPrice > offerPrice) {
    discountPercent = Math.round(((actualPrice - offerPrice) / actualPrice) * 100);
  }

  const modalVariants = {
    initial: isMobile ? { y: "100%" } : { y: 30, opacity: 0, scale: 0.95 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: isMobile 
        ? { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
        : { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      y: "100%", 
      opacity: isMobile ? 1 : 0, 
      scale: isMobile ? 1 : 0.95, 
      transition: { 
        duration: 0.25, 
        ease: [0.4, 0, 1, 1], 
      }
    },
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 100 || velocity.y > 600) onClose();
        }}
        className="relative bg-white w-full md:max-w-5xl rounded-t-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden h-fit md:h-auto flex flex-col md:flex-row will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/80 backdrop-blur-md rounded-full z-50" />

        <button
          onClick={onClose}
          className="absolute right-5 top-3 p-1.5 bg-black/20 md:bg-slate-100/90 backdrop-blur-md text-white md:text-slate-900 transition-all rounded-full z-50 border border-white/10 md:border-slate-200 cursor-pointer"
        >
          <X size={isMobile ? 16 : 22} />
        </button>

        <div className="w-full md:w-[45%] h-60  md:h-[506px] relative shrink-0 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover object-center rounded-t-[2rem] md:rounded-l-[3rem] md:rounded-tr-none transition-transform duration-500 hover:scale-105" 
          />
          <div className="absolute top-4 left-4">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-wider text-white shadow-lg ${isVeg ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
              {isVeg ? <Leaf size={10} fill="currentColor" /> : <Flame size={10} fill="currentColor" />}
              {isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
        </div>

        <div className="w-full md:w-[55%] flex flex-col bg-white">
          <div className="p-5 md:p-12 flex flex-col gap-3 md:gap-5">
            <div className="space-y-0.5 md:space-y-1.5">
              <span className="text-primary font-black text-[8px] md:text-[12px] uppercase tracking-widest block">
                {item.category_name}
              </span>
              <h2 className="text-xl md:text-3xl font-black text-slate-800 leading-tight uppercase tracking-tighter">
                {item.name}
              </h2>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col gap-2 md:gap-5 items-start">
                {discountPercent > 0 && (
                  <div className="inline-flex items-center gap-1 bg-primary/20 text-primary text-[8px] md:text-[12px] font-black px-2 py-0.5 md:py-1 rounded-[1rem] border border-primary/20 w-fit">
                    <Tag size={10} strokeWidth={3} /> {discountPercent}% OFF
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter">₹{Math.round(offerPrice)}</span>
                  {actualPrice > offerPrice && (
                    <span className="text-xs md:text-sm text-slate-500 line-through font-bold">₹{Math.round(actualPrice)}</span>
                  )}
                </div>
              </div>

              <div className="border-l-2 border-primary/70 pl-3 py-0.5 ">
                <p className="text-slate-800 text-[10px] md:text-[15px] leading-snug font-bold tracking-tight line-clamp-2 md:line-clamp-none">
                  {item.description || "Authentic blend of traditional spices and fresh ingredients."}
                </p>
              </div>
            </div>

            <div className="mt-1 pt-4 border-t border-primary/20 ">
              {isAdded || maxAvailableToAdd > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Total</span>
                      <span className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">
                        ₹{Math.round(offerPrice * (isAdded ? (existingInCart?.quantity || quantity) : quantity))}
                      </span>
                    </div>

                    <div className="flex items-center bg-slate-200 gap-1 rounded-xl p-1 border border-slate-100 scale-90 md:scale-100 origin-right">
                      <button 
                        onClick={handleDecrease}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-90"
                        disabled={quantity <= 1 || isAdded}
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-black text-base text-slate-900">
                        {isAdded ? (existingInCart?.quantity || quantity) : quantity}
                      </span>
                      <button 
                        onClick={handleIncrease}
                        className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg shadow-sm active:scale-90 transition-all ${
                          quantity >= maxAvailableToAdd || isAdded ? 'bg-gray-300 text-gray-500' : 'bg-white text-black'
                        }`}
                        disabled={isAdded}
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  {!isAdded ? (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="cursor-pointer w-full bg-slate-900 text-white font-black py-3 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 shadow-xl text-[10px] md:text-sm uppercase tracking-widest hover:bg-primary transition-all duration-300"
                    >
                      <ShoppingBag size={16} strokeWidth={2.5} />
                      Add to Cart
                    </motion.button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="cursor-pointer flex-1 bg-slate-100 text-slate-900 font-black py-4 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-sm text-[10px] md:text-sm uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 border border-slate-200"
                      >
                        <PlusCircle size={16} strokeWidth={2.5} />
                        Add More
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { onClose(); navigate("/cart"); }}
                        className="cursor-pointer flex-[1.5] bg-orange-600 text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-xl text-[10px] md:text-sm uppercase tracking-widest hover:bg-orange-700 transition-all duration-300"
                      >
                        Go to Cart
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </motion.button>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl">
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    <p className="text-red-600 font-bold text-[8px] md:text-xs leading-tight">
                      Maximum limit reached for this item in your cart.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onClose(); navigate("/cart"); }}
                    className="cursor-pointer w-full bg-slate-900 text-white font-black py-3 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-xl text-[10px] md:text-sm uppercase tracking-widest"
                  >
                    Go to Cart
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;