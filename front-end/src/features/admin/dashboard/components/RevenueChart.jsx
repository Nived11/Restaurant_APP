import { BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", orders: 42 }, { name: "Tue", orders: 38 }, { name: "Wed", orders: 54 },
  { name: "Thu", orders: 31 }, { name: "Fri", orders: 72 }, { name: "Sat", orders: 94 }, { name: "Sun", orders: 81 },
];

export default function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#1A1A1A]">Weekly Order Volume</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Performance Analysis</p>
        </div>
        <BarChart3 className="text-primary hidden sm:block" size={24} />
      </div>
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={window.innerWidth < 768 ? 1.5 : 2.5}>
          <AreaChart data={data} margin={{ left: 15, right: 15, top: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#ffb60a" stopOpacity={1} />
                <stop offset="90%" stopColor="#ffad08" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={true} tickLine={true} dy={10} interval={0} padding={{ left: 20, right: 20 }} tick={{ fill: '#020202', fontSize: 10, fontWeight: 900 }} />
            <YAxis hide />
            <Tooltip cursor={false} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="orders" stroke="#c68400bb" strokeWidth={3} fill="url(#colorSale)" animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}