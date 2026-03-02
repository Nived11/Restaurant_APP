import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../../../../api/axios'; 

export const useSettings = () => {
  const [settings, setSettings] = useState({
    appName: "",
    email: "",
    phone: "",
    address: "",
    location: "", 
    deliveryRadius: "",
    footerDescription: "",
    workingHours: {
      weekdays: "",
      sunday: ""
    },
    socials: {
      instagram: "",
      facebook: "",
      twitter: "",
      whatsapp: ""
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await api.get('/site-settings/info/');
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast.error("Failed to load settings data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleGetCurrentLocation = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newLocationUrl = `https://maps.google.com/?q=${lat},${lng}`;
          handleChange('location', newLocationUrl);
          toast.success("Location fetched successfully!");
          setIsLocating(false);
        },
        (error) => {
          toast.error("Failed to get location. Please check browser permissions.");
          setIsLocating(false);
        }
      );
    }
  }, []);

  const saveSettings = useCallback(async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // ✅ FIX: Filter out empty strings from nested objects to avoid Django URL validation errors
      const cleanNested = (obj) => {
        const filtered = {};
        Object.keys(obj).forEach(key => {
          if (obj[key] && obj[key].trim() !== "") {
            filtered[key] = obj[key];
          }
        });
        return filtered;
      };

      const payload = {
        ...settings,
        deliveryRadius: Number(settings.deliveryRadius) || 0,
        workingHours: cleanNested(settings.workingHours),
        socials: cleanNested(settings.socials)
      };

      const response = await api.put('/site-settings/info/', payload);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Settings updated successfully!");
        setSettings(response.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      console.error("Backend Error Details:", errorData);
      
      if (errorData && typeof errorData === 'object') {
        const firstError = Object.entries(errorData)[0];
        toast.error(`Error in ${firstError[0]}: ${firstError[1]}`);
      } else {
        toast.error("Failed to update settings. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  return {
    settings,
    isLoading,
    isSaving,
    isLocating,
    handleChange,
    handleNestedChange,
    handleGetCurrentLocation,
    saveSettings
  };
};