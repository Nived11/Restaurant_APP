import React, { useState } from 'react';
import { Save, Loader2, Globe, Building2, FileText, Instagram } from 'lucide-react';

// Import hook and components 
import { useSettings } from '../../features/admin/settings/hooks/useSettings';
import SettingsContact from '../../features/admin/settings/components/SettingsContact';
import SettingsHours from '../../features/admin/settings/components/SettingsHours';
import SettingsSocial from '../../features/admin/settings/components/SettingsSocial';

const SettingsSkeleton = () => (
  <div className="space-y-6 animate-pulse max-w-5xl">
    <div className="flex gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-10 bg-gray-200 rounded-xl w-32"></div>
      ))}
    </div>
    
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100">
      <div className="mb-6 pb-4 border-b border-gray-50 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/3"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-14 bg-gray-50 border border-gray-100 rounded-2xl w-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Settings = () => {
  const { 
    settings, 
    isLoading,
    isSaving,
    isLocating,
    handleChange, 
    handleNestedChange,
    handleGetCurrentLocation, 
    saveSettings 
  } = useSettings();

  const [activeTab, setActiveTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: 'Contact & Location', icon: Building2, color: 'text-blue-500' },
    { id: 'footer', label: 'Footer Content & Hours', icon: FileText, color: 'text-purple-500' },
    { id: 'social', label: 'Social Media Links', icon: Instagram, color: 'text-pink-500' }
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0A0A0A]">
      <div className="p-5 md:p-10 max-w-7xl mx-auto">
        
        <div className="mb-10 text-left">
          <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center justify-start gap-3">
            <Globe className="text-[#f9a602]" size={36} />
            WEB<span className="text-[#f9a602]">SETTINGS.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Manage your website's content and footer details.</p>
        </div>

        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <form onSubmit={saveSettings} className="max-w-5xl">
            
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-gray-50 p-2 rounded-2xl border border-gray-100">
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

            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[400px]">
              {activeTab === 'contact' && (
                <SettingsContact 
                  settings={settings} 
                  handleChange={handleChange} 
                  isLocating={isLocating}
                  handleGetCurrentLocation={handleGetCurrentLocation}
                />
              )}
              {activeTab === 'footer' && (
                <SettingsHours 
                  settings={settings} 
                  handleChange={handleChange} 
                  handleNestedChange={handleNestedChange} 
                />
              )}
              {activeTab === 'social' && (
                <SettingsSocial 
                  settings={settings} 
                  handleNestedChange={handleNestedChange} 
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-4 mt-8 pb-12">
              <button 
                type="button"
                className="px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-colors"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className={`flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white text-sm font-black rounded-2xl uppercase tracking-widest hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-all shadow-xl hover:shadow-[#f9a602]/20 active:scale-95 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save All Settings
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;