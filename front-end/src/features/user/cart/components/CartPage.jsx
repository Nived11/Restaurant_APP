import React, { useState, useEffect } from 'react';
import { MapPin, ShieldCheck, ArrowRight, Package, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useCart } from '../../../user/cart/hook/useCart'; 

export default function CartPage() {
  const { cartItems, subTotal, gst, totalAmount, incrementQty, decrementQty } = useCart();
  
  // ✅ NEW: ഓർഡർ സ്റ്റാറ്റസ് ചെക്ക് ചെയ്യാൻ
  const [activeOrder, setActiveOrder] = useState(null);

  // 1. പേജ് ലോഡ് ആകുമ്പോഴും, ഓരോ 2 സെക്കൻഡിലും ഓർഡർ സ്റ്റാറ്റസ് ചെക്ക് ചെയ്യും
  useEffect(() => {
    const checkStatus = () => {
      // നിലവിലെ ഓർഡർ ID ലോക്കൽ സ്റ്റോറേജിൽ ഉണ്ടോ എന്ന് നോക്കുന്നു
      const currentOrderId = localStorage.getItem("currentOrderId");
      if (currentOrderId) {
        const allOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
        const foundOrder = allOrders.find(o => o.id === currentOrderId);
        if (foundOrder) {
          setActiveOrder(foundOrder);
        }
      }
    };

    checkStatus(); // Initial call
    const interval = setInterval(checkStatus, 2000); // Polling every 2s
    return () => clearInterval(interval);
  }, []);

  // 2. Confirm Order Logic
  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder = {
      id: newOrderId,
      customerName: "Adhil Muhammed",
      address: "Skyline Apartments, Kakkanad",
      items: cartItems.map(item => `${item.name} x${item.qty}`).join(", "),
      amount: `₹${totalAmount.toFixed(0)}`,
      status: "Pending", // Admin will change this
      paymentMethod: "COD",
      date: new Date().toLocaleString(),
    };

    // Save to Admin List
    const existingOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    localStorage.setItem("adminOrders", JSON.stringify([newOrder, ...existingOrders]));

    // ✅ Save Current Order ID for User
    localStorage.setItem("currentOrderId", newOrderId);
    setActiveOrder(newOrder); // Update UI instantly
  };

  // 3. Start New Order (Reset)
  const handleNewOrder = () => {
    localStorage.removeItem("currentOrderId");
    setActiveOrder(null);
    window.location.reload(); // Cart ക്ലിയർ ആകാൻ (റിയൽ ആപ്പിൽ function വെച്ച് ക്ലിയർ ചെയ്യാം)
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#0A0A0A] font-sans selection:bg-[#f9a602] selection:text-black">
      
      {/* =====================================================================================
          📱 1. MOBILE VIEW
      ===================================================================================== */}
      <div className="block md:hidden pb-40"> 
          <main className="px-4 py-6">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-xl font-black text-[#0A0A0A]">
                 {activeOrder ? "Order Status" : "Checkout"}
               </h1>
               <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                  <ShieldCheck size={10}/> SECURE
               </div>
            </div>

            {/* ✅ ACTIVE ORDER STATUS VIEW */}
            {activeOrder ? (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center animate-in fade-in zoom-in">
                 <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${activeOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                    {activeOrder.status === 'Delivered' ? <CheckCircle size={40}/> : <Clock size={40} className="animate-pulse"/>}
                 </div>
                 <h2 className="text-2xl font-black mb-1">
                    {activeOrder.status === 'Delivered' ? "Order Delivered!" : "Order Placed"}
                 </h2>
                 <p className="text-sm text-gray-500 font-bold mb-6">ID: {activeOrder.id}</p>
                 
                 <div className="bg-gray-50 p-4 rounded-xl text-left mb-6">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</p>
                    <p className={`text-lg font-black ${activeOrder.status === 'Delivered' ? 'text-green-600' : 'text-orange-500'}`}>
                       {activeOrder.status === 'Delivered' ? "Successfully Delivered" : "Preparing your food..."}
                    </p>
                 </div>

                 {activeOrder.status === 'Delivered' && (
                   <button onClick={handleNewOrder} className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2">
                      <RefreshCw size={18}/> Place New Order
                   </button>
                 )}
              </div>
            ) : (
              // 🛒 NORMAL CART VIEW
              <>
                <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                   <div className="flex justify-between items-center mb-3">
                      <h2 className="text-xs font-black uppercase flex items-center gap-2">
                         <span className="w-4 h-4 bg-[#f9a602] text-black rounded-full flex items-center justify-center text-[10px]">1</span> Delivery
                      </h2>
                      <span className="text-[10px] font-bold text-[#f9a602]">CHANGE</span>
                   </div>
                   <div className="flex gap-3 items-start">
                      <MapPin size={16} className="mt-0.5 text-gray-400"/>
                      <div>
                         <span className="font-bold text-sm block">Home</span>
                         <p className="text-xs text-gray-500">Skyline Apts, Kakkanad</p>
                      </div>
                   </div>
                </section>

                <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                   <h2 className="text-xs font-black uppercase mb-3 flex items-center gap-2">
                      <span className="w-4 h-4 bg-gray-200 text-black rounded-full flex items-center justify-center text-[10px]">2</span> Payment
                   </h2>
                   <div className="border border-[#0A0A0A] bg-[#f9a602]/10 p-3 rounded-lg flex justify-between items-center">
                      <span className="text-xs font-bold">Cash on Delivery</span>
                      <div className="w-3 h-3 rounded-full bg-[#0A0A0A]"></div>
                   </div>
                </section>

                <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-fit">
                   <h3 className="font-bold text-xs mb-4">Your Order ({cartItems.length})</h3>
                   <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                           <img src={item.image} alt="" className="w-12 h-12 rounded-md object-cover bg-gray-100 shrink-0"/>
                           <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                 <span className="text-xs font-bold">{item.name}</span>
                                 <span className="text-xs font-bold">₹{item.price * item.qty}</span>
                              </div>
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
              </>
            )}
          </main>

          {/* 🔴 MOBILE FOOTER (Hide if Order is Placed) */}
          {!activeOrder && (
            <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
               <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Total</p>
                  <h3 className="text-lg font-black text-[#0A0A0A]">₹{totalAmount.toFixed(0)}</h3>
               </div>
               <button onClick={handleConfirmOrder} className="bg-[#f9a602] text-black px-8 py-3 rounded-lg text-sm font-bold shadow-lg hover:bg-[#0A0A0A] hover:text-white transition-colors uppercase tracking-wide">
                  CONFIRM ORDER
               </button>
            </div>
          )}
      </div>


      {/* =====================================================================================
          💻 2. DESKTOP VIEW (Simplified for brevity, same logic applies)
      ===================================================================================== */}
      <div className="hidden md:block">
          <main className="max-w-6xl mx-auto px-8 py-12">
             <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-black text-[#0A0A0A]">{activeOrder ? "Order Status" : "Secure Checkout"}</h1>
             </div>

             {activeOrder ? (
               // ✅ DESKTOP STATUS VIEW
               <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-gray-200 shadow-xl text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${activeOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                    {activeOrder.status === 'Delivered' ? <CheckCircle size={48}/> : <Clock size={48} className="animate-pulse"/>}
                  </div>
                  <h2 className="text-4xl font-black mb-2">{activeOrder.status === 'Delivered' ? "Delivered!" : "Order Placed"}</h2>
                  <p className="text-gray-500 font-bold mb-8">Order ID: {activeOrder.id}</p>
                  
                  <div className="bg-gray-50 p-8 rounded-2xl mb-8 flex justify-between items-center">
                     <div className="text-left">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Current Status</p>
                        <p className={`text-2xl font-black ${activeOrder.status === 'Delivered' ? 'text-green-600' : 'text-orange-500'}`}>
                           {activeOrder.status}
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Amount</p>
                        <p className="text-2xl font-black text-black">{activeOrder.amount}</p>
                     </div>
                  </div>

                  {activeOrder.status === 'Delivered' && (
                   <button onClick={handleNewOrder} className="px-10 py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform">
                      <RefreshCw size={20}/> Place New Order
                   </button>
                  )}
               </div>
             ) : (
               // 🛒 DESKTOP CART VIEW
               <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-7 space-y-8">
                     <section>
                        <h2 className="text-sm font-black uppercase tracking-wider mb-4">1. Delivery Address</h2>
                        <div className="flex gap-4 items-start p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                           <div className="bg-gray-100 p-2 rounded-full"><MapPin size={20}/></div>
                           <div><h3 className="font-bold text-sm">Home Address</h3><p className="text-sm text-gray-500 mt-1">Skyline Apartments, Kakkanad</p></div>
                        </div>
                     </section>
                     <section>
                        <h2 className="text-sm font-black uppercase tracking-wider mb-4">2. Payment Method</h2>
                        <label className="flex items-center gap-3 p-4 border-2 border-[#0A0A0A] bg-[#f9a602]/5 rounded-xl">
                           <div className="w-4 h-4 rounded-full border-[4px] border-[#0A0A0A]"></div>
                           <span className="font-bold text-sm">Cash on Delivery</span>
                        </label>
                     </section>
                  </div>
                  <div className="col-span-5">
                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-6">
                        <h3 className="text-lg font-black mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                           {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-3 items-center border-b border-gray-50 pb-4">
                                 <img src={item.image} className="w-12 h-12 rounded bg-gray-100 object-cover" alt=""/>
                                 <div className="flex-1">
                                    <div className="flex justify-between"><h4 className="font-bold text-sm">{item.name}</h4><span className="font-bold text-sm">₹{item.price * item.qty}</span></div>
                                    <div className="flex items-center gap-2 mt-1"><span className="text-xs font-bold text-gray-500">Qty: {item.qty}</span></div>
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
             )}
          </main>
      </div>

    </div>
  )
}