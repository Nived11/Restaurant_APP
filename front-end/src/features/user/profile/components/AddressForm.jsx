import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Navigation, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAddress } from "../hooks/useAddress";

const AddressForm = ({ initialData, onClose, onSubmit }) => {
  const { isLocating, getCurrentLocation } = useAddress();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [localError, setLocalError] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [formData, setFormData] = useState({
    address_type: initialData?.address_type || "Home",
    complete_address: initialData?.complete_address || "",
    landmark: initialData?.landmark || "",
    pincode: initialData?.pincode || "",
    latitude: initialData?.latitude || null,
    longitude: initialData?.longitude || null,
    is_default: initialData?.is_default || false,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const handleGetLocation = async () => {
    setLocalError(null);
    try {
      const details = await getCurrentLocation();
      setFormData(prev => ({
        ...prev,
        latitude: details.latitude,
        longitude: details.longitude,
        pincode: details.postcode || prev.pincode,
        complete_address: details.formattedName 
      }));
      setLocationName(details.formattedName);
      toast.success("Location Pinned!");
    } catch (error) {
      console.error("Location error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (formData.pincode.length !== 6) {
      setLocalError("Please enter a valid 6-digit pincode");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setLocalError("Failed to save address. Please check your data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    initial: { y: "100%", opacity: 0.5 },
    animate: { 
      y: 0, opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 280, mass: 0.5 } 
    },
    exit: { 
      y: "100%", opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center overflow-hidden p-0 md:p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        onClick={!isSubmitting ? onClose : undefined} 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
      />

      <motion.div
        variants={modalVariants} initial="initial" animate="animate" exit="exit"
        drag={isMobile && !isSubmitting ? "y" : false}
        dragConstraints={{ top: 0 }} dragElastic={0.1}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 80 || velocity.y > 500) onClose();
        }}
        className="relative bg-white w-full max-w-lg rounded-t-[2rem] md:rounded-[2rem] shadow-2xl flex flex-col max-h-fit overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden flex justify-center pt-3">
            <div className="w-12 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="p-6 md:p-8 pt-5 md:pt-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                {initialData ? "Update" : "New"} Address
              </h3>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Delivery Details</p>
            </div>
            <button 
              type="button"
              disabled={isSubmitting} onClick={onClose} 
              className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <AnimatePresence>
            {localError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-xl text-red-600"
              >
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-tight">{localError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Type Toggle */}
            <div className="flex gap-1 p-1 bg-gray-200 rounded-xl">
              {["Home", "Work", "Other"].map((t) => (
                <button
                  key={t} type="button"
                  onClick={() => setFormData({ ...formData, address_type: t })}
                  className={`cursor-pointer flex-1 py-2.5 rounded-lg font-black text-[10px] uppercase transition-all ${
                    formData.address_type === t ? "bg-white text-primary shadow-md" : "text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* GPS Button */}
            <button
              type="button" disabled={isSubmitting || isLocating}
              onClick={handleGetLocation}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                formData.latitude ? "border-green-100 bg-green-50/20" : "border-dashed border-gray-400 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${formData.latitude ? "bg-green-500 text-white" : "bg-white text-gray-400 shadow-sm"}`}>
                  {isLocating ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16}  className="text-gray-800"/>}
                </div>
                <span className="text-[10px] font-black uppercase text-gray-900 truncate max-w-[200px]">
                  {isLocating ? "Locating..." : formData.latitude ? locationName || "Pinned" : "Use Current Location"}
                </span>
              </div>
              {formData.latitude && !isLocating && <Check size={16} className="text-green-600" />}
            </button>

            {/* Fields */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Complete Address</label>
                <input
                  required disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100  border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all"
                  placeholder="House No, Building, Street"
                  value={formData.complete_address}
                  onChange={(e) => setFormData({ ...formData, complete_address: e.target.value })}
                />
              </div>

              {/* Landmark & Pincode Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Landmark</label>
                  <input
                    required disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all"
                    placeholder="e.g. Near Mall"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Pincode</label>
                  <input
                    required disabled={isSubmitting} inputMode="numeric"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent outline-none text-[12px] font-bold text-gray-900 focus:bg-white focus:border-primary/20 transition-all"
                    placeholder="6-digit"
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val) && val.length <= 6) setFormData({ ...formData, pincode: val });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Default Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer py-1 w-fit">
              <input
                type="checkbox"
                className="cursor-pointer h-4 w-4 rounded accent-slate-900 border-gray-300"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
              />
              <span className="text-[9px] font-black uppercase text-gray-600 tracking-wider">Set as default</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit" disabled={isSubmitting}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving</> : (initialData ? "Update" : "Save Address")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressForm;