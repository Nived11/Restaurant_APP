import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, Loader2, Calendar, Clock, Users } from "lucide-react";
import Logo from "../../assets/Logo-web.png";
import { useReserveTable } from "../../hooks/useReserveTable";

const ReserveTable = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { formData, loading, error, handleChange, handleSubmit } = useReserveTable(onClose);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const inputClass = "w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 md:py-3.5 text-[11px] md:text-[12px] font-bold text-slate-900 outline-none focus:border-primary focus:bg-white transition-all appearance-none placeholder:text-slate-400";
  const labelClass = "text-[8px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 mb-1 block";

  const modalVariants = {
    initial: isMobile ? { y: "100%" } : { y: 30, opacity: 0, scale: 0.95 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: isMobile 
        ? { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
        : { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      y: "100%", 
      opacity: isMobile ? 1 : 0, 
      scale: isMobile ? 1 : 0.95, 
      transition: { duration: 0.25, ease: [0.4, 0, 1, 1] }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 600) onClose();
            }}
            className="relative bg-white w-full md:max-w-4xl rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh] will-change-transform overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Handle Bar */}
            <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full z-50" />

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute right-5 top-5 p-2 bg-slate-100 hover:bg-primary/10 transition-colors rounded-full z-50 text-slate-900"
            >
              <X size={isMobile ? 18 : 22} />
            </button>

            {/* Header Section */}
            <div className="relative pt-8 md:pt-12 pb-2 md:pb-6 px-6 text-center shrink-0">
              <div className="flex justify-center mb-2 md:mb-4">
                <img src={Logo} alt="Logo" className="h-10 md:h-16 w-auto object-contain" />
              </div>
              <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight text-slate-900 leading-none">
                Table <span className="text-primary italic">Reservation</span>
              </h2>

              {error && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[9px] md:text-xs font-bold mt-2 bg-red-50 py-1 px-4 rounded-full inline-block">
                  {error}
                </motion.p>
              )}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="px-6 md:px-16 pb-8 md:pb-12 overflow-y-auto space-y-3 md:space-y-5 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="space-y-1">
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                    <input name="full_name" value={formData.full_name} onChange={handleChange} required type="text" placeholder="Your Name" className={inputClass.replace('px-4', 'pl-11')} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={labelClass}>Phone (10 Digits)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Phone number"
                      className={inputClass.replace('px-4', 'pl-11')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="mail@example.com" className={inputClass.replace('px-4', 'pl-11')} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                <div className="space-y-1">
                  <label className={labelClass}>Date</label>
                  <div className="relative">
                    <input name="date" value={formData.date} onChange={handleChange} required min={today} type="date" className={inputClass} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Time</label>
                  <input name="time" value={formData.time} onChange={handleChange} required type="time" className={inputClass} />
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className={labelClass}>Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className={inputClass}>
                    <option value="2 People">2 People</option>
                    <option value="3 People">3 People</option>
                    <option value="4 People">4 People</option>
                    <option value="5 People">5 People</option>
                    <option value="6+ People">6+ People</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Notes (Optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={isMobile ? "2" : "3"} placeholder="Special requests..." className={`${inputClass} resize-none py-3`} />
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={!loading ? { scale: 1.01 } : undefined}
                  whileTap={!loading ? { scale: 0.98 } : undefined}
                  disabled={loading}
                  type="submit"
                  className={`w-full md:max-w-xs mx-auto flex items-center justify-center gap-3 bg-slate-900 text-white py-4 md:py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] md:text-xs shadow-xl transition-all ${loading ? 'opacity-90 cursor-not-allowed' : 'hover:bg-primary cursor-pointer'}`}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Confirm Booking"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReserveTable;