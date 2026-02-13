import { motion, AnimatePresence } from "framer-motion";
import { X,  Phone, User, Mail, } from "lucide-react";
import Logo from "../../assets/Logo-web.png";

const ReserveTable = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const modalVariants = {
    initial: isMobile ? { y: "100%", opacity: 1 } : { y: 0, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: isMobile ? { y: "100%", opacity: 1 } : { opacity: 0, scale: 0.98 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={isMobile ? { type: "spring", damping: 28, stiffness: 220 } : { duration: 0.2 }}
            
            // Swipe logic
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 80 || velocity.y > 500) onClose();
            }}

            className="relative bg-white w-full md:max-w-4xl rounded-t-[2rem] md:rounded-[2rem] shadow-2xl overflow-hidden max-h-[80vh] md:max-h-[90vh] flex flex-col touch-none md:touch-auto"
          >
            {/* Header Section */}
            <div className="relative pt-3 md:pt-6 pb-1 md:pb-3 px-6 text-center shrink-0">
              {/* Drag Handle (Mobile) */}
              <div className="md:hidden w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              
              {/* Close Button (Universal but styled for both) */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 md:right-6 md:top-6 p-2 bg-gray-50 hover:bg-primary/10 transition-colors rounded-full z-10"
              >
                <X size={isMobile ? 16 : 20} />
              </button>

              <div className="flex justify-center mb-1">
                <img src={Logo} alt="Logo" className="h-12 md:h-16 w-auto object-contain" />
              </div>

              <h2 className="text-lg md:text-3xl font-black uppercase tracking-tight">
                Table <span className="text-primary italic">Reservation</span>
              </h2>
            </div>

            {/* Form Content - More compact on mobile */}
            <form className="px-5 md:px-12 pb-6 md:pb-10 overflow-y-auto space-y-2.5 md:space-y-4 no-scrollbar">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                    <input type="text" placeholder="Your Name" className="w-full pl-10 pr-4 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs" />
                  </div>
                </div>

                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                    <input type="tel" placeholder="Contact No." className="w-full pl-10 pr-4 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs" />
                  </div>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-0.5 md:space-y-1">
                <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={14} />
                  <input type="email" placeholder="Optional" className="w-full pl-10 pr-4 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs" />
                </div>
              </div>

              {/* Row 3: Date, Time, Guests */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4">
                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Date</label>
                  <input type="date" className="w-full px-3 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs" />
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Time</label>
                  <input type="time" className="w-full px-3 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs" />
                </div>
                <div className="space-y-0.5 col-span-2 md:col-span-1">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Guests</label>
                  <select className="w-full px-3 py-2.5 md:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs appearance-none">
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6+ People</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Special Notes */}
              <div className="space-y-0.5 md:space-y-1">
                <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Notes</label>
                <textarea 
                  rows={isMobile ? "2" : "3"} 
                  placeholder="Requests..." 
                  className="w-full px-4 py-2.5 md:py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none font-bold text-xs resize-none"
                ></textarea>
              </div>

              {/* Action Button */}
              <div className="pt-2 md:pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full md:max-w-xs mx-auto block bg-primary text-white py-3 md:py-4 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-primary/20 transition-all hover:brightness-105"
                >
                  Confirm Booking
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