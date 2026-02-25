import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useSettings = () => {
  // Initial dummy state based on your requirements
  const [settings, setSettings] = useState({
    appName: "The Crunch",
    email: "hello@thecrunch.com",
    phone: "+91 98765 43210",
    address: "Kakkanad, Kochi, Kerala",
    location: "https://maps.google.com?q=Kakkanad,+Kochi,+Kerala",
    socials: {
      instagram: "https://instagram.com/thecrunch",
      facebook: "https://facebook.com/thecrunch",
      twitter: "https://twitter.com/thecrunch",
      whatsapp: "https://wa.me/919876543210"
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle standard field changes
  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested social media field changes
  const handleSocialChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  // Clear specific field (Acts as Delete)
  const handleClearField = (field, isSocial = false) => {
    if (isSocial) {
      handleSocialChange(field, "");
    } else {
      handleChange(field, "");
    }
  };

  // Save Settings to Backend (Mock API Call)
  const saveSettings = useCallback(async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: Replace with actual API call later
      // await api.post('/admin/settings/update/', settings);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  return {
    settings,
    isLoading,
    isSaving,
    handleChange,
    handleSocialChange,
    handleClearField,
    saveSettings
  };
};