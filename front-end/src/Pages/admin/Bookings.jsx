import React, { useState } from "react";
import { Search, Calendar, Clock, Phone, Mail, ChevronDown, ChevronUp, Users, AlignLeft, FilterX } from "lucide-react";

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const bookingData = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@example.com", date: "2026-02-22", time: "07:30 PM", guests: 4, notes: "Window seat preferred for anniversary celebration. Will need extra napkins." },
    { id: 2, name: "Anjali Nair", phone: "9988776655", email: "anjali@test.com", date: "2026-02-23", time: "01:00 PM", guests: 2, notes: "Need a high chair for a toddler and away from the speakers." },
    { id: 3, name: "John Doe", phone: "9944332211", email: "john@crunch.com", date: "2026-02-22", time: "09:00 PM", guests: 6, notes: "Allergic to peanuts. Please inform the chef immediately." },
    { id: 4, name: "Emily Davis", phone: "9898989898", email: "emily@web.com", date: "2026-02-24", time: "08:15 PM", guests: 3, notes: "" },
  ];

  const filteredBookings = bookingData.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.includes(searchTerm) || item.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDate === "" || item.date === filterDate)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Reservations</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage and view your restaurant bookings.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Date Picker */}
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors" size={16} />
              <input
                type="date"
                className="w-full sm:w-[180px] pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0A0A0A] outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-sm cursor-pointer"
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            {/* Search Bar */}
            <div className="relative group w-full sm:w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search guests by name or phone..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#f9a602] focus:ring-1 focus:ring-[#f9a602] transition-all shadow-sm placeholder:text-gray-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- MAIN TABLE SECTION --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Guest Name</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Contact</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500">Date & Time</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500 text-center">Party Size</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-500 text-right">Details</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => {
                    const isExpanded = expandedRow === booking.id;
                    
                    return (
                      <React.Fragment key={booking.id}>
                        {/* Standard Row */}
                        <tr 
                          onClick={() => setExpandedRow(isExpanded ? null : booking.id)}
                          className={`group hover:bg-[#f9a602]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f9a602]/10' : 'bg-white'}`}
                        >
                          {/* Name */}
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-colors ${isExpanded ? 'bg-[#0A0A0A] text-white' : 'bg-gray-100 text-[#0A0A0A] group-hover:bg-[#f9a602] group-hover:text-[#0A0A0A]'}`}>
                                {booking.name.charAt(0)}
                              </div>
                              <span className="font-bold text-sm text-[#0A0A0A]">{booking.name}</span>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-8 py-5">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                <Phone size={13} className="text-gray-400" /> {booking.phone}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                <Mail size={13} className="text-gray-400" /> {booking.email}
                              </div>
                            </div>
                          </td>

                          {/* Schedule */}
                          <td className="px-8 py-5">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A]">
                                <Calendar size={14} className="text-[#f9a602]" /> {booking.date}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                <Clock size={13} className="text-gray-400" /> {booking.time}
                              </div>
                            </div>
                          </td>

                          {/* Party Size */}
                          <td className="px-8 py-5 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-bold text-[#0A0A0A]">
                              <Users size={14} className="text-gray-500" /> {booking.guests} Guests
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-4">
                              {booking.notes && (
                                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] bg-[#f9a602]/20 px-2.5 py-1 rounded-md">
                                  Notes
                                </span>
                              )}
                              <div className={`p-1.5 rounded-full transition-colors ${isExpanded ? 'bg-[#0A0A0A] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-[#0A0A0A]'}`}>
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Notes Section */}
                        {isExpanded && (
                          <tr className="bg-[#f9a602]/5 border-b border-[#f9a602]/20">
                            <td colSpan="5" className="p-0">
                              <div className="px-8 py-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                                  <div className="mt-0.5 p-2 bg-[#f9a602]/10 rounded-lg text-[#f9a602]">
                                    <AlignLeft size={18} />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Special Requests & Notes</h4>
                                    <p className="text-sm font-medium text-[#0A0A0A] leading-relaxed italic">
                                      {booking.notes ? `"${booking.notes}"` : <span className="text-gray-400">"No special instructions provided."</span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  /* Empty State */
                  <tr>
                    <td colSpan="5">
                      <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <FilterX size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-base font-bold text-[#0A0A0A]">No bookings found</h3>
                        <p className="text-sm font-medium text-gray-500 mt-1 max-w-sm">We couldn't find any reservations matching your current search criteria.</p>
                        {(searchTerm || filterDate) && (
                          <button 
                            onClick={() => { setSearchTerm(""); setFilterDate(""); }}
                            className="mt-6 px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-colors"
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>  
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bookings;