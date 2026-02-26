import React from 'react';
import { Building2, Mail, Phone, MapPin, Map } from 'lucide-react';
import EditableField from './EditableField'; // Check the import path

const SettingsContact = ({ settings, handleChange }) => {
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
          value={settings.appName} 
          onChange={(val) => handleChange('appName', val)} 
          placeholder="E.g., The Crunch"
        />
        <EditableField 
          icon={Mail} 
          label="Email Address" 
          value={settings.email} 
          onChange={(val) => handleChange('email', val)} 
          placeholder="E.g., hello@thecrunch.com"
        />
        <EditableField 
          icon={Phone} 
          label="Phone Number" 
          value={settings.phone} 
          onChange={(val) => handleChange('phone', val)} 
          placeholder="E.g., +91 98765 43210"
        />
        <EditableField 
          icon={MapPin} 
          label="Physical Address" 
          value={settings.address} 
          onChange={(val) => handleChange('address', val)} 
          placeholder="E.g., Kakkanad, Kochi"
        />
        <div className="md:col-span-2">
          <EditableField 
            icon={Map} 
            label="Google Maps URL" 
            value={settings.location} 
            onChange={(val) => handleChange('location', val)} 
            placeholder="Paste Google Maps link here"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsContact;