import React from 'react';
import { AlertCircle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
       <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={32} /></div>
          <h3 className="text-2xl font-black text-center text-[#0A0A0A] mb-2">Delete Banner?</h3>
          <p className="text-center text-gray-500 text-sm font-medium mb-8">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-xl">Yes, Delete</button>
          </div>
       </div>
    </div>
  );
};

export default DeleteModal;