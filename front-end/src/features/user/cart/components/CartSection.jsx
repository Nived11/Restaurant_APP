import React from 'react';
import { useDispatch } from 'react-redux'; 
import { clearCart } from '../../../../redux/cartSlice';
import { Trash2, ArrowRight, ReceiptText, Plus, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartSection = ({ cartItems, subTotal, totalAmount, incrementQty, decrementQty, removeItem, onNext }) => {
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Heading Section */}
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <h2 className="text-md md:text-3xl font-black uppercase tracking-tight italic text-black">
          Checkout <span className="text-[#f9a602]">Details</span>
        </h2>
        {!isCartEmpty &&
          <Link to="/menu" className="group flex items-center gap-1.5 text-[8px] bg-gray-100 p-2 rounded-lg  md:text-[10px]  font-black uppercase tracking-widest text-gray-700 hover:text-[#f9a602] transition-colors">
            <Plus size={12} className="group-hover:rotate-90 transition-transform" />
            Add More Items
          </Link>
        }
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Cart Items */}
        <div className={`${isCartEmpty ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-4`}>
          {!isCartEmpty ? (
            cartItems.map((item) => {
              const currentStock = item.currentStock || 0;
              const isMaxReached = item.quantity >= currentStock;
              const isOutOfStock = item.isOutOfStock;
              
              return (
                <div 
                  key={item.id} 
                  className={`p-4 bg-white border ${isOutOfStock ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} rounded-[1.5rem] flex flex-col gap-2 shadow-md hover:shadow-sm transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover bg-gray-50 shadow-inner" alt={item.name} />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-black text-[11px] md:text-sm uppercase truncate tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-[#f9a602] font-black text-[12px] md:text-sm mt-0.5">₹{item.offer_price}</p>
                      
                      <div className="flex items-center bg-gray-50 border border-gray-300 w-fit rounded-lg mt-2 overflow-hidden">
                        <button onClick={() => decrementQty(item)} className="px-2 py-1 bg-white hover:bg-white text-black transition-colors font-bold border-r border-gray-300">-</button>
                        <span className="px-3 font-black text-[10px] text-black border-x border-gray-100">{item.quantity}</span>
                        <button 
                          onClick={() => incrementQty(item)} 
                          disabled={isMaxReached}
                          className={`px-2 py-1 font-bold transition-colors ${isMaxReached ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-l border-gray-300 hover:bg-white text-black'}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-sm md:text-base text-black tracking-tight">₹{item.offer_price * item.quantity}</p>
                      <button onClick={() => removeItem(item.id)} className="cursor-pointer text-red-500  hover:text-red-600 transition-colors mt-1 p-1">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>

                  {/* റിയൽ-ടൈം സ്റ്റോക്ക് എറർ കാണിക്കുന്നു */}
                  {isOutOfStock && (
                    <div className="flex items-center gap-1.5 text-red-600 bg-red-100/50 p-2 rounded-xl border border-red-200 animate-pulse">
                      <AlertCircle size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-tight">
                        {currentStock === 0 
                          ? "Out of Stock! Please remove this item from bag." 
                          : `Only ${currentStock} units left! Please reduce quantity.`
                        }
                      </span>
                    </div>
                  )}

                  {!isOutOfStock && isMaxReached && (
                    <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50/50 p-2 rounded-xl border border-orange-100">
                      <AlertCircle size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-tight">Maximum available stock reached</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-16 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center">
              <p className="font-black text-gray-500 uppercase tracking-widest text-xs mb-4">Your bag is empty</p>
              <Link to="/menu" className="inline-block bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f9a602] hover:text-black transition-all">Go To Menu</Link>
            </div>
          )}
        </div>

        {/* Right Side: Summary Card */}
        {!isCartEmpty && (
          <div className="lg:sticky lg:top-32">
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm relative overflow-hidden">
              <ReceiptText className="absolute left-0 -top-4 text-primary/10 w-24 h-24 -rotate-30" />
              <h4 className="relative z-10 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">Order Summary</h4>
              <div className="relative z-10 space-y-3">
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Delivery</span>
                  <span className="text-green-500 font-black">FREE</span>
                </div>
                <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-100">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-black tracking-tighter">₹{totalAmount.toFixed(0)}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={onNext} 
                disabled={cartItems.some(item => item.isOutOfStock)}
                className={`cursor-pointer w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] mt-8 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg 
                  ${cartItems.some(item => item.isOutOfStock) 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-[#f9a602] hover:text-black'}`}
              >
                  confirm Items <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSection;