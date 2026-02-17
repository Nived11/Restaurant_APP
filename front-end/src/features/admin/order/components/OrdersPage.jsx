import React, { useState } from "react";
import { useOrder } from "../../order/hooks/useOrder";
import { 
  Package, CheckCircle, Clock, Search, Box, ChefHat, 
  Truck, Filter, Calendar, User 
} from "lucide-react";

const OrdersPage = () => {
  const { orders, updateStatus } = useOrder();
  const [activeTab, setActiveTab] = useState("Live"); 
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    let matchesStatus = false;
    if (activeTab === "Live") matchesStatus = order.status === "Pending";
    else if (activeTab === "Packing") matchesStatus = order.status === "Packing";
    else matchesStatus = order.status === "Delivered";

    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getCount = (status) => orders.filter(o => o.status === status).length;

  return (
    <div className="min-h-screen bg-white p-6 lg:p-10 font-sans text-[#0A0A0A]">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#0A0A0A]">LIVE <span className="text-[#f9a602]">ORDER.</span></h1>
          <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Manage Orders Flow</p>
        </div>

        {/* Search */}
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#f9a602]" />
          <input 
            type="text" 
            placeholder="Search Order ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#f9a602]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 border-b border-gray-100">
        <TabButton 
          label="Pending" count={getCount("Pending")} isActive={activeTab === "Live"} 
          onClick={() => setActiveTab("Live")} icon={<Clock size={16}/>} 
          activeClass="bg-[#f9a602] text-black"
        />
        <TabButton 
          label="Packing" count={getCount("Packing")} isActive={activeTab === "Packing"} 
          onClick={() => setActiveTab("Packing")} icon={<ChefHat size={16}/>} 
          activeClass="bg-black text-white"
        />
        <TabButton 
          label="History" count={getCount("Delivered")} isActive={activeTab === "Delivered"} 
          onClick={() => setActiveTab("Delivered")} icon={<CheckCircle size={16}/>} 
          activeClass="bg-green-600 text-white"
        />
      </div>

      {/* --- ORDERS LIST (ROWS) --- */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
           <EmptyState tab={activeTab} />
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredOrders.map((order, index) => (
              <div key={order.id} className="p-5 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors animate-in fade-in slide-in-from-bottom-2">
                
                {/* Left: ID & Date */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                     order.status === 'Pending' ? 'bg-[#f9a602]/10 text-[#f9a602]' : 
                     order.status === 'Packing' ? 'bg-gray-100 text-black' : 'bg-green-50 text-green-600'
                  }`}>
                     {order.status === 'Packing' ? <ChefHat size={18}/> : order.status === 'Delivered' ? <CheckCircle size={18}/> : <Package size={18}/>}
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[#0A0A0A]">{order.id}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                       <Calendar size={10}/> {order.date.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Middle: Customer & Items */}
                <div className="w-full md:w-2/4">
                   <div className="flex items-center gap-2 mb-1">
                      <User size={12} className="text-gray-400"/>
                      <span className="text-xs font-bold text-[#0A0A0A]">{order.customerName}</span>
                      <span className="text-[10px] text-gray-400">• {order.address}</span>
                   </div>
                   <p className="text-sm text-gray-600 font-medium truncate">{order.items}</p>
                </div>

                {/* Right: Amount & Action */}
                <div className="w-full md:w-1/4 flex items-center justify-between md:justify-end gap-6">
                   <span className="text-base font-black text-[#0A0A0A]">{order.amount}</span>
                   
                   {/* Buttons */}
                   {order.status === 'Pending' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'Packing')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs transition-all shadow-md active:scale-95"
                      >
                        <Box size={14}/> Start Packing
                      </button>
                   )}

                   {order.status === 'Packing' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'Delivered')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#f9a602] hover:bg-[#e09502] text-black rounded-lg font-bold text-xs transition-all shadow-md active:scale-95"
                      >
                        <Truck size={14}/> Mark Delivered
                      </button>
                   )}

                   {order.status === 'Delivered' && (
                      <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={12}/> Done
                      </div>
                   )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---
const TabButton = ({ label, count, isActive, onClick, icon, activeClass }) => (
  <button onClick={onClick} className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 min-w-max ${isActive ? `${activeClass} shadow-md` : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"}`}>
    {icon} <span className="text-sm font-bold tracking-wide">{label}</span>
    {count > 0 && <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-black ${isActive ? 'bg-white/20 text-inherit' : 'bg-gray-100 text-gray-600'}`}>{count}</span>}
  </button>
);

const EmptyState = ({ tab }) => (
  <div className="flex flex-col items-center justify-center py-16 opacity-50">
    <Filter size={32} className="text-gray-300 mb-3"/>
    <h3 className="text-sm font-bold text-gray-400">No {tab} Orders</h3>
  </div>
);

export default OrdersPage;