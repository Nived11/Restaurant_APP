import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Globe, Layout, Map, Share2, Loader2 } from 'lucide-react';
import { 
  SettingsWebData, 
  SettingsTimeMap, 
  SettingsSocial 
} from '../../features/admin/settings';

const Settings = () => {
  const { 
    settings, isLoading, handleChange, handleNestedChange, saveSettings,
    searchQuery, setSearchQuery, searchResults, showDropdown, setShowDropdown, 
    handleMapClick, getCurrentLocation, isLocating 
  } = useOutletContext();

  const [activeTab, setActiveTab] = useState('webdata');

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-[#f9a602]" size={40} />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white p-5 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center gap-3">
          <Globe className="text-[#f9a602]" size={36} /> WEB<span className="text-[#f9a602]">SETTINGS.</span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100 w-fit">
        {[
          { id: 'webdata', label: 'Web Data', icon: Layout, color: 'text-blue-500' },
          { id: 'timemap', label: 'Time & Map', icon: Map, color: 'text-orange-500' },
          { id: 'social', label: 'Social Media', icon: Share2, color: 'text-pink-500' }
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500'}`}>
            <tab.icon size={16} className={activeTab === tab.id ? tab.color : 'text-gray-400'} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        {activeTab === 'webdata' && <SettingsWebData settings={settings} handleChange={handleChange} handleNestedChange={handleNestedChange} onSave={saveSettings} />}
        
        {activeTab === 'timemap' && (
          <SettingsTimeMap 
            settings={settings} handleChange={handleChange} onSave={saveSettings}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            searchResults={searchResults} showDropdown={showDropdown} 
            setShowDropdown={setShowDropdown} handleMapClick={handleMapClick}
            getCurrentLocation={getCurrentLocation} isLocating={isLocating}
          />
        )}

        {activeTab === 'social' && <SettingsSocial settings={settings} handleNestedChange={handleNestedChange} onSave={saveSettings} />}
      </div>
    </div>
  );
};

export default Settings;