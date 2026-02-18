import React, { useState } from "react";
import { useOrder } from "../../order/hooks/useOrder";
import { 
  Package, CheckCircle, Clock, Search, Filter, Box, ChefHat, 
  Truck, Calendar, User 
} from "lucide-react";

const OrdersPage = () => {
  const { orders, updateStatus } = useOrder();
  const [activeTab, setActiveTab] = useState("Live"); 
  const [searchTerm, setSearchTerm] = useState("");

  // --- FILTER LOGIC (Common for all views) ---
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
    <div className="min-h-screen bg-white font-sans text-[#0A0A0A]">
      
      {/* =====================================================================================
          📱 1. MOBILE VIEW (Visible < 768px)
      ===================================================================================== */}
      <div className="block md:hidden p-4">
         
         {/* Mobile Header */}
         <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tight text-[#0A0A0A]">Kitchen Dashboard</h1>
            <p className="text-gray-400 font-bold text-[10px] mt-1 uppercase tracking-widest">Manage Orders Flow</p>
         </div>

         {/* Mobile Search */}
         <div className="relative group w-full mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#f9a602]" />
            <input 
              type="text" 
              placeholder="Search Order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#f9a602]/20 outline-none transition-all"
            />
         </div>

         {/* Mobile Tabs */}
         <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 border-b border-gray-100 no-scrollbar">
            <TabButton label="Pending" count={getCount("Pending")} isActive={activeTab === "Live"} onClick={() => setActiveTab("Live")} icon={<Clock size={14}/>} activeClass="bg-[#f9a602] text-black"/>
            <TabButton label="Packing" count={getCount("Packing")} isActive={activeTab === "Packing"} onClick={() => setActiveTab("Packing")} icon={<ChefHat size={14}/>} activeClass="bg-black text-white"/>
            <TabButton label="History" count={getCount("Delivered")} isActive={activeTab === "Delivered"} onClick={() => setActiveTab("Delivered")} icon={<CheckCircle size={14}/>} activeClass="bg-green-600 text-white"/>
         </div>

         {/* Mobile List */}
         <div className="space-y-4">
            {filteredOrders.length === 0 ? <EmptyState tab={activeTab} /> : filteredOrders.map((order) => (
               <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${order.status === 'Pending' ? 'bg-[#f9a602]/10 text-[#f9a602]' : order.status === 'Packing' ? 'bg-gray-100 text-black' : 'bg-green-50 text-green-600'}`}>
                           {order.status === 'Packing' ? <ChefHat size={18}/> : order.status === 'Delivered' ? <CheckCircle size={18}/> : <Package size={18}/>}
                        </div>
                        <div>
                           <h3 className="font-black text-sm text-[#0A0A0A]">{order.id}</h3>
                           <span className="text-[10px] font-bold text-gray-400">{order.date.split(',')[0]}</span>
                        </div>
                     </div>
                     <span className="text-lg font-black">{order.amount}</span>
                  </div>
                  
                  <div className="mb-4 space-y-1">
                     <p className="text-xs font-bold text-[#0A0A0A] flex items-center gap-2"><User size={12} className="text-gray-400"/> {order.customerName}</p>
                     <p className="text-xs text-gray-500 pl-5 truncate">{order.items}</p>
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-gray-50">
                     {order.status === 'Pending' && (
                        <button onClick={() => updateStatus(order.id, 'Packing')} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold text-xs shadow-md active:scale-95">
                           <Box size={16}/> Start Packing
                        </button>
                     )}
                     {order.status === 'Packing' && (
                        <button onClick={() => updateStatus(order.id, 'Delivered')} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#f9a602] text-black rounded-xl font-bold text-xs shadow-md active:scale-95">
                           <Truck size={16}/> Mark Delivered
                        </button>
                     )}
                     {order.status === 'Delivered' && (
                        <div className="w-full py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><CheckCircle size={14}/> Completed</div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>


      {/* =====================================================================================
          📟 2. TABLET VIEW (Visible 768px - 1023px)
      ===================================================================================== */}
      <div className="hidden md:block lg:hidden p-8">
         
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-black text-[#0A0A0A]">Kitchen Dashboard</h1>
               <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Tablet View</p>
            </div>
            <div className="relative group w-64">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm font-bold outline-none"/>
            </div>
         </div>

         <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
            <TabButton label="Pending" count={getCount("Pending")} isActive={activeTab === "Live"} onClick={() => setActiveTab("Live")} icon={<Clock size={16}/>} activeClass="bg-[#f9a602] text-black"/>
            <TabButton label="Packing" count={getCount("Packing")} isActive={activeTab === "Packing"} onClick={() => setActiveTab("Packing")} icon={<ChefHat size={16}/>} activeClass="bg-black text-white"/>
            <TabButton label="History" count={getCount("Delivered")} isActive={activeTab === "Delivered"} onClick={() => setActiveTab("Delivered")} icon={<CheckCircle size={16}/>} activeClass="bg-green-600 text-white"/>
         </div>

         <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {filteredOrders.length === 0 ? <EmptyState tab={activeTab} /> : (
               <div className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => (
                     <div key={order.id} className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-1/3">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${order.status === 'Pending' ? 'bg-[#f9a602]/10 text-[#f9a602]' : order.status === 'Packing' ? 'bg-gray-100 text-black' : 'bg-green-50 text-green-600'}`}>
                              {order.status === 'Packing' ? <ChefHat size={18}/> : <Package size={18}/>}
                           </div>
                           <div>
                              <h3 className="font-black text-sm">{order.id}</h3>
                              <p className="text-xs text-gray-500 truncate w-32">{order.items}</p>
                           </div>
                        </div>
                        <div className="w-1/3 text-center">
                           <span className="font-black text-base">{order.amount}</span>
                        </div>
                        <div className="w-1/3 flex justify-end">
                           {order.status === 'Pending' && <button onClick={() => updateStatus(order.id, 'Packing')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold">Start Packing</button>}
                           {order.status === 'Packing' && <button onClick={() => updateStatus(order.id, 'Delivered')} className="px-4 py-2 bg-[#f9a602] text-black rounded-lg text-xs font-bold">Mark Delivered</button>}
                           {order.status === 'Delivered' && <span className="text-green-600 text-xs font-bold">Done</span>}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>


      {/* =====================================================================================
          💻 3. LAPTOP/DESKTOP VIEW (Visible 1024px +)
      ===================================================================================== */}
      <div className="hidden lg:block p-10">
         
         {/* Desktop Header */}
         <div className="flex justify-between items-end mb-8">
            <div>
               <h1 className="text-3xl font-black tracking-tight text-[#0A0A0A]">Kitchen Dashboard</h1>
               <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Manage Orders Flow</p>
            </div>
            <div className="relative group w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#f9a602]" />
               <input type="text" placeholder="Search Order ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#f9a602]/20 outline-none transition-all"/>
            </div>
         </div>

         {/* Desktop Tabs */}
         <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-2">
            <TabButton label="Pending" count={getCount("Pending")} isActive={activeTab === "Live"} onClick={() => setActiveTab("Live")} icon={<Clock size={16}/>} activeClass="bg-[#f9a602] text-black"/>
            <TabButton label="Packing" count={getCount("Packing")} isActive={activeTab === "Packing"} onClick={() => setActiveTab("Packing")} icon={<ChefHat size={16}/>} activeClass="bg-black text-white"/>
            <TabButton label="History" count={getCount("Delivered")} isActive={activeTab === "Delivered"} onClick={() => setActiveTab("Delivered")} icon={<CheckCircle size={16}/>} activeClass="bg-green-600 text-white"/>
         </div>

         {/* Desktop List */}
         <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {filteredOrders.length === 0 ? <EmptyState tab={activeTab} /> : (
               <div className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => (
                     <div key={order.id} className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                        
                        {/* Left */}
                        <div className="flex items-center gap-4 w-1/4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${order.status === 'Pending' ? 'bg-[#f9a602]/10 text-[#f9a602]' : order.status === 'Packing' ? 'bg-gray-100 text-black' : 'bg-green-50 text-green-600'}`}>
                              {order.status === 'Packing' ? <ChefHat size={18}/> : order.status === 'Delivered' ? <CheckCircle size={18}/> : <Package size={18}/>}
                           </div>
                           <div>
                              <h3 className="font-black text-sm text-[#0A0A0A]">{order.id}</h3>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider"><Calendar size={10}/> {order.date.split(',')[0]}</div>
                           </div>
                        </div>

                        {/* Middle */}
                        <div className="w-2/4">
                           <div className="flex items-center gap-2 mb-1">
                              <User size={12} className="text-gray-400"/>
                              <span className="text-xs font-bold text-[#0A0A0A]">{order.customerName}</span>
                              <span className="text-[10px] text-gray-400">• {order.address}</span>
                           </div>
                           <p className="text-sm text-gray-600 font-medium truncate">{order.items}</p>
                        </div>

                        {/* Right */}
                        <div className="w-1/4 flex items-center justify-between justify-end gap-6">
                           <span className="text-base font-black text-[#0A0A0A]">{order.amount}</span>
                           {order.status === 'Pending' && (
                              <button onClick={() => updateStatus(order.id, 'Packing')} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs transition-all shadow-md active:scale-95">
                                 <Box size={14}/> Start Packing
                              </button>
                           )}
                           {order.status === 'Packing' && (
                              <button onClick={() => updateStatus(order.id, 'Delivered')} className="flex items-center gap-2 px-5 py-2.5 bg-[#f9a602] hover:bg-[#e09502] text-black rounded-lg font-bold text-xs transition-all shadow-md active:scale-95">
                                 <Truck size={14}/> Mark Delivered
                              </button>
                           )}
                           {order.status === 'Delivered' && (
                              <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Done</div>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

// --- COMMON SUB COMPONENTS ---
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