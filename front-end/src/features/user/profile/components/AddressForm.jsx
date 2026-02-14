import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, Home, Briefcase, MapPin } from "lucide-react";

const AddressForm = ({ initialData, onClose }) => {
  const [type, setType] = useState(initialData?.type || "Home");

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative bg-white w-full max-w-3xl rounded-[1.5rem] shadow-2xl p-6 md:p-10 z-[120]"
    >
      <button onClick={onClose} className="cursor-pointer absolute top-6 right-6 p-2 bg-gray-50 rounded-full text-gray-500 hover:text-red-500 transition-colors">
        <X size={20} />
      </button>

      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-8 text-gray-800">
        {initialData ? "Update Address" : "New Address"}
      </h3>

      <div className="space-y-5">
        {/* Type Selector */}
        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl">
          {["Home", "Office", "Other"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`cursor-pointer flex-1 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${
                type === t ? "bg-white shadow-sm text-primary" : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Receiver Name" className="placeholder:text-gray-500  w-full px-5 py-4 rounded-xl bg-gray-50 outline-none text-[11px] font-bold focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all" defaultValue={initialData?.name}/>
          <input type="text" placeholder="Mobile" className="placeholder:text-gray-500 w-full px-5 py-4 rounded-xl bg-gray-50 outline-none text-[11px] font-bold focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all" defaultValue={initialData?.mobile}/>
        </div>

        <input type="text" placeholder="House No / Building Name" className="placeholder:text-gray-500 w-full px-5 py-4 rounded-xl bg-gray-50 outline-none text-[11px] font-bold focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all" defaultValue={initialData?.detail}/>
        
        <input type="text" placeholder="Area / Landmark" className="placeholder:text-gray-500 w-full px-5 py-4 rounded-xl bg-gray-50 outline-none text-[11px] font-bold focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all" defaultValue={initialData?.area}/>

        {/* COMPACT SAVE BUTTON */}
        <div className="flex justify-center pt-4">
            <button 
                onClick={onClose}
                className="cursor-pointer w-full max-w-[200px] py-3.5 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
            >
                <Check size={16} />
                Save Address
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddressForm;