import React, { useState } from 'react';
import { Search, Download, Filter, Calendar, Check, X, Ban, UserCheck, Loader2 } from 'lucide-react';
import { useCustomer } from '../hooks/useCustomer';

const CustomerPage = () => {
  console.log("[CustomerPage] 🖥️ Component Rendering...");

  const { 
    customers, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter,
    isLoading,
    isExporting,
    toggleBlockStatus,
    exportToCSV
  } = useCustomer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  const confirmToggleStatus = () => {
    if (userToToggle) {
      console.log(`[CustomerPage] 🖱️ User confirmed toggle for ID: ${userToToggle.id}`);
      toggleBlockStatus(userToToggle.id, userToToggle.is_blocked);
      setShowBlockModal(false);
      setUserToToggle(null);
    }
  };

  const handleExportClick = () => {
    console.log("[CustomerPage] 🖱️ Export Master Data button clicked");
    exportToCSV();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log(`[CustomerPage] ⌨️ User typed in search box: "${value}"`);
    setSearchTerm(value);
  };

  const handleFilterSelect = (status) => {
    console.log(`[CustomerPage] 🖱️ Filter selected: "${status}"`);
    setStatusFilter(status);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A]" onClick={() => setIsFilterOpen(false)}>
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-10 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">
              CUSTOMERS<span className="text-[#f9a602]">.</span>
            </h1>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Management Portal</p>
          </div>
          
          <button 
            onClick={handleExportClick}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 md:px-6 py-3 bg-[#0A0A0A] text-white rounded-2xl text-[11px] font-black shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin text-[#f9a602]" /> : <Download size={16} className="text-[#f9a602]" />}
            <span className="hidden sm:inline">EXPORT MASTER DATA</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-10">
        
        {/* --- SEARCH & FILTERS --- */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
          <div className="relative flex-1 w-full group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f9a602] transition-colors"/>
            <input 
              type="text" 
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, contact or email..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm font-semibold outline-none shadow-sm focus:ring-4 focus:ring-[#f9a602]/5 focus:border-[#f9a602] transition-all"
            />
          </div>

          <div className="relative w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => {
                console.log("[CustomerPage] 🖱️ Filter dropdown clicked");
                setIsFilterOpen(!isFilterOpen);
              }}
              className={`w-full md:w-auto px-6 py-4 border rounded-[1.5rem] text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm
              ${statusFilter !== 'All' ? 'bg-[#0A0A0A] text-white border-black' : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'}`}
            >
              <Filter size={16} className={statusFilter !== 'All' ? "text-[#f9a602]" : ""}/> 
              {statusFilter === 'All' ? 'Filter' : statusFilter}
              {statusFilter !== 'All' && (
                <X 
                  size={14} 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    console.log("[CustomerPage] 🖱️ Clear filter clicked");
                    setStatusFilter('All'); 
                  }} 
                  className="ml-1 hover:text-red-400 text-gray-400"
                />
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1">
                  {['All', 'Active', 'Blocked'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleFilterSelect(status)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors
                      ${statusFilter === status ? 'bg-[#f9a602]/10 text-[#0A0A0A]' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      {status}
                      {statusFilter === status && <Check size={14} className="text-[#f9a602]"/>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="hidden md:block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 min-w-[120px] text-right">
            {customers.length} Records Found
          </p>
        </div>

        {/* --- DESKTOP TABLE --- */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/40 min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Profile</th>
                <th className="py-6 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-6 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#f9a602]" size={30}/></td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className={`transition-all ${customer.is_blocked ? 'bg-red-50/30' : 'hover:bg-gray-50/30'}`}>
                    <td className="py-6 px-10">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border ${
                          customer.is_blocked ? 'bg-red-100 text-red-500 border-red-200' : 'bg-[#f9a602]/10 text-[#f9a602] border-[#f9a602]/20'
                        }`}>
                          {customer.first_name ? customer.first_name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h3 className={`font-bold text-base ${customer.is_blocked ? 'text-red-900 line-through decoration-red-300' : 'text-gray-900'}`}>
                            {customer.first_name} {customer.last_name}
                          </h3>
                          <p className="text-[11px] text-gray-400 font-medium">{customer.email || 'No email provided'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        !customer.is_blocked ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {!customer.is_blocked ? 'ACTIVE' : 'BLOCKED'}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-700">{customer.phone_number || 'N/A'}</span>
                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 uppercase">
                          <Calendar size={10}/> Joined {new Date(customer.date_joined).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-10 text-right">
                      <button 
                        onClick={() => {
                          console.log(`[CustomerPage] 🖱️ Block/Unblock button clicked for ID: ${customer.id}`);
                          setUserToToggle(customer);
                          setShowBlockModal(true);
                        }}
                        className={`h-11 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ml-auto border ${
                          customer.is_blocked 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white' 
                            : 'bg-white text-red-500 border-red-100 hover:bg-red-500 hover:text-white shadow-sm'
                        }`}
                      >
                        {customer.is_blocked ? <UserCheck size={16}/> : <Ban size={16}/>}
                        {customer.is_blocked ? 'UNBLOCK' : 'BLOCK'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                    No customers found matching the search/filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* --- CUSTOM BLOCK/UNBLOCK MODAL --- */}
      {showBlockModal && userToToggle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto ring-8 ${
              userToToggle.is_blocked ? 'bg-emerald-50 text-emerald-500 ring-emerald-50/50' : 'bg-red-50 text-red-500 ring-red-50/50'
            }`}>
              {userToToggle.is_blocked ? <UserCheck size={40} /> : <Ban size={40} />}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 text-center tracking-tight">Are you sure?</h3>
            <p className="text-gray-500 text-sm mb-10 text-center leading-relaxed font-medium">
              You are about to <span className={`font-bold ${userToToggle.is_blocked ? 'text-emerald-500' : 'text-red-500'}`}>
                {userToToggle.is_blocked ? 'UNBLOCK' : 'BLOCK'}
              </span> this customer. {userToToggle.is_blocked ? 'They will regain access to the platform.' : 'They will lose access to login and order.'}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmToggleStatus}
                className={`w-full py-4 font-black rounded-2xl shadow-xl transition-all active:scale-95 text-white ${
                  userToToggle.is_blocked ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                }`}
              >
                YES, {userToToggle.is_blocked ? 'UNBLOCK' : 'BLOCK'} NOW
              </button>
              <button 
                onClick={() => {
                  console.log("[CustomerPage] 🖱️ Modal cancelled.");
                  setShowBlockModal(false);
                }}
                className="w-full py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerPage;