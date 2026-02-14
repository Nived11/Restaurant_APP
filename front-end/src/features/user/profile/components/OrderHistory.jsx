import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, ChevronDown, Clock, CheckCircle2, 
  Truck, Calendar, ShoppingBag 
} from "lucide-react";

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // Mock Data Structure
  const allOrders = Array.from({ length: 15 }).map((_, i) => ({
    id: `ORD-2026-${1000 + i}`,
    date: "14 Feb 2026",
    total: 850,
    status: i === 0 ? "Waiting for Delivery" : "Delivered",
    itemCount: 3,
    items: [
      { id: 1, name: "Premium Beef Burger", price: 350, discountPrice: 299, qty: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100" },
      { id: 2, name: "Crispy French Fries", price: 150, discountPrice: 120, qty: 2, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100" },
    ]
  }));

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {allOrders.slice(0, visibleCount).map((order) => (
          <div 
            key={order.id} 
            className="bg-gray-50/50 border border-gray-100 rounded-[1.5rem]  overflow-hidden transition-all hover:shadow-md"
          >
            {/* --- TOP ROW (Summary) --- */}
            <div 
              className="p-4 md:p-6 flex items-center justify-between cursor-pointer"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="flex items-center gap-3 md:gap-5">
                {/* Status Icon with Animation */}
                <div className="relative">
                  <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-sm ${
                    order.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    {order.status === "Delivered" ? <CheckCircle2 size={20} /> : <Truck size={20} className="animate-bounce" />}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-[10px] md:text-sm uppercase tracking-widest text-gray-800">{order.id}</p>
                    <span className={`text-[7px] md:text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      order.status === "Delivered" ? "bg-green-50 text-green-500" : "bg-amber-50 text-amber-500"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[8px] md:text-[11px] font-bold text-gray-500 uppercase mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={10}/> {order.date}</span>
                    <span className="flex items-center gap-1"><ShoppingBag size={10}/> {order.itemCount} Items</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Total Amount</p>
                  <p className="text-sm md:text-lg font-black text-primary">₹{order.total}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                  className="p-2 bg-white rounded-full shadow-sm text-gray-500"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </div>
            </div>

            {/* --- EXPANDED SECTION (Details) --- */}
            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100 bg-white"
                >
                  <div className="p-4 md:p-8 space-y-4">
                    <h4 className="text-[9px] md:text-xs font-black uppercase tracking-widest text-primary border-b border-gray-50 pb-2">Items in this order</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform" />
                          <div>
                            <p className="font-black text-[10px] md:text-sm uppercase text-gray-800">{item.name}</p>
                            <p className="text-[8px] md:text-xs font-bold text-gray-500">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] md:text-xs text-gray-400 line-through font-bold">₹{item.price}</p>
                          <p className="text-[10px] md:text-sm font-black text-gray-800">₹{item.discountPrice}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
                       <p className="text-[9px] md:text-xs font-black uppercase text-gray-500">Grand Total Paid</p>
                       <p className="text-sm md:text-xl font-black text-primary">₹{order.total}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* --- SEE MORE BUTTON --- */}
      {visibleCount < allOrders.length && (
        <div className="pt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="px-8 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all"
          >
            See More Orders
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;