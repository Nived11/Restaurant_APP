import React, { useState } from "react";
import { User, Phone, MapPin, Edit3, Check, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    mobile: "+91 98765 43210",
    location: "Kochi, Kerala, India"
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const fields = [
    { id: 'name', label: 'Full Name', value: userData.name, icon: <User size={18}/> },
    { id: 'mobile', label: 'Mobile Number', value: userData.mobile, icon: <Phone size={18}/> },
    { id: 'location', label: 'Default Location', value: userData.location, icon: <MapPin size={18}/> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="bg-white  rounded-[.5rem]  p-4 md:p-10 relative">
        
        {/* Mobile Header: Floating Style */}
        <div className="flex justify-between items-center mb-8 md:mb-12 px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-800">Account</h3>
               <ShieldCheck size={18} className="text-primary" />
            </div>
            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">Personal Details</p>
          </div>
          
          <button 
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className={`p-3 md:p-4 rounded-2xl transition-all shadow-lg md:shadow-sm ${
                isEditing 
                ? 'bg-red-500 text-white ring-4 ring-red-50' 
                : 'bg-primary text-white md:bg-white md:text-primary hover:scale-110'
            }`}
          >
            {isEditing ? <X size={20}/> : <Edit3 size={20}/>}
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {fields.map((field) => (
            <div key={field.id} className="group">
              {/* Desktop Label (Hidden on Mobile for cleaner look) */}
              <label className="hidden md:block text-[9px] font-black uppercase text-gray-500 tracking-widest ml-5 mb-2">
                {field.label}
              </label>
              
              <div className={`relative flex items-center gap-4 p-5 md:p-6 rounded-[1rem]  transition-all border-1 ${
                isEditing 
                ? 'bg-white border-primary shadow-xl shadow-primary/5 translate-y-[-2px]' 
                : 'bg-gray-50 md:bg-white/60 border-transparent'
              }`}>
                {/* Mobile Label: Inside the box */}
                <div className="absolute top-3 left-14 md:hidden text-[7px] font-black uppercase text-primary/50 tracking-widest">
                  {field.label}
                </div>

                <div className={`p-2.5 rounded-xl transition-colors ${isEditing ? 'bg-primary/10 text-primary' : 'bg-white text-gray-500'}`}>
                  {field.icon}
                </div>
                
                <div className="flex-1 pt-1 md:pt-0">
                  {isEditing ? (
                    <input 
                      type="text" 
                      autoFocus={field.id === 'name'}
                      value={tempData[field.id]}
                      onChange={(e) => setTempData({...tempData, [field.id]: e.target.value})}
                      className="w-full bg-transparent outline-none text-xs md:text-xs font-black text-gray-800 uppercase"
                    />
                  ) : (
                    <p className="text-xs md:text-xs font-black text-gray-800 uppercase tracking-tight truncate">
                      {field.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Mobile Floating Save */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 md:mt-12 flex justify-center"
            >
              <button 
                onClick={handleSave}
                className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white rounded-2xl md:rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-3"
              >
                <Check size={18}/>
                Update Account
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileOverview;