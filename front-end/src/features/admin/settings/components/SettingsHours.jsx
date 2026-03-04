import React from 'react';
import { Clock, FileText } from 'lucide-react';
import EditableField from './EditableField'; 

const SettingsHours = ({ settings, handleChange, handleNestedChange, isEditingMode }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
            <FileText size={20} />
          </div>
          Footer Content & Hours
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {isEditingMode ? "You can now edit the footer description and hours." : "Enable edit mode to change these details."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="md:col-span-2">
          <EditableField 
            icon={FileText} 
            label="Footer Description (About Us)" 
            value={settings?.footerDescription} 
            onChange={(val) => handleChange('footerDescription', val)} 
            placeholder="Enter footer description about the restaurant"
            isTextArea={true}
            disabled={!isEditingMode} // ✅ Locked when not in edit mode
          />
        </div>
        <EditableField 
          icon={Clock} 
          label="Working Hours (Mon - Sat)" 
          value={settings?.workingHours?.weekdays} 
          onChange={(val) => handleNestedChange('workingHours', 'weekdays', val)} 
          placeholder="Enter weekday working hours"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
        <EditableField 
          icon={Clock} 
          label="Working Hours (Sunday)" 
          value={settings?.workingHours?.sunday} 
          onChange={(val) => handleNestedChange('workingHours', 'sunday', val)} 
          placeholder="Enter sunday working hours"
          disabled={!isEditingMode} // ✅ Locked when not in edit mode
        />
      </div>
    </div>
  );
};

export default SettingsHours;