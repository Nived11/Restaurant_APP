import React from 'react';
import { 
  Building2, Mail, Phone, MapPin, Map, 
  Instagram, Facebook, Twitter, MessageCircle, 
  Save, Loader2, X, Globe 
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

const SettingsPage = () => {
  const { 
    settings, 
    isLoading,
    isSaving, 
    handleChange, 
    handleSocialChange, 
    handleClearField, 
    saveSettings 
  } = useSettings();

  const InputField = ({ icon: Icon, label, value, onChange, onClear, placeholder }) => (
    <div className="space-y-2">
      <label className="text-xs font-black text-gray-500 uppercase tracking-wider pl-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors">
          <Icon size={18} />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f9a602]/20 focus:border-[#f9a602] focus:bg-white transition-all text-sm font-medium text-gray-800"
        />
        {value && (
          <button 
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const SettingsSkeleton = () => (
    <div className="space-y-8 animate-pulse max-w-5xl">
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100">
        <div className="mb-6 pb-4 border-b border-gray-50 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
            <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100">
        <div className="mb-6 pb-4 border-b border-gray-50 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0A0A0A]">
      <div className="p-5 md:p-10 max-w-7xl mx-auto">
        
        {/* Page Header - Left Aligned */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center justify-start gap-3">
            <Globe className="text-[#f9a602]" size={36} />
            WEB<span className="text-[#f9a602]">SETTINGS.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Manage your website's core details and social media links.</p>
        </div>

        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          /* Form Container - Left Aligned with a max-width to prevent extreme stretching */
          <form onSubmit={saveSettings} className="space-y-8 max-w-5xl">
            
            {/* Section 1: General Details */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-black text-[#0A0A0A]">General Details</h2>
                <p className="text-xs text-gray-500 mt-1">Contact information visible to customers.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  icon={Building2} 
                  label="Restaurant Name" 
                  value={settings.appName} 
                  onChange={(val) => handleChange('appName', val)} 
                  onClear={() => handleClearField('appName')}
                  placeholder="E.g., The Crunch"
                />
                <InputField 
                  icon={Mail} 
                  label="Email Address" 
                  value={settings.email} 
                  onChange={(val) => handleChange('email', val)} 
                  onClear={() => handleClearField('email')}
                  placeholder="E.g., hello@thecrunch.com"
                />
                <InputField 
                  icon={Phone} 
                  label="Phone Number" 
                  value={settings.phone} 
                  onChange={(val) => handleChange('phone', val)} 
                  onClear={() => handleClearField('phone')}
                  placeholder="E.g., +91 98765 43210"
                />
                <InputField 
                  icon={MapPin} 
                  label="Physical Address" 
                  value={settings.address} 
                  onChange={(val) => handleChange('address', val)} 
                  onClear={() => handleClearField('address')}
                  placeholder="E.g., Kakkanad, Kochi"
                />
                <div className="md:col-span-2">
                  <InputField 
                    icon={Map} 
                    label="Google Maps URL" 
                    value={settings.location} 
                    onChange={(val) => handleChange('location', val)} 
                    onClear={() => handleClearField('location')}
                    placeholder="Paste Google Maps link here"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Social Media Links */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-black text-[#0A0A0A]">Social Media</h2>
                <p className="text-xs text-gray-500 mt-1">Connect your social accounts to the footer of your website.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  icon={Instagram} 
                  label="Instagram Link" 
                  value={settings.socials.instagram} 
                  onChange={(val) => handleSocialChange('instagram', val)} 
                  onClear={() => handleClearField('instagram', true)}
                  placeholder="https://instagram.com/..."
                />
                <InputField 
                  icon={Facebook} 
                  label="Facebook Link" 
                  value={settings.socials.facebook} 
                  onChange={(val) => handleSocialChange('facebook', val)} 
                  onClear={() => handleClearField('facebook', true)}
                  placeholder="https://facebook.com/..."
                />
                <InputField 
                  icon={Twitter} 
                  label="Twitter (X) Link" 
                  value={settings.socials.twitter} 
                  onChange={(val) => handleSocialChange('twitter', val)} 
                  onClear={() => handleClearField('twitter', true)}
                  placeholder="https://twitter.com/..."
                />
                <InputField 
                  icon={MessageCircle} 
                  label="WhatsApp Link" 
                  value={settings.socials.whatsapp} 
                  onChange={(val) => handleSocialChange('whatsapp', val)} 
                  onClear={() => handleClearField('whatsapp', true)}
                  placeholder="https://wa.me/..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button 
                type="button"
                className="px-6 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => window.location.reload()}
              >
                Discard Changes
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className={`flex items-center gap-2 px-8 py-3.5 bg-[#0A0A0A] text-white text-sm font-black rounded-xl uppercase tracking-wider hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-all shadow-lg active:scale-95 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Settings
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

export default SettingsPage;