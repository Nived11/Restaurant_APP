import React, { useState } from 'react';
import { Save, Loader2, Globe, Building2, FileText, Instagram, Pencil, X, MapPin, Clock } from 'lucide-react';
import { useSettings, SettingsContact, SettingsHours, SettingsSocial } from '../../features/admin/settings';

// ✅ Custom Skeleton Loader for Settings Pages
const SettingsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Tab Skeleton */}
    <div className="flex gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100 w-fit">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-10 bg-gray-200 rounded-xl w-32 md:w-40"></div>
      ))}
    </div>
    
    {/* Content Area Skeleton */}
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
      <div className="mb-8 pb-6 border-b border-gray-50 space-y-3">
        <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-3 bg-gray-100 rounded-md w-1/2"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/3 ml-1"></div>
            <div className="h-14 bg-gray-50 border border-gray-100 rounded-2xl w-full"></div>
          </div>
        ))}
      </div>

      {/* Map Placeholder Skeleton (For Contact Tab) */}
      <div className="mt-8 h-[350px] bg-gray-100 rounded-[2rem] w-full"></div>
    </div>
  </div>
);

const Settings = () => {
  const { 
    settings, isLoading, isSaving, isLocating,
    handleChange, handleNestedChange,
    handleGetCurrentLocation, saveSettings 
  } = useSettings();

  const [activeTab, setActiveTab] = useState('contact');
  const [isEditingMode, setIsEditingMode] = useState(false);

  const tabs = [
    { id: 'contact', label: 'Contact & Location', icon: Building2, color: 'text-blue-500' },
    { id: 'footer', label: 'Footer Content & Hours', icon: FileText, color: 'text-purple-500' },
    { id: 'social', label: 'Social Media Links', icon: Instagram, color: 'text-pink-500' }
  ];

  const handleSave = async (e) => {
    await saveSettings(e);
    setIsEditingMode(false);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0A0A0A]">
      <div className="p-5 md:p-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center justify-start gap-3">
              <Globe className="text-[#f9a602]" size={36} />
              WEB<span className="text-[#f9a602]">SETTINGS.</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">Manage your website's operational details.</p>
          </div>

          {!isLoading && (
            <div className="flex items-center gap-3">
              {isEditingMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditingMode(false)}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-4 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all active:scale-95"
                  >
                    <X size={18} /> CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 bg-[#f9a602] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#e09502] transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-[#f9a602]/20"
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    SAVE CHANGES
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingMode(true)}
                  className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-black/90 transition-all active:scale-95 shadow-lg"
                >
                  <Pencil size={18} /> EDIT SETTINGS
                </button>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <>
            {/* Tabs Section */}
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-gray-50 p-2 rounded-2xl border border-gray-100 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0A0A0A] shadow-sm ring-1 ring-gray-200/50'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? tab.color : 'text-gray-400'} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Display Area */}
            <div className={`bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-500 ${!isEditingMode ? 'opacity-95' : 'ring-2 ring-[#f9a602]/5 shadow-xl'}`}>
              {activeTab === 'contact' && (
                <SettingsContact 
                  settings={settings} 
                  handleChange={handleChange} 
                  isLocating={isLocating} 
                  handleGetCurrentLocation={handleGetCurrentLocation}
                  isEditingMode={isEditingMode}
                />
              )}
              {activeTab === 'footer' && (
                <SettingsHours 
                  settings={settings} 
                  handleChange={handleChange} 
                  handleNestedChange={handleNestedChange}
                  isEditingMode={isEditingMode}
                />
              )}
              {activeTab === 'social' && (
                <SettingsSocial 
                  settings={settings} 
                  handleNestedChange={handleNestedChange}
                  isEditingMode={isEditingMode}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;