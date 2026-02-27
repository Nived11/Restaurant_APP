import React from 'react';
import { MapPin, ChevronLeft, ArrowRight, Home, Briefcase, Plus } from 'lucide-react';

export const AddressSection = ({ selectedAddress, setSelectedAddress, onNext, onBack }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
    {/* Heading Section */}
    <div className="flex items-end justify-between border-b border-gray-100 pb-4">
      <h2 className="text-md md:text-3xl font-black uppercase tracking-tight italic text-black">
        Delivery <span className="text-[#f9a602]">Address</span>
      </h2>
      <button
        onClick={() => window.location.href = "/profile?tab=address"}  
        className="cursor-pointer group flex items-center gap-1.5 text-[8px] p-2 bg-gray-100 rounded-lg md:text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-[#f9a602] transition-colors"
      >
        <Plus size={12} className="group-hover:rotate-90 transition-transform" />
        Add New Address
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Side: Address List */}
      <div className="lg:col-span-2 space-y-4">
        {[
          { id: "Home", type: "Home", icon: <Home size={20} />, details: "Skyline Apartments, Flat 4B, Kakkanad, Kochi, 682030" },
          { id: "Office", type: "Office", icon: <Briefcase size={20} />, details: "Infopark Phase 2, Carnival Building, Kochi, 682042" }
        ].map((addr) => (
          <div 
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            className={`p-5 md:p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group ${
              selectedAddress === addr.id 
              ? 'border-black bg-white shadow-xl translate-x-1' 
              : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start md:items-center">
              <div className="flex gap-4 items-start md:items-center">
                 <div className={`p-3 md:p-4 rounded-2xl transition-colors ${
                   selectedAddress === addr.id ? 'bg-[#f9a602] text-black' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                 }`}>
                   {addr.icon}
                 </div>
                 <div className="min-w-0">
                    <p className="font-black uppercase text-xs md:text-sm tracking-tight">{addr.type}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 font-bold mt-1 leading-relaxed line-clamp-2 md:line-clamp-none">
                      {addr.details}
                    </p>
                 </div>
              </div>
              
              {/* Radio Indicator */}
              <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedAddress === addr.id ? 'border-black bg-black' : 'border-gray-200'
              }`}>
                 {selectedAddress === addr.id && (
                   <div className="w-2 h-2 bg-[#f9a602] rounded-full shadow-[0_0_8px_#f9a602]"></div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side: Action Buttons (Sticky Summary) */}
      <div className="lg:sticky lg:top-32">
        <div className="bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] p-6 md:p-8">
          <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">Selection Summary</h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Deliver To _</p>
              <p className="text-[11px] font-black text-black uppercase truncate">
                {selectedAddress ? selectedAddress : "Please select an address"}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={onNext} 
                disabled={!selectedAddress}
                className="cursor-pointer w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#f9a602] hover:text-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              >
                confirm Address <ArrowRight size={14}/>
              </button>
              
              <button 
                onClick={onBack} 
                className="cursor-pointer w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft size={14}/> Back to Cart
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed">
          Please double check your address to ensure timely delivery
        </p>
      </div>
    </div>
  </div>
);

export default AddressSection;