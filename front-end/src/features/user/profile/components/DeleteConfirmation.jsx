import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-md rounded-xl p-8 md:p-10 shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-gray-800">Delete Address?</h3>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-8">This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-800 bg-gray-300 hover:bg-gray-400 transition-colors">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;