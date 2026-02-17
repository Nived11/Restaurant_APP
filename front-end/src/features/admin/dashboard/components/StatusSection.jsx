import { AlertTriangle } from "lucide-react";

export default function StatusSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-rose-500" size={20} />
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Attention Needed</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {[{ n: "Hot Tea", r: "Low Demand" }, { n: "Salad Bowl", r: "High Waste" }].map((item, i) => (
            <div key={i} className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
              <p className="text-[11px] font-black text-[#1A1A1A] uppercase">{item.n}</p>
              <p className="text-[9px] text-rose-500 font-bold uppercase">{item.r}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Active Dispatch</h3>
          <span className="text-[9px] font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">Real-time</span>
        </div>
        <div className="space-y-4 md:space-y-5">
          {[{ id: "#4421", t: "2m", s: "In Transit" }, { id: "#4420", t: "5m", s: "Ready" }].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <p className="text-[11px] font-black text-[#1A1A1A]">{log.id}</p>
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase">{log.s}</p>
              <p className="text-[10px] font-black text-[#1A1A1A]">{log.t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}