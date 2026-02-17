import React from 'react';
import { Search, Mail, Phone, MapPin, Download, Trash2, FileText, Plus, Filter, Users, ChevronRight, Hash, Calendar } from 'lucide-react';
import { useCustomer } from '../hooks/useCustomer';

const CustomerPage = () => {
  const { filteredCustomers, searchTerm, setSearchTerm, deleteCustomer, downloadBill, customers } = useCustomer();

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1A1A1A]">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Users size={18} className="text-white"/>
            </div>
            <h1 className="text-xl font-bold tracking-tight">CRM Directory</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all">
              <Download size={20}/>
            </button>

          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6">
        
        {/* --- SMART FILTERS BAR --- */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"/>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, email or phone number..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
              <Filter size={16}/> Status: All
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
              {filteredCustomers.length} Results
            </p>
          </div>
        </div>

        {/* --- CUSTOMER GRID (Desktop) --- */}
        <div className="hidden lg:grid grid-cols-1 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50/50 border-b border-gray-100 py-4 px-6 text-[11px] font-black text-gray-400 uppercase tracking-wider">
            <div className="col-span-4">Customer Details</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Contact Info</div>
            <div className="col-span-2 text-center text-black/40">Engagement</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-12 items-center py-5 px-6 hover:bg-gray-50/30 transition-all group">
                {/* Profile */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F0F0F0] flex items-center justify-center font-bold text-gray-700 border border-gray-100">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">{customer.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Hash size={10}/> ID-00{customer.id} <span className="text-gray-200">•</span> <Calendar size={10}/> {customer.joinDate}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                    customer.status === 'Active' 
                    ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' 
                    : 'bg-white text-gray-400 border-gray-100'
                  }`}>
                    {customer.status}
                  </span>
                </div>

                {/* Contact */}
                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium text-gray-600 truncate">{customer.email}</p>
                  <p className="text-[11px] text-gray-400 font-bold">{customer.phone}</p>
                </div>

                {/* Orders */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex flex-col">
                    <span className="text-lg font-black text-black">{customer.orders}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Orders</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button 
                    onClick={() => downloadBill(customer)}
                    className="h-10 w-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all"
                  >
                    <FileText size={18}/>
                  </button>
                  <button 
                    onClick={() => deleteCustomer(customer.id)}
                    className="h-10 w-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <Trash2 size={18}/>
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MOBILE: MINIMAL LIST --- */}
        <div className="lg:hidden space-y-4">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold">{customer.name.charAt(0)}</div>
                  <h4 className="font-bold">{customer.name}</h4>
                </div>
                <span className={`text-[10px] font-black uppercase ${customer.status === 'Active' ? 'text-emerald-500' : 'text-gray-300'}`}>
                  {customer.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                <div className="flex items-center gap-1"><MapPin size={12}/> {customer.address.split(',')[0]}</div>
                <div className="flex items-center gap-1"><FileText size={12}/> {customer.orders} Orders</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => downloadBill(customer)} className="py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold">Download Bill</button>
                <button onClick={() => deleteCustomer(customer.id)} className="py-2.5 border border-gray-200 rounded-xl text-xs font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CustomerPage;