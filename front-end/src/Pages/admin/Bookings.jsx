import React, { useState } from "react";
import { Search, Calendar, User, Clock, Phone, Mail, Users, ChevronDown, ChevronUp, StickyNote } from "lucide-react";

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const bookingData = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@example.com", date: "2026-02-22", time: "07:30 PM", guests: 4, notes: "Window seat preferred for anniversary celebration. Will need extra napkins." },
    { id: 2, name: "Anjali Nair", phone: "9988776655", email: "anjali@test.com", date: "2026-02-23", time: "01:00 PM", guests: 2, notes: "Need a high chair for a toddler and away from the speakers." },
    { id: 3, name: "John Doe", phone: "9944332211", email: "john@crunch.com", date: "2026-02-22", time: "09:00 PM", guests: 6, notes: "Allergic to peanuts. Please inform the chef immediately." },
  ];

  const filteredBookings = bookingData.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.includes(searchTerm) || item.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDate === "" || item.date === filterDate)
  );

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen font-sans">
      <div className="max-w-full mx-auto space-y-6">
        
        {/* --- MINIMALIST HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Reservation Management
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-widest">Administrative Control Panel</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="date"
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-primary transition-all shadow-sm"
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search guest registry..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-primary transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- ADMIN DATA TABLE --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Guest Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Party</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <tr 
                      onClick={() => setExpandedRow(expandedRow === booking.id ? null : booking.id)}
                      className={`group cursor-pointer transition-colors duration-150 ${expandedRow === booking.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                    >
                      {/* NAME */}
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 text-sm tracking-tight">{booking.name}</span>
                      </td>

                      {/* MOBILE */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 flex items-center gap-2">
                          <Phone size={12} className="text-slate-400" /> {booking.phone}
                        </span>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 flex items-center gap-2">
                          <Mail size={12} className="text-slate-400" /> {booking.email}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">
                        {booking.date}
                      </td>

                      {/* TIME */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                          <Clock size={12} className="text-slate-400" /> {booking.time}
                        </span>
                      </td>

                      {/* PARTY */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-700">
                          {booking.guests} PAX
                        </span>
                      </td>

                      {/* NOTES TOGGLE */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {booking.notes && <StickyNote size={14} className="text-primary" />}
                          {expandedRow === booking.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED NOTE SECTION */}
                    {expandedRow === booking.id && (
                      <tr>
                        <td colSpan="7" className="bg-slate-50/40 px-6 py-0">
                          <div className="py-4 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-start gap-3">
                              <div className="mt-0.5 text-primary">
                                <StickyNote size={16} />
                              </div>
                              <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Guest Special Requests</h4>
                                <p className="text-slate-700 text-xs font-medium leading-relaxed italic">
                                  "{booking.notes || "No special notes recorded."}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )) : (
                  <tr>
                    <td colSpan="7" className="py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                      No matching records found
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