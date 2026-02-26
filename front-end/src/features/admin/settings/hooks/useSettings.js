import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    appName: "The Crunch",
    email: "hello@thecrunch.com",
    phone: "+91 98765 43210",
    address: "Kakkanad, Kochi, Kerala",
    location: "https://maps.google.com?q=Kakkanad,+Kochi,+Kerala",
    footerDescription: "Savor the authentic spices of Kerala. We deliver fresh, chef-crafted meals from our kitchen to your doorstep in record time.",
    workingHours: {
      weekdays: "10:00 AM - 11:00 PM",
      sunday: "09:00 AM - 12:00 AM"
    },
    socials: {
      instagram: "https://instagram.com/thecrunch",
      facebook: "https://facebook.com/thecrunch",
      twitter: "https://twitter.com/thecrunch",
      whatsapp: "https://wa.me/919876543210"
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const saveSettings = useCallback(async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: Replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Settings updated successfully!");
    } catch (error) {
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
    handleNestedChange,
    saveSettings
  };
};