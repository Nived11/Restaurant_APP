import React from 'react';
import { Building2, Mail, Phone, MapPin, Map, Loader2, LocateFixed, Navigation2 } from 'lucide-react';
import EditableField from './EditableField';

const SettingsContact = ({ settings, handleChange, isLocating, handleGetCurrentLocation }) => {

  const getMapIframeSrc = () => {
    let query = "Kochi,Kerala"; 
    
    if (settings?.location && settings.location.includes('q=')) {
      query = settings.location.split('q=')[1].split('&')[0];
    } else if (settings?.location && settings.location.includes('@')) {
      query = settings.location.split('@')[1].split(',').slice(0, 2).join(',');
    } else if (settings?.address) {
      query = encodeURIComponent(settings.address);
    }
    
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
            <Building2 size={20} />
          </div>
          Contact & Location
        </h2>
        <p className="text-xs text-gray-500 mt-2">Information visible to customers in the footer and contact page.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <EditableField 
          icon={Building2} 
          label="Restaurant Name" 
          value={settings?.appName} 
          onChange={(val) => handleChange('appName', val)} 
          placeholder="Enter restaurant name"
        />
        <EditableField 
          icon={Mail} 
          label="Email Address" 
          value={settings?.email} 
          onChange={(val) => handleChange('email', val)} 
          placeholder="Enter email address"
        />
        <EditableField 
          icon={Phone} 
          label="Phone Number" 
          value={settings?.phone} 
          onChange={(val) => handleChange('phone', val)} 
          placeholder="Enter phone number"
        />
        <EditableField 
          icon={MapPin} 
          label="Physical Address" 
          value={settings?.address} 
          onChange={(val) => handleChange('address', val)} 
          placeholder="Enter physical address"
        />

        {/* --- INTERACTIVE MAP SECTION --- */}
        <div className="md:col-span-2 mt-4 space-y-4">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Pinpoint Location
          </label>
          
          <div className="relative w-full h-[350px] bg-gray-100 rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm group">
            <iframe 
              title="Restaurant Location Map"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src={getMapIframeSrc()}
              className="grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-xl z-10 flex flex-col items-center">
              <div className="bg-[#0A0A0A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-1 shadow-lg animate-bounce">
                We are here
              </div>
              <MapPin size={42} className="text-[#f9a602] fill-white -mt-1" strokeWidth={1.5} />
              <div className="w-5 h-1.5 bg-black/20 rounded-[100%] mt-0.5 blur-[2px]"></div>
            </div>

            <div className="absolute bottom-4 right-4 z-20">
              <div className="relative group/tooltip">
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="w-[40px] h-[40px] bg-white rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.3)] flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-70"
                >
                  {isLocating ? (
                    <Loader2 size={18} className="animate-spin text-blue-600" />
                  ) : (
                    <LocateFixed size={20} className="text-[#666666] hover:text-black transition-colors" />
                  )}
                </button>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  Show your location
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
            <EditableField 
              icon={Map} 
              label="Generated Map Link" 
              value={settings?.location} 
              onChange={(val) => handleChange('location', val)} 
              placeholder="Map link will generate here"
            />
            <EditableField 
              icon={Navigation2} 
              label="Maximum Delivery Radius (in KM)" 
              value={settings?.deliveryRadius} 
              onChange={(val) => handleChange('deliveryRadius', val)} 
              placeholder="Enter delivery radius in KM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContact;