import React, { useState } from "react";
import { Home, Briefcase, MapPin, Edit3, Trash2, Plus, Phone, User, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddressForm from "./AddressForm";
import DeleteConfirmation from "./DeleteConfirmation";

const AddressBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", name: "Alex Thompson", detail: "Jonathan's Villa, 12th Street", area: "Marine Drive, Kochi", mobile: "+91 98765 43210" },
    { id: 2, type: "Office", name: "Alex Thompson", detail: "Infopark Phase 2, Unit 4B", area: "Kakkanad, Kochi", mobile: "+91 98765 43210" },
  ]);

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowForm(true);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {addresses.map((addr) => (
          <motion.div 
            layout
            key={addr.id} 
            className="group bg-white border border-gray-100 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 relative"
          >
            {/* Top Action Bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {/* Icon Box */}
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {addr.type === "Home" ? <Home size={16} /> : <Briefcase size={16} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-800">{addr.type}</span>
              </div>
              
              {/* FIXED ACTIONS: Always visible, no opacity-0 */}
              <div className="flex gap-1.5">
                <button 
                  onClick={() => handleEdit(addr)} 
                  title="Edit Address"
                  className="p-2 bg-gray-100 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all active:scale-90"
                >
                  <Edit3 size={14}/>
                </button>
                <button 
                  onClick={() => setDeleteId(addr.id)} 
                  title="Delete Address"
                  className="p-2 bg-gray-100 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
                >
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-1">
              <h4 className="font-black text-[11px] md:text-sm text-gray-800 uppercase tracking-tighter line-clamp-1">
                {addr.detail}
              </h4>
              <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                {addr.area}
              </p>
            </div>

            {/* Contact Information Footer */}
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[8px] font-black text-gray-400 uppercase">
                  <User size={10} className="text-primary/40"/> {addr.name.split(' ')[0]}
                </div>
                <div className="flex items-center gap-1 text-[8px] font-black text-gray-400 uppercase">
                  <Phone size={10} className="text-primary/40"/> {addr.mobile.slice(-5)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Address Button */}
        <button 
          onClick={() => { setEditingAddress(null); setShowForm(true); }}
          className="border-2 border-dashed border-gray-100 bg-gray-50/20 rounded-[1.5rem] md:rounded-[2rem] p-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-white hover:border-primary/30 hover:text-primary transition-all group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5">
            <Plus size={18} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Add New Address</span>
        </button>
      </div>

      {/* FIXED FORM OVERLAY */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <AddressForm 
              initialData={editingAddress} 
              onClose={() => setShowForm(false)} 
            />
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION MODAL */}
      <DeleteConfirmation 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => {
            setAddresses(addresses.filter(a => a.id !== deleteId));
            setDeleteId(null);
        }} 
      />
    </div>
  );
};

export default AddressBook;