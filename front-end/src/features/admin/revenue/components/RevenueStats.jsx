import React from "react";
import { Banknote, Clock, TrendingUp, ShoppingBag } from "lucide-react";

const RevenueStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Dark Card */}
    <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-primary mb-4">
          <Banknote size={20} />
        </div>
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Total Sales Income</p>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tighter">₹ 4,82,450</h2>
        <p className="text-[8px] font-bold text-primary uppercase mt-2 tracking-widest">All-time Revenue</p>
      </div>
      <ShoppingBag className="absolute -right-6 -bottom-6 text-white/5 w-32 h-32" />
    </div>

    {/* Light Card */}
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group text-left">
      <div className="relative z-10">
        <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
          <Clock size={20} />
        </div>
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Today's Income</p>
        <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] mt-2 tracking-tighter">₹ 8,200</h2>
        <div className="flex items-center gap-2 mt-2">
           <TrendingUp size={12} className="text-primary" />
           <p className="text-[8px] font-bold text-primary uppercase tracking-widest">+12% growth</p>
        </div>
      </div>
    </div>
  </div>
);

export default RevenueStats;