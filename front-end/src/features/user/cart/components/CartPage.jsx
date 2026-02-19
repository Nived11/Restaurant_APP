import React, { useState } from 'react';
import { MapPin, ShieldCheck, ArrowRight, ChefHat } from 'lucide-react';
import { useCart } from '../../../user/cart/hook/useCart'; 

export default function CartPage() {
  const { cartItems, subTotal, gst, totalAmount, incrementQty, decrementQty } = useCart();
  
  // Animation State
  const [isOrderProcessing, setIsOrderProcessing] = useState(false); 

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // 1. Start Animation
    setIsOrderProcessing(true);

    // 2. Wait for 3 Seconds (Animation Time)
    setTimeout(() => {
        const newOrderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
        
        const newOrder = {
          id: newOrderId,
          customerName: "Adhil Muhammed",
          address: "Skyline Apartments, Kakkanad",
          items: cartItems.map(item => `${item.name} x${item.qty}`).join(", "),
          amount: `₹${totalAmount.toFixed(0)}`,
          status: "Pending",
          paymentMethod: "COD",
          date: new Date().toLocaleString(),
        };
    
        const existingOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
        localStorage.setItem("adminOrders", JSON.stringify([newOrder, ...existingOrders]));
    
        window.location.href = "/profile/OrderHistory"; 
        
    }, 3000);
  };

  // ✅ FULL SCREEN ANIMATION OVERLAY
  if (isOrderProcessing) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
         <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
            <div className="w-24 h-24 border-4 border-[#f9a602] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            <div className="absolute top-0 left-0 w-24 h-24 flex items-center justify-center">
               <ChefHat size={32} className="text-[#0A0A0A] animate-bounce"/>
            </div>
         </div>
         <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tighter animate-pulse">
            PLACING ORDER...
         </h2>
         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Please wait a moment</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#0A0A0A] font-sans selection:bg-[#f9a602] selection:text-black">
      
      {/* =====================================================================================
          📱 1. MOBILE VIEW (Visible < 768px)
      ===================================================================================== */}
      <div className="block md:hidden pb-40"> 
          <main className="px-4 py-6">
            
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-xl font-black text-[#0A0A0A]">Checkout</h1>
               <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                  <ShieldCheck size={10}/> SECURE
               </div>
            </div>

            {/* Address */}
            <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
               <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs font-black uppercase flex items-center gap-2"><span className="w-4 h-4 bg-[#f9a602] text-black rounded-full flex items-center justify-center text-[10px]">1</span> Delivery</h2>
                  <span className="text-[10px] font-bold text-[#f9a602]">CHANGE</span>
               </div>
               <div className="flex gap-3 items-start">
                  <MapPin size={16} className="mt-0.5 text-gray-400"/>
                  <div><span className="font-bold text-sm block">Home</span><p className="text-xs text-gray-500">Skyline Apts, Kakkanad</p></div>
               </div>
            </section>

            {/* Payment */}
            <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
               <h2 className="text-xs font-black uppercase mb-3 flex items-center gap-2"><span className="w-4 h-4 bg-gray-200 text-black rounded-full flex items-center justify-center text-[10px]">2</span> Payment</h2>
               <div className="border border-[#0A0A0A] bg-[#f9a602]/10 p-3 rounded-lg flex justify-between items-center">
                  <span className="text-xs font-bold">Cash on Delivery</span>
                  <div className="w-3 h-3 rounded-full bg-[#0A0A0A]"></div>
               </div>
            </section>

            {/* Cart Items */}
            <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-fit">
               <h3 className="font-bold text-xs mb-4">Your Order ({cartItems.length})</h3>
               <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                       <img src={item.image} alt="" className="w-12 h-12 rounded-md object-cover bg-gray-100 shrink-0"/>
                       <div className="flex-1">
                          <div className="flex justify-between mb-1"><span className="text-xs font-bold">{item.name}</span><span className="text-xs font-bold">₹{item.price * item.qty}</span></div>
                          <div className="flex items-center gap-2">
                             <button onClick={() => decrementQty(item.id)} className="bg-gray-100 w-5 h-5 rounded text-xs">-</button>
                             <span className="text-xs font-bold">{item.qty}</span>
                             <button onClick={() => incrementQty(item.id)} className="bg-gray-100 w-5 h-5 rounded text-xs">+</button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </main>

          {/* 🔴 MOBILE FOOTER */}
          <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
             <div><p className="text-[10px] text-gray-500 font-bold uppercase">Total</p><h3 className="text-lg font-black text-[#0A0A0A]">₹{totalAmount.toFixed(0)}</h3></div>
             <button onClick={handleConfirmOrder} className="bg-[#f9a602] text-black px-8 py-3 rounded-lg text-sm font-bold shadow-lg hover:bg-[#0A0A0A] hover:text-white transition-colors uppercase tracking-wide">CONFIRM ORDER</button>
          </div>
      </div>


      {/* =====================================================================================
          📟 2. TABLET VIEW (Visible 768px - 1023px)
      ===================================================================================== */}
      <div className="hidden md:block lg:hidden">
          <main className="px-8 py-10 max-w-3xl mx-auto">
             <h1 className="text-2xl font-black text-[#0A0A0A] mb-8">Checkout</h1>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                   {/* Address */}
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-sm uppercase text-gray-400">Address</h2><button className="text-xs font-bold text-[#f9a602]">CHANGE</button></div>
                      <div className="border border-[#f9a602] bg-[#f9a602]/5 p-4 rounded-xl flex items-center gap-3"><MapPin size={20} className="text-[#0A0A0A]"/><div><p className="font-bold text-sm">Home</p><p className="text-xs text-gray-600">Skyline Apartments</p></div></div>
                   </div>
                   {/* Payment */}
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                      <h2 className="font-bold text-sm mb-4 uppercase text-gray-400">Payment</h2>
                      <div className="border border-[#0A0A0A] bg-[#f9a602]/10 p-3 rounded-lg flex justify-between items-center"><span className="text-sm font-bold">Cash on Delivery</span><div className="w-3 h-3 rounded-full bg-[#0A0A0A]"></div></div>
                   </div>
                </div>
                {/* Summary */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-fit">
                   <h3 className="font-black text-base mb-4">Summary</h3>
                   <div className="space-y-3 mb-6">
                      {cartItems.map((item) => (
                         <div key={item.id} className="flex justify-between items-center text-xs"><span>{item.qty} x {item.name}</span><span className="font-bold">₹{item.price * item.qty}</span></div>
                      ))}
                   </div>
                   <div className="border-t border-gray-100 pt-4 mb-4 flex justify-between font-black text-lg"><span>Total</span><span>₹{totalAmount.toFixed(0)}</span></div>
                   <button onClick={handleConfirmOrder} className="w-full bg-[#f9a602] text-black py-2 rounded-lg font-bold text-xs shadow-md hover:bg-black hover:text-[#f9a602] transition-colors uppercase tracking-wide">Confirm Order</button>
                </div>
             </div>
          </main>
      </div>


      {/* =====================================================================================
          💻 3. LAPTOP/DESKTOP VIEW (Visible 1024px+)
      ===================================================================================== */}
      <div className="hidden lg:block">
          <main className="max-w-6xl mx-auto px-8 py-12">
             <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-black text-[#0A0A0A]">Secure Checkout</h1>
                <div className="text-xs font-bold text-gray-400 flex items-center gap-2"><ShieldCheck size={14}/> Encrypted Payment</div>
             </div>

             <div className="grid grid-cols-12 gap-12">
                <div className="col-span-7 space-y-8">
                   {/* Address */}
                   <section>
                      <div className="flex justify-between items-center mb-4"><h2 className="text-sm font-black uppercase tracking-wider">1. Delivery Address</h2><button className="text-xs font-bold text-[#f9a602] hover:underline">CHANGE ADDRESS</button></div>
                      <div className="flex gap-4 items-start p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                         <div className="bg-gray-100 p-2 rounded-full"><MapPin size={20} className="text-[#0A0A0A]"/></div>
                         <div><h3 className="font-bold text-sm">Home Address</h3><p className="text-sm text-gray-500 mt-1">Vnayak, Skyline Apartments, Kakkanad, Ernakulam - 682030</p></div>
                      </div>
                   </section>
                   {/* Payment */}
                   <section>
                      <h2 className="text-sm font-black uppercase tracking-wider mb-4">2. Payment Method</h2>
                      <div className="space-y-4">
                         <label className="flex items-center gap-3 p-4 border-2 border-[#0A0A0A] bg-[#f9a602]/5 rounded-xl cursor-pointer">
                            <div className="w-4 h-4 rounded-full border-[4px] border-[#0A0A0A]"></div>
                            <span className="font-bold text-sm">Cash on Delivery</span>
                         </label>
                      </div>
                   </section>
                </div>
                
                {/* Summary */}
                <div className="col-span-5">
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-6">
                      <h3 className="text-lg font-black mb-6">Order Summary</h3>
                      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                         {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 items-center border-b border-gray-50 pb-4 last:border-0">
                               <img src={item.image} className="w-12 h-12 rounded bg-gray-100 object-cover" alt=""/>
                               <div className="flex-1">
                                  <div className="flex justify-between"><h4 className="font-bold text-sm">{item.name}</h4><span className="font-bold text-sm">₹{item.price * item.qty}</span></div>
                                  <div className="flex items-center gap-2 mt-1">
                                     <button onClick={() => decrementQty(item.id)} className="text-gray-400 hover:text-black text-xs">-</button>
                                     <span className="text-xs font-bold">{item.qty}</span>
                                     <button onClick={() => incrementQty(item.id)} className="text-gray-400 hover:text-black text-xs">+</button>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="space-y-2 mb-6 text-sm">
                         <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subTotal}</span></div>
                         <div className="flex justify-between text-gray-500"><span>Tax</span><span>₹{gst}</span></div>
                         <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-200 text-[#0A0A0A]">
                            <span className="font-bold">Total</span>
                            <span className="font-black text-2xl">₹{totalAmount.toFixed(0)}</span>
                         </div>
                      </div>
                      <button onClick={handleConfirmOrder} className="w-full bg-[#f9a602] text-black py-3.5 rounded-lg font-bold text-sm hover:bg-[#0A0A0A] hover:text-white transition-all flex justify-center items-center gap-2 shadow-md uppercase tracking-wide">
                         CONFIRM ORDER <ArrowRight size={16}/>
                      </button>
                   </div>
                </div>
             </div>
          </main>
      </div>

    </div>
  )
}