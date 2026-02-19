import React, { useState } from 'react';
import { Search, Download, Trash2, Filter, Calendar, AlertTriangle, Check, X } from 'lucide-react';
import { useCustomer } from '../hooks/useCustomer';

const CustomerPage = () => {
  // useCustomer ഹുക്കിൽ നിന്ന് ആവശ്യമായവ എടുക്കുന്നു
  const { 
    filteredCustomers, 
    searchTerm, 
    setSearchTerm, 
    deleteCustomer, 
    customers, 
    statusFilter, 
    setStatusFilter 
  } = useCustomer();
  
  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // ഫിൽറ്റർ മെനു കൺട്രോൾ ചെയ്യാൻ

  // CSV Export: എല്ലാ കസ്റ്റമർ ഡാറ്റയും ഡൗൺലോഡ് ചെയ്യാൻ
  const exportAllToCSV = () => {
    const headers = "ID,Name,Email,Phone,Status,Join Date,Orders\n";
    const csvContent = customers.map(c => 
      `${c.id},${c.name},${c.email},${c.phone},${c.status},${c.joinDate},${c.orders}`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Crunch_Customers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete);
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  };

  return (
    // പുറത്ത് ക്ലിക്ക് ചെയ്താൽ ഫിൽറ്റർ മെനു ക്ലോസ് ചെയ്യാൻ onClick നൽകി
    <div className="w-full min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A]" onClick={() => setIsFilterOpen(false)}>
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-10 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">
              CUSTOMERS<span className="text-[#FFC107]">.</span>
            </h1>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Management Portal</p>
          </div>
          
          <button 
            onClick={exportAllToCSV}
            className="flex items-center gap-2 px-4 md:px-6 py-3 bg-black text-[#FFC107] rounded-2xl text-[11px] font-black shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all"
          >
            <Download size={16}/> <span className="hidden sm:inline">EXPORT MASTER DATA</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-10">
        
        {/* --- SEARCH & FILTERS --- */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
          <div className="relative flex-1 w-full group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FFC107] transition-colors"/>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, contact or email..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm outline-none shadow-sm focus:ring-4 focus:ring-[#FFC107]/5 focus:border-[#FFC107] transition-all"
            />
          </div>

          {/* FILTER DROPDOWN CONTAINER */}
          <div className="relative w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-full md:w-auto px-6 py-4 border rounded-[1.5rem] text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm
              ${statusFilter !== 'All' ? 'bg-black text-[#FFC107] border-black' : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'}`}
            >
              <Filter size={16}/> 
              {statusFilter === 'All' ? 'Filter' : statusFilter}
              {statusFilter !== 'All' && (
                <X 
                  size={14} 
                  onClick={(e) => { e.stopPropagation(); setStatusFilter('All'); }} 
                  className="ml-1 hover:text-white"
                />
              )}
            </button>

            {/* Actual Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1">
                  {['All', 'Active', 'Inactive'].map((status) => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors
                      ${statusFilter === status ? 'bg-[#FFC107]/10 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      {status}
                      {statusFilter === status && <Check size={14} className="text-[#FFC107]"/>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="hidden md:block text-[11px] font-black text-gray-300 uppercase tracking-widest ml-4 min-w-[120px] text-right">
            {filteredCustomers.length} Records Found
          </p>
        </div>

        {/* --- DESKTOP TABLE --- */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/40">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Profile</th>
                <th className="py-6 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-6 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Engagement</th>
                <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/30 transition-all">
                    <td className="py-6 px-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFC107]/10 flex items-center justify-center font-black text-[#FFC107] text-xl border border-[#FFC107]/10">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{customer.name}</h3>
                          <p className="text-[11px] text-gray-400 font-medium">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900">{customer.orders} Orders</span>
                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 uppercase">
                          <Calendar size={10}/> Joined {customer.joinDate}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-10 text-right">
                      <button 
                        onClick={() => {
                          setCustomerToDelete(customer.id);
                          setShowDeleteModal(true);
                        }}
                        className="h-12 w-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-100 hover:shadow-xl hover:shadow-red-500/10 transition-all ml-auto"
                      >
                        <Trash2 size={20}/>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                    No customers found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARDS --- */}
        <div className="lg:hidden space-y-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <div key={customer.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFC107]/10 flex items-center justify-center font-black text-[#FFC107] text-xl border border-[#FFC107]/20">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{customer.name}</h4>
                    <p className={`text-[10px] font-bold ${customer.status === 'Active' ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {customer.status} User
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setCustomerToDelete(customer.id);
                      setShowDeleteModal(true);
                    }}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl active:scale-90 transition-transform"
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50 text-xs font-bold text-gray-500">
                  <span>{customer.orders} Orders Total</span>
                  <span className="text-gray-300 tracking-widest uppercase text-[9px]">ID-00{customer.id}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-xs">
              No results found.
            </div>
          )}
        </div>
      </div>

      {/* --- CUSTOM DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-8 mx-auto ring-8 ring-red-50/50">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 text-center tracking-tight">Are you sure?</h3>
            <p className="text-gray-500 text-sm mb-10 text-center leading-relaxed font-medium">
              You are about to remove this customer from the directory. This action is <span className="text-red-500 font-bold underline">permanent</span>.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete}
                className="w-full py-4 bg-red-500 text-white font-black rounded-2xl shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
              >
                YES, DELETE NOW
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
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