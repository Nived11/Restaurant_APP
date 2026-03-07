import React, { useState, useRef, useEffect } from 'react';
import { Check, Pencil, Loader2 } from 'lucide-react';

const EditableField = ({ icon: Icon, label, value, onChange, onSave, isTextArea = false, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  /**
   * HH:MM:SS ഫോർമാറ്റിലുള്ള സമയത്തെ AM/PM ലേക്ക് മാറ്റുന്നു (Display Only)
   * ഉദാഹരണം: "20:25:00" -> "08:25 PM"
   */
  const formatDisplayTime = (timeStr) => {
    if (type !== 'time' || !timeStr) return timeStr || "Not set";
    try {
      const parts = timeStr.split(':');
      if (parts.length < 2) return timeStr;

      let hours = parseInt(parts[0]);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // 12-hour ഫോർമാറ്റിലേക്ക് മാറ്റം
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 മണിയെ 12 ആക്കുന്നു

      return `${hours}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  const handleConfirm = async () => {
    setIsEditing(false);
    setIsSavingLocal(true);
    if (onSave) await onSave();
    setIsSavingLocal(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
        {label}
      </label>
      
      <div className={`relative flex items-center border rounded-2xl transition-all ${
        isEditing 
          ? 'border-[#f9a602] bg-white ring-4 ring-[#f9a602]/10' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        
        <div className="pl-4 pr-2 text-gray-400">
          <Icon size={18} />
        </div>
        
        {isEditing ? (
          isTextArea ? (
            <textarea
              ref={inputRef}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 py-3.5 px-2 bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-800 resize-none"
            />
          ) : (
            <input 
              ref={inputRef}
              type={type} 
              /**
               * ഇവിടെയാണ് മാറ്റം: ടൈം പിക്കർ HH:MM:SS സപ്പോർട്ട് ചെയ്യില്ല. 
               * അതുകൊണ്ട് slice(0, 5) ഉപയോഗിച്ച് HH:MM മാത്രം നൽകുന്നു.
               */
              value={(type === 'time' && value) ? value.slice(0, 5) : (value || "")}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              className="flex-1 py-3.5 px-2 bg-transparent border-none focus:outline-none text-sm font-bold text-gray-800"
            />
          )
        ) : (
          <div className="flex-1 py-3.5 px-2 text-sm font-bold text-gray-800 cursor-default">
            {/* സമയം ഡിസ്പ്ലേ ചെയ്യുമ്പോൾ മാത്രം AM/PM ഫോർമാറ്റ് ഉപയോഗിക്കുന്നു */}
            {type === 'time' ? formatDisplayTime(value) : (value || "Not set")}
          </div>
        )}

        <div className="pr-3">
          {isSavingLocal ? (
            <Loader2 size={16} className="animate-spin text-[#f9a602]" />
          ) : isEditing ? (
            <button 
              onClick={handleConfirm} 
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Check size={14} strokeWidth={3} />
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="p-2 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-black transition-colors"
            >
              <Pencil size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableField;