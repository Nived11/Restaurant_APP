import React from "react";
import { Phone, Mail, Calendar, Clock, Users, ChevronUp, ChevronDown, AlignLeft, FilterX } from "lucide-react";
import BookingSkeleton from "./BookingSkeleton";
import ErrorState from "./ErrorState"; 

const BookingTable = ({ bookings, expandedRow, toggleRow, clearFilters, isFiltered, loading, error, onRetry }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Guest Name</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Contact</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Date & Time</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500 text-center">Party Size</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* 1. LOADING STATE */}
            {loading ? (
              [...Array(5)].map((_, i) => <BookingSkeleton key={i} />)
            ) 
            /* 2. ERROR STATE */
            : error ? (
              <ErrorState message={error} onRetry={onRetry} />
            ) 
            /* 3. DATA LIST */
            : bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingRow 
                  key={booking.id} 
                  booking={booking} 
                  isExpanded={expandedRow === booking.id} 
                  onToggle={() => toggleRow(booking.id)} 
                />
              ))
            ) 
            /* 4. EMPTY STATE */
            : (
              <EmptyState onClear={clearFilters} isFiltered={isFiltered} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BookingRow = ({ booking, isExpanded, onToggle }) => (
  <React.Fragment>
    <tr onClick={onToggle} className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}>
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-colors ${isExpanded ? 'bg-[#0A0A0A] text-white' : 'bg-gray-100 text-[#0A0A0A] group-hover:bg-[#f9a602] group-hover:text-[#0A0A0A]'}`}>
            {(booking.full_name || "G").charAt(0)}
          </div>
          <span className="font-bold text-sm text-[#0A0A0A]">{booking.full_name}</span>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600"><Phone size={13} /> {booking.phone}</div>
          {booking.email && <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><Mail size={13} /> {booking.email}</div>}
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A]"><Calendar size={14} className="text-[#f9a602]" /> {booking.date}</div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500"><Clock size={13} /> {booking.time}</div>
        </div>
      </td>
      <td className="px-8 py-5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-bold text-[#0A0A0A]">
          <Users size={14} /> {booking.guests}
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex items-center justify-end gap-4">
          {booking.notes && <span className="text-[10px] font-black uppercase bg-[#f9a602]/20 px-2.5 py-1 rounded-md">Notes</span>}
          <div className="p-1.5 rounded-full bg-gray-100">{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
        </div>
      </td>
    </tr>
    {isExpanded && (
      <tr className="bg-[#f9a602]/5">
        <td colSpan="5" className="px-8 py-6">
          <div className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl">
            <div className="p-2 bg-[#f9a602]/10 rounded-lg text-[#f9a602]"><AlignLeft size={18} /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-gray-400 mb-2">Special Requests</h4>
              <p className="text-sm font-medium italic">{booking.notes || "No special instructions provided."}</p>
            </div>
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>
);

const EmptyState = ({ onClear, isFiltered }) => (
  <tr>
    <td colSpan="5" className="py-24 text-center">
      <FilterX size={24} className="mx-auto text-gray-400 mb-4" />
      <h3 className="font-bold">No bookings found</h3>
      {isFiltered && <button onClick={onClear} className="mt-6 px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-lg uppercase">Clear Filters</button>}
    </td>
  </tr>
);

export default BookingTable;