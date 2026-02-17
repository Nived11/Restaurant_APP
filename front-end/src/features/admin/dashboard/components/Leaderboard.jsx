import { Award } from "lucide-react";

const products = [
  { name: "Double Cheese Burger", count: "124", val: 80 },
  { name: "Crispy Chicken Wings", count: "98", val: 65 },
  { name: "Peri Peri Fries", count: "82", val: 55 },
  { name: "Cold Coffee", count: "76", val: 45 },
  { name: "Veg Whopper", count: "45", val: 30 },
];

export default function Leaderboard() {
  return (
    <div className="bg-[#111111] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Award className="text-primary" size={22} />
        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Leaderboard</h3>
      </div>
      <div className="space-y-6 md:space-y-8">
        {products.map((p, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <p className="truncate pr-2">{p.name}</p>
              <p className="text-primary">{p.count} Sold</p>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${p.val}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}