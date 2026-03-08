import React, { useState, useEffect } from 'react';
import { Search, Download, Phone, Mail, Filter, Loader2, ChevronDown, ShoppingBag, Calendar } from 'lucide-react';
import useCustomer from '../hooks/useCustomer'; 
import { toast } from 'react-hot-toast';

const CustomerSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-24 bg-gray-100 rounded-3xl w-full"></div>
    ))}
  </div>
);

const CustomerPage = () => {
  const { 
    customers, searchTerm, setSearchTerm, statusFilter, setStatusFilter,
    isLoading, isMoreLoading, hasMore, loadMore, toggleBlockStatus, exportToCSV, isExporting,
    error 
  } = useCustomer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-sans text-[#2D3748] flex flex-col" onClick={() => setIsFilterOpen(false)}>
      
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-12 py-5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-[#1A202C]">
              CUSTOMERS<span className="text-[#f9a602]">.</span>
            </h1>
            <p className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Management Portal</p>
          </div>
          
          <button 
            onClick={exportToCSV}
            disabled={isExporting || isLoading}
            className="flex items-center gap-2 px-4 md:px-8 py-3 bg-[#1A202C] text-white rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin text-[#f9a602]" /> : <Download size={16} className="text-[#f9a602]" />}
            <span className="hidden sm:inline">EXPORT CSV</span>
            <span className="sm:hidden">EXPORT</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto p-4 md:p-12 pb-24">
        
        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f9a602] transition-colors"/>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or phone..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-semibold outline-none focus:ring-4 focus:ring-[#f9a602]/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:flex-none" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full md:w-auto px-6 py-4 border rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all ${statusFilter !== 'All' ? 'bg-[#f9a602] text-white border-[#f9a602]' : 'bg-white text-gray-600 border-gray-100'}`}
              >
                <Filter size={18} /> {statusFilter}
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2">
                  {['All', 'Active', 'Blocked'].map((status) => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                      className="w-full text-left px-5 py-3 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl font-bold text-xs text-gray-400">
               <span className="text-[#1A202C]">{isLoading ? ".." : customers.length}</span> RECORDS
            </div>
          </div>
        </div>

        {/* DATA AREA */}
        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
          
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile & Contact</th>
                  <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Engagement</th>
                  <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading && customers.length === 0 ? (
                  <tr><td colSpan="3" className="p-8"><CustomerSkeleton /></td></tr>
                ) : customers.length === 0 ? (
                  <tr><td colSpan="3" className="p-20 text-center font-bold text-gray-400 tracking-widest uppercase text-xs">No customers found.</td></tr>
                ) : customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-6 px-10">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border-2 ${customer.is_blocked ? 'bg-red-50 text-red-400 border-red-50' : 'bg-[#f9a602]/10 text-[#f9a602] border-[#f9a602]/5'}`}>
                          {customer.first_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1A202C]">{customer.first_name} {customer.last_name}</h3>
                          <div className="flex flex-col gap-1 mt-1">
                            <p className="text-xs text-gray-400 flex items-center gap-1.5"><Mail size={12} className="text-gray-300"/> {customer.email || 'No email'}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1.5"><Phone size={12} className="text-gray-300"/> {customer.phone_number}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* DETAILS COLUMN - NOW SHOWING ORDERS */}
                    <td className="py-6 px-8 text-center">
                      <div className="flex flex-col items-center gap-1">
                         <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                            <ShoppingBag size={12} className="text-[#f9a602]"/>
                            <span className="text-sm font-bold text-[#1A202C]">{customer.total_orders || 0} Orders</span>
                         </div>
                         <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest flex items-center gap-1">
                            <Calendar size={10}/> Joined {new Date(customer.date_joined).toLocaleDateString('en-GB')}
                         </span>
                      </div>
                    </td>

                    <td className="py-6 px-10 text-right">
                      <button 
                        onClick={() => { setUserToToggle(customer); setShowBlockModal(true); }}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${customer.is_blocked ? 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-100' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}`}
                      >
                        {customer.is_blocked ? 'Blocked' : 'Active'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST */}
          <div className="md:hidden divide-y divide-gray-50">
            {isLoading && customers.length === 0 ? (
              <div className="p-5"><CustomerSkeleton /></div>
            ) : customers.map((customer) => (
              <div key={customer.id} className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${customer.is_blocked ? 'bg-red-50 text-red-400' : 'bg-[#f9a602]/10 text-[#f9a602]'}`}>
                    {customer.first_name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-sm text-[#1A202C] truncate">{customer.first_name} {customer.last_name}</h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <p className="text-[11px] text-gray-400 truncate flex items-center gap-1"><Mail size={10}/> {customer.email || 'N/A'}</p>
                      <p className="text-[11px] text-gray-400 truncate flex items-center gap-1"><Phone size={10}/> {customer.phone_number}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setUserToToggle(customer); setShowBlockModal(true); }}
                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase shrink-0 ${customer.is_blocked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}
                  >
                    {customer.is_blocked ? 'Blocked' : 'Active'}
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 rounded-xl">
                   <span className="text-[10px] font-bold text-gray-500 uppercase">{customer.total_orders || 0} Orders</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase">Joined {new Date(customer.date_joined).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEE MORE BUTTON */}
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={loadMore} 
              disabled={isMoreLoading} 
              className="flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-70"
            >
              {isMoreLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  LOADING...
                </>
              ) : (
                <>
                  SEE MORE <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showBlockModal && userToToggle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/10 backdrop-blur-md" onClick={() => setShowBlockModal(false)}>
           <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full animate-in zoom-in-95 duration-200 border border-gray-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-center mb-6">Confirm Status Change?</h3>
            <p className="text-sm text-gray-400 text-center mb-8 font-medium">Are you sure you want to change the status for {userToToggle.first_name}?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { toggleBlockStatus(userToToggle.id); setShowBlockModal(false); }} className={`py-4 font-bold rounded-xl text-white ${userToToggle.is_blocked ? 'bg-emerald-500' : 'bg-red-500'}`}>YES, PROCEED</button>
              <button onClick={() => setShowBlockModal(false)} className="py-4 bg-gray-50 text-gray-400 font-bold rounded-xl">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;