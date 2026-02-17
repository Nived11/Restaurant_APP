import React from "react";
import { Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data }) => (
  <div className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-base sm:text-lg font-black uppercase text-[#1A1A1A] tracking-tight">Sales Performance</h3>
      <Calendar className="text-gray-300" size={18} />
    </div>
    <div className="w-full h-[300px] min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary, #10b981)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--color-primary, #10b981)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#9ca3af'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#9ca3af'}} />
          <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: '900', fontSize: '10px'}} />
          <Area type="monotone" dataKey="amount" stroke="var(--color-primary, #10b981)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;