import React from 'react';
import { Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import EditableField from './EditableField'; 

const SettingsSocial = ({ settings, handleNestedChange, isEditingMode }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
            <Instagram size={20} />
          </div>
          Social Media Links
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {isEditingMode ? "Update your social media handles below." : "View mode active. Click edit to update links."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <EditableField 
          icon={Instagram} 
          label="Instagram URL" 
          value={settings?.socials?.instagram} 
          onChange={(val) => handleNestedChange('socials', 'instagram', val)} 
          placeholder="Enter Instagram URL"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
        <EditableField 
          icon={Facebook} 
          label="Facebook URL" 
          value={settings?.socials?.facebook} 
          onChange={(val) => handleNestedChange('socials', 'facebook', val)} 
          placeholder="Enter Facebook URL"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
        <EditableField 
          icon={Twitter} 
          label="Twitter (X) URL" 
          value={settings?.socials?.twitter} 
          onChange={(val) => handleNestedChange('socials', 'twitter', val)} 
          placeholder="Enter Twitter URL"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
        <EditableField 
          icon={MessageCircle} 
          label="WhatsApp URL" 
          value={settings?.socials?.whatsapp} 
          onChange={(val) => handleNestedChange('socials', 'whatsapp', val)} 
          placeholder="Enter WhatsApp URL"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
      </div>
    </div>
  );
};

export default SettingsSocial;