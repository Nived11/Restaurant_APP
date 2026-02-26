import React from 'react';
import { Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import EditableField from './EditableField'; // Check the import path

const SettingsSocial = ({ settings, handleNestedChange }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
            <Instagram size={20} />
          </div>
          Social Media Links
        </h2>
        <p className="text-xs text-gray-500 mt-2">Connect your social accounts to the footer of your website.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <EditableField 
          icon={Instagram} 
          label="Instagram URL" 
          value={settings.socials.instagram} 
          onChange={(val) => handleNestedChange('socials', 'instagram', val)} 
          placeholder="https://instagram.com/..."
        />
        <EditableField 
          icon={Facebook} 
          label="Facebook URL" 
          value={settings.socials.facebook} 
          onChange={(val) => handleNestedChange('socials', 'facebook', val)} 
          placeholder="https://facebook.com/..."
        />
        <EditableField 
          icon={Twitter} 
          label="Twitter (X) URL" 
          value={settings.socials.twitter} 
          onChange={(val) => handleNestedChange('socials', 'twitter', val)} 
          placeholder="https://twitter.com/..."
        />
        <EditableField 
          icon={MessageCircle} 
          label="WhatsApp URL" 
          value={settings.socials.whatsapp} 
          onChange={(val) => handleNestedChange('socials', 'whatsapp', val)} 
          placeholder="https://wa.me/..."
        />
      </div>
    </div>
  );
};

export default SettingsSocial;