import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Leaf, Flame, Clock, Tag, ArrowRight, PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCartUpdate } from "../../redux/cartSlice"; 
import { useNavigate } from "react-router-dom";

const ProductModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Variants Handling
  const hasVariants = item?.has_variants && item?.variants?.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? item.variants[0] : null);

  const cartItems = useSelector((state) => state.cart.items);
  const { isOpen } = useSelector((state) => state.location); 
  
  // Check if regular item or specific variant exists in cart
  const existingInCart = cartItems.find((i) => {
    if (hasVariants) {
      return Number(i.item_id) === Number(item.id) && Number(i.variant_id) === Number(selectedVariant?.id);
    } else {
      return Number(i.item_id) === Number(item.id) && !i.variant_id;
    }
  });

  const alreadyInCartQty = existingInCart ? existingInCart.quantity : 0;
  const availableStock = hasVariants ? (selectedVariant?.quantity || 0) : (item.quantity || 0);
  const maxAvailableToAdd = availableStock - alreadyInCartQty;

  const [quantity, setQuantity] = useState(maxAvailableToAdd > 0 ? 1 : 0);
  const [isAdded, setIsAdded] = useState(false);

  const isStoreClosed = isOpen === false;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Reset quantity and added state when variant changes
  useEffect(() => {
    const stock = hasVariants ? (selectedVariant?.quantity || 0) : (item.quantity || 0);
    const inCart = existingInCart ? existingInCart.quantity : 0;
    const max = stock - inCart;
    
    setQuantity(max > 0 ? 1 : 0);
    setIsAdded(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, selectedVariant?.id]); 

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
    if (isStoreClosed) {
      toast.error("Store is currently closed!");
      return;
    }

    if (quantity > 0) {
      const cartPayload = hasVariants 
        ? { 
            item: { 
              ...item, 
              id: `${item.id}-${selectedVariant.id}`, 
              item_id: item.id, 
              variant_id: selectedVariant.id, 
              name: `${item.name} (${selectedVariant.size_name})`, 
              actual_price: selectedVariant.actual_price, 
              offer_price: selectedVariant.offer_price || selectedVariant.actual_price 
            }, 
            quantity 
          }
        : { item: { ...item, item_id: item.id }, quantity };

      dispatch(addToCart(cartPayload));
      
      const token = localStorage.getItem('user_access'); 
      if (token) {
        dispatch(syncCartUpdate({ 
          itemId: item.id, 
          variantId: hasVariants ? selectedVariant.id : null,
          actionType: 'add', 
          quantity: quantity 
        }));
      }
      
      toast.success(`${hasVariants ? `${item.name} (${selectedVariant.size_name})` : item.name} added to cart!`);
      setIsAdded(true);
    }
  };

  // Determine Prices based on selected Variant
  const actualPrice = hasVariants 
    ? parseFloat(selectedVariant?.actual_price || 0) 
    : parseFloat(item.actual_price || 0);
    
  const offerPrice = hasVariants 
    ? parseFloat(selectedVariant?.offer_price || selectedVariant?.actual_price || 0) 
    : parseFloat(item.offer_price || item.actual_price || 0);
    
  const isVeg = item.dietary_preference === "VEG";

  let discountPercent = 0;
  if (actualPrice > offerPrice) {
    discountPercent = Math.round(((actualPrice - offerPrice) / actualPrice) * 100);
  }

  const modalVariants = {
    initial: isMobile ? { y: "100%" } : { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 300, duration: isMobile ? 0.3 : 0.4 }
    },
    exit: {
      y: "100%",
      opacity: isMobile ? 1 : 0,
      transition: { duration: 0.2, ease: "easeIn" }
    },
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden outline-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] md:backdrop-blur-md"
      />

      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0 }}
        dragElastic={0.05}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 80 || velocity.y > 500) onClose();
        }}
        className="relative bg-white w-full md:max-w-5xl rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden h-[96vh] md:h-[85vh] max-h-[900px] z-10 mt-auto md:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-slate-300 rounded-full z-50" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 md:right-5 md:top-5 p-2 bg-black/20 md:bg-slate-100/90 backdrop-blur-md text-white md:text-slate-900 transition-all rounded-full z-50 border border-white/20 md:border-slate-200 cursor-pointer hover:bg-slate-200"
        >
          <X size={isMobile ? 18 : 22} strokeWidth={2.5} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-[45%] relative shrink-0 h-[25vh] min-h-[180px] md:h-full bg-slate-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center rounded-t-[2rem] md:rounded-l-[2.5rem] md:rounded-tr-none"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white shadow-lg ${isVeg ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
              {isVeg ? <Leaf size={10} fill="currentColor" /> : <Flame size={10} fill="currentColor" />}
              {isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 md:hidden pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[55%] flex flex-col bg-white h-[calc(100%-25vh)] md:h-full">
          
          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 no-scrollbar">
            
            {/* Title & Price */}
            <div className="space-y-1.5 md:space-y-3 mt-1 md:mt-0">
              <div className="space-y-0.5 md:space-y-1.5">
                <span className="text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest block">
                  {item.category_name}
                </span>
                <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                  {item.name}
                </h2>
              </div>

              <div className="flex flex-col gap-1.5 items-start">
                {discountPercent > 0 && (
                  <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[9px] md:text-[11px] font-black px-2 py-1 rounded-md border border-primary/20">
                    <Tag size={10} strokeWidth={3} /> {discountPercent}% OFF
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">₹{Math.round(offerPrice)}</span>
                  {actualPrice > offerPrice && (
                    <span className="text-sm md:text-base text-slate-400 line-through font-bold">₹{Math.round(actualPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-l-2 border-slate-200 pl-3 py-1 mt-3 md:mt-4">
              <p className="text-slate-500 text-[11px] md:text-[13px] leading-relaxed font-medium">
                {item.description || "Authentic blend of traditional spices and fresh ingredients."}
              </p>
            </div>

            {/* Variants Selection - LIST VIEW */}
            {hasVariants && (
              <div className="mt-5 md:mt-6 space-y-3">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-widest">
                     Choose Size / Variant
                   </h3>
                   <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">Required</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {item.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const variantOfferPrice = parseFloat(variant.offer_price || variant.actual_price);
                    const variantActualPrice = parseFloat(variant.actual_price);
                    
                    return (
                      <div 
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`group relative cursor-pointer border-2 rounded-xl p-2.5 md:p-3.5 flex flex-row items-center justify-between transition-all ${
                          isSelected 
                            ? 'border-slate-900 bg-slate-50/50 shadow-sm' 
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Custom Radio Button */}
                          <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-slate-900' : 'border-slate-300 group-hover:border-slate-400'
                          }`}>
                            {isSelected && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-slate-900 rounded-full" />}
                          </div>
                          <span className={`text-[11px] md:text-[13px] font-black uppercase tracking-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                            {variant.size_name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                           {variantActualPrice > variantOfferPrice && (
                             <span className="text-[9px] md:text-[10px] line-through text-slate-400 font-bold">
                               ₹{Math.round(variantActualPrice)}
                             </span>
                           )}
                           <span className={`text-[12px] md:text-sm font-black ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                             ₹{Math.round(variantOfferPrice)}
                           </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="h-4 md:h-6"></div>
          </div>

          {/* Sticky Action Area (Footer) */}
          <div className="shrink-0 bg-white border-t border-slate-100 p-3 md:p-6 lg:p-8 z-20 pb-6 md:pb-6 lg:pb-8 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] md:shadow-none">
            {isStoreClosed && !isAdded && (
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2 md:mb-3 bg-red-50 py-1.5 md:py-2 rounded-xl border border-red-100">
                <Clock size={14} />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-tight">Store is currently Closed</span>
              </div>
            )}

            {isAdded || maxAvailableToAdd > 0 ? (
              <>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Total Amount</span>
                    <span className="text-[17px] md:text-2xl font-black text-slate-900 tracking-tighter">
                      ₹{Math.round(offerPrice * (isAdded ? (existingInCart?.quantity || quantity) : quantity))}
                    </span>
                  </div>

                  <div className="flex items-center bg-slate-100 gap-1 rounded-xl p-1 border border-slate-200">
                    <button
                      onClick={handleDecrease}
                      className="cursor-pointer w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-95 disabled:opacity-50 text-slate-700"
                      disabled={quantity <= 1 || isAdded || isStoreClosed}
                    >
                      <Minus size={14} md:size={16} strokeWidth={3} />
                    </button>
                    <span className="w-8 md:w-12 text-center font-black text-xs md:text-base text-slate-900">
                      {isAdded ? (existingInCart?.quantity || quantity) : quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className={`cursor-pointer w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-lg shadow-sm active:scale-95 transition-all ${quantity >= maxAvailableToAdd || isAdded || isStoreClosed ? 'bg-slate-200 text-slate-400' : 'bg-white text-slate-700'}`}
                      disabled={isAdded || isStoreClosed}
                    >
                      <Plus size={14} md:size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {!isAdded ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isStoreClosed}
                    className={`cursor-pointer w-full font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[11px] md:text-sm uppercase tracking-widest transition-all duration-200 
                      ${isStoreClosed ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black hover:shadow-xl'}`}
                  >
                    <ShoppingBag size={16} md:size={18} strokeWidth={2.5} />
                    {isStoreClosed ? "Store Closed" : "Add to Cart"}
                  </motion.button>
                ) : (
                  <div className="flex gap-2 md:gap-3">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="cursor-pointer flex-[1] bg-white text-slate-900 font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-[10px] md:text-xs uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-50"
                    >
                      <PlusCircle size={14} md:size={16} strokeWidth={2.5} />
                      <span className="hidden sm:inline">Add More</span>
                      <span className="sm:hidden">More</span>
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { onClose(); navigate("/cart"); }}
                      className="cursor-pointer flex-[1.5] bg-primary text-black font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#e59802]"
                    >
                      View Cart
                      <ArrowRight size={16} md:size={18} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2.5 md:space-y-4">
                <div className="flex items-start md:items-center gap-2 md:gap-3 bg-red-50 border border-red-100 p-2 md:p-4 rounded-xl">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5 md:mt-0" size={14} md:size={20} />
                  <p className="text-red-600 font-bold text-[9px] md:text-xs leading-tight">
                    {availableStock === 0 ? (
                      "Sold Out! This size/variant is currently out of stock."
                    ) : (
                      `Hurry! Only ${maxAvailableToAdd} left in your limit.`
                    )}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); navigate("/cart"); }}
                  className="cursor-pointer w-full bg-slate-900 text-white font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-[11px] md:text-sm uppercase tracking-widest hover:bg-black"
                >
                  View Cart
                  <ArrowRight size={16} md:size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;