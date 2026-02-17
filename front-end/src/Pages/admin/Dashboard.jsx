import React from "react";
import { 
  ShoppingBag, Users, DollarSign, Utensils, 
  TrendingUp, Package, Clock, CheckCircle, Award
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

// Data for Sales Trend - Fixed X-Axis to ensure Monday shows
const revenueData = [
  { name: "Mon", total: 4200 },
  { name: "Tue", total: 3800 },
  { name: "Wed", total: 5400 },
  { name: "Thu", total: 3100 },
  { name: "Fri", total: 7200 },
  { name: "Sat", total: 9400 },
  { name: "Sun", total: 8100 },
];

const Dashboard = ({ user }) => {
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const stats = [
    { title: "Today's Orders", value: "24", icon: <ShoppingBag size={20} />, color: "bg-blue-600", show: true },
    { title: "Pending Delivery", value: "05", icon: <Clock size={20} />, color: "bg-rose-500", show: true },
    { title: "Total Customers", value: "1,240", icon: <Users size={20} />, color: "bg-purple-600", show: true },
    // This stat only shows for Super Admin
    { title: "Total Collections", value: "₹18,450", icon: <DollarSign size={20} />, color: "bg-emerald-600", show: isSuperAdmin },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#1A1A1A]">
            Kitchen <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
            Real-time operations & {isSuperAdmin ? "revenue" : "order"} tracking
          </p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => stat.show && (
          <div key={index} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className={`${stat.color} w-14 h-14 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-inherit/20`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-[#1A1A1A]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* WEAKLY PROGRESS GRAPH */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Weekly Order Flow</h3>
            <div className="flex items-center gap-2 text-[10px] font-black px-4 py-1.5 bg-gray-100 rounded-full">
              <TrendingUp size={12} className="text-emerald-500" />
              UP 12% VS LAST WEEK
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBFF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FBFF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    padding={{ left: 20, right: 20 }}
                    tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 900}}
                />
                <YAxis hide={true} />
                <Tooltip 
                    cursor={{ stroke: '#FBFF00', strokeWidth: 2 }}
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '15px'}} 
                />
                <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#FBFF00" 
                    strokeWidth={5} 
                    fill="url(#colorSale)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BEST SELLERS - DARK UI */}
        <div className="bg-[#111111] p-8 rounded-[3rem] text-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Award className="text-primary" size={20} />
              <h3 className="text-lg font-black uppercase tracking-tight">Top Sellers</h3>
            </div>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-gray-400">THIS WEEK</span>
          </div>

          <div className="space-y-7 flex-1">
            {[
              { name: "Double Cheese Burger", count: "84 Orders", trend: "+12%" },
              { name: "Crispy Chicken Wings", count: "62 Orders", trend: "+5%" },
              { name: "Peri Peri Fries", count: "55 Orders", trend: "+18%" },
              { name: "Classic Cold Coffee", count: "41 Orders", trend: "-2%" },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-black text-primary border border-white/5 group-hover:bg-primary group-hover:text-black transition-colors">
                      0{i + 1}
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase tracking-wide group-hover:text-primary transition-colors">{product.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{product.count}</p>
                   </div>
                </div>
                <div className={`text-[10px] font-black ${product.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {product.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats at bottom of Dark Card */}
          <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                 <div>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Upsells</p>
                    <p className="text-sm font-black text-white uppercase">Menu Combos</p>
                 </div>
                 <CheckCircle size={20} className="text-primary" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;