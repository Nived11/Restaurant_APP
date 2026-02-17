import React from "react";

const TransactionTable = ({ transactions }) => (
  <div className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
    <h3 className="text-base sm:text-lg font-black uppercase mb-6 text-[#1A1A1A] tracking-tight">Recent Collections</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Rider</th>
            <th className="px-4 py-2 text-center">Amount</th>
            <th className="px-4 py-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {transactions.map((trx, i) => (
            <tr key={i} className="group transition-all duration-300">
              <td className="px-4 py-4 bg-gray-50/50 rounded-l-2xl text-[10px] font-black text-gray-400 group-hover:text-primary transition-colors">
                {trx.id}
              </td>
              <td className="px-4 py-4 bg-gray-50/50">
                <p className="text-[11px] font-black text-[#1A1A1A] leading-tight">{trx.rider}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase">{trx.time}</p>
              </td>
              <td className="px-4 py-4 bg-gray-50/50 text-center text-[12px] font-black text-[#1A1A1A]">
                {trx.amount}
              </td>
              <td className="px-4 py-4 bg-gray-50/50 rounded-r-2xl text-right">
                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm ${
                  trx.status === 'Collected' ? 'bg-primary text-white' : 'bg-orange-100 text-orange-600'
                }`}>
                  {trx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TransactionTable;