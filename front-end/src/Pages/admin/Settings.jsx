import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Globe, Layout, Map, Share2, Loader2, } from 'lucide-react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { 
  SettingsWebData, 
  SettingsTimeMap, 
  SettingsSocial ,
  SettingsSkeleton
} from '../../features/admin/settings';

const Settings = () => {
  const { 
    settings, isLoading, handleChange,error, fetchSettings, handleNestedChange, saveSettings,
    searchQuery, setSearchQuery, searchResults, showDropdown, setShowDropdown, 
    handleMapClick, getCurrentLocation, isLocating 
  } = useOutletContext();

  const [activeTab, setActiveTab] = useState('webdata');

  if (isLoading) return ( <SettingsSkeleton />);

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertCircle className="text-red-500" size={30}  />
      </div>
      <h2 className="text-sm md:text-xl font-black text-gray-900 mb-6   italic uppercase">{error}</h2>
      <button 
        onClick={() => fetchSettings()} 
        className="cursor-pointer flex items-center gap-2 bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-sm hover:bg-[#f9a602] hover:text-black transition-all shadow-lg"
      >
        <RefreshCcw size={18} /> Try Again
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white p-5 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center gap-3">
          <Globe className="text-[#f9a602]" size={36} /> WEB<span className="text-[#f9a602]">SETTINGS.</span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-2xl border border-gray-200 w-fit">
        {[
          { id: 'webdata', label: 'Web Data', icon: Layout, color: 'text-blue-500' },
          { id: 'timemap', label: 'Time & Map', icon: Map, color: 'text-orange-500' },
          { id: 'social', label: 'Social Media', icon: Share2, color: 'text-pink-500' }
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow-sm ring-1 ring-gray-200/50 shadow-xl' : 'text-gray-600'}`}>
            <tab.icon size={16} className={activeTab === tab.id ? tab.color : 'text-gray-600'} />
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