import React, { useState, useRef, useEffect } from 'react';
import { Check, Pencil } from 'lucide-react';

const EditableField = ({ icon: Icon, label, value, onChange, placeholder, isTextArea = false, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsEditing(true);
  };

  const handleConfirm = (e) => {
    if (e) e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className={`space-y-2 ${disabled ? 'opacity-70' : ''}`}>
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
        {label}
      </label>
      <div 
        className={`relative group flex ${isTextArea ? 'items-start pt-3.5' : 'items-center'} border ${
          isEditing 
            ? 'border-[#f9a602] bg-white ring-4 ring-[#f9a602]/10 shadow-sm' 
            : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
        } rounded-2xl transition-all duration-300 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <div className={`pl-4 pr-2 transition-colors duration-300 ${isEditing ? 'text-[#f9a602]' : 'text-gray-400 group-hover:text-gray-600'}`}>
          <Icon size={18} />
        </div>
        
        {isTextArea ? (
          <textarea
            ref={inputRef}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            readOnly={!isEditing || disabled}
            placeholder={placeholder}
            rows={3}
            onBlur={handleConfirm}
            className={`flex-1 py-3.5 px-2 bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-800 resize-none ${
              (!isEditing || disabled) && 'cursor-default'
            }`}
          />
        ) : (
          <input 
            ref={inputRef}
            type="text" 
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            readOnly={!isEditing || disabled}
            placeholder={placeholder}
            onBlur={handleConfirm}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
            className={`flex-1 py-3.5 px-2 w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-800 truncate ${
              (!isEditing || disabled) && 'cursor-default'
            }`}
          />
        )}
        
        <div className={`pr-3 pl-2 ${isTextArea && 'pt-0'}`}>
          {isEditing ? (
            <button 
              type="button"
              onMouseDown={handleConfirm}
              className="w-8 h-8 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center animate-in zoom-in duration-200 z-10"
            >
              <Check size={16} strokeWidth={3} />
            </button>
          ) : (
            !disabled && (
              <button 
                type="button"
                onClick={handleEditClick}
                className="w-8 h-8 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-100 hover:text-[#0A0A0A] transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm z-10"
              >
                <Pencil size={14} strokeWidth={2.5} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableField;