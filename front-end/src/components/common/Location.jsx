import { MapPin, ChevronDown } from "lucide-react";

const Location = ({ variant = "default" }) => {
  // 1. Desktop View 
  if (variant === "desktop") {
    return (
      <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="p-2 bg-primary rounded-full shadow-sm">
          <MapPin size={16} className="text-black" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Deliver To</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Kakkanad, Ernakulam...</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Mobile & Tablet/Laptop View
  return (
    <div className={`flex items-center gap-1 text-gray-500 ${variant === 'mobile' ? 'px-5 pb-3' : ''}`}>
      <MapPin size={14} className="text-black" />
      <span className="text-[11px] font-bold text-gray-700">Kakkanad, Ernakulam, Kerala</span>
      <ChevronDown size={12} className="text-gray-700" />
    </div>
  );
};

export default Location;