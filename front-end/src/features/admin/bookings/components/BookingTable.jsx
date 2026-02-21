import React from "react";
import { Phone, Mail, Calendar, Clock, Users, ChevronUp, ChevronDown, AlignLeft, FilterX, Loader2, ChevronsUp } from "lucide-react";
import BookingSkeleton from "./BookingSkeleton";
import ErrorState from "./ErrorState";

const BookingTable = ({
  bookings, expandedRow, toggleRow, clearFilters,
  isFiltered, loading, loadingMore, hasNextPage, onLoadMore, onShowLess, currentPage, error, onRetry
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl shadow-md overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 whitespace-nowrap">Name</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 whitespace-nowrap">Mobile</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 whitespace-nowrap">Email</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 whitespace-nowrap">Date</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 whitespace-nowrap">Time (IST)</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 text-center whitespace-nowrap">Guests</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-600 text-right whitespace-nowrap">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => <BookingSkeleton key={i} />)
              ) : error ? (
                <ErrorState message={error} onRetry={onRetry} />
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    isExpanded={expandedRow === booking.id}
                    onToggle={() => toggleRow(booking.id)}
                  />
                ))
              ) : (
                <EmptyState onClear={clearFilters} isFiltered={isFiltered} />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Actions */}
      <div className="flex flex-row justify-center items-center gap-4 pb-12 pt-4">
        {/* See More Button */}
        {hasNextPage && (
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602] transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loadingMore ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                See More
                <ChevronDown size={14} className="ml-1" />
              </>
            )}
            {loadingMore && "Loading..."}
          </button>
        )}

        {currentPage > 1 && !loadingMore && (
          <button
            onClick={onShowLess}
            className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-black text-white border-2 border-primary  text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602]  transition-all active:scale-95"
          >
            <ChevronsUp size={14} />
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

// ... BookingRow & EmptyState Components (Keep as before) ...
const BookingRow = ({ booking, isExpanded, onToggle }) => {
  const formatIST = (timeStr) => {
    if (!timeStr) return "N/A";
    try {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true
      }).toUpperCase();
    } catch (e) { return timeStr; }
  };

  return (
    <React.Fragment>
      <tr onClick={onToggle} className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}>
        <td className="px-4 md:px-8 py-3 md:py-4 whitespace-nowrap font-bold text-xs md:text-sm text-[#0A0A0A]">{booking.full_name}</td>
        <td className="px-4 md:px-8 py-3 md:py-4 whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-700">
            <Phone size={11} className="text-gray-500" /> {booking.phone}
          </div>
        </td>
        <td className="px-4 md:px-8 py-3 md:py-4 whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[10px] md:text-[12px] font-medium text-gray-600">
            <Mail size={11} className="text-gray-500" /> {booking.email || "N/A"}
          </div>
        </td>
        <td className="px-4 md:px-8 py-3 md:py-4 whitespace-nowrap font-bold text-[11px] md:text-sm text-[#0A0A0A]">
          <Calendar size={12} className="inline mr-1.5 text-[#f9a602]" /> {booking.date}
        </td>
        <td className="px-4 md:px-8 py-3 md:py-4 whitespace-nowrap text-[10px] md:text-[11px] font-black text-gray-500 uppercase">
          <Clock size={11} className="inline mr-1" /> {formatIST(booking.time)}
        </td>
        <td className="px-4 md:px-8 py-3 md:py-4 text-center">
          <div className="whitespace-nowrap inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-[10px] md:text-xs font-black text-[#0A0A0A]">
            <Users size={11} /> {booking.guests}
          </div>
        </td>
        <td className="px-4 md:px-8 py-3 md:py-4 text-right">
          <div className="p-1 rounded-full bg-gray-100 inline-block">
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-[#f9a602]/5">
          <td colSpan="7" className="px-4 md:px-8 py-4">
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <AlignLeft size={16} className="text-[#f9a602] mt-1" />
              <div>
                <h4 className="text-[9px] font-black uppercase text-gray-500 mb-1 tracking-widest">Special Requests</h4>
                <p className="text-xs font-medium text-gray-700 italic">{booking.notes || "No special instructions provided."}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

const EmptyState = ({ onClear, isFiltered }) => (
  <tr>
    <td colSpan="7" className="py-20 text-center">
      <FilterX size={24} className="mx-auto text-gray-500 mb-4" />
      <h3 className="font-bold text-gray-800 text-sm">No bookings found</h3>
      {isFiltered && (
        <button onClick={onClear} className="mt-4 px-5 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">Clear Search</button>
      )}
    </td>
  </tr>
);

export default BookingTable;