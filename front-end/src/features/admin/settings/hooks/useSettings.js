import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../../../../api/axios'; 
import { fetchLocationDetails } from '../../../../utils/addressHelper';
// ✅ Import your exact error extractor function
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    appName: "", email: "", phone: "", address: "", 
    latitude: null, longitude: null, deliveryRadius: 0,
    footerDescription: "",
    workingHours: { weekdays: "", sunday: "" },
    socials: { instagram: "", facebook: "", twitter: "", whatsapp: "" }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await api.get('/site-settings/info/');
      if (response.data) setSettings(prev => ({ ...prev, ...response.data }));
    } catch (error) {
      // ✅ Using your extractor function here
      const errorMessage = extractErrorMessages(error);
      toast.error(errorMessage);
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

  const truncateCoordinate = (coord) => {
    if (coord === null || coord === undefined || coord === "") return null;
    return Number(Number(coord).toFixed(6));
  };

  const saveSettings = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading("Saving settings...");

    try {
      const cleanNested = (obj) => {
        const filtered = {};
        Object.keys(obj || {}).forEach(key => {
          if (obj[key] && String(obj[key]).trim() !== "") filtered[key] = obj[key];
        });
        return filtered;
      };

      const payload = {
        ...settings,
        deliveryRadius: Number(settings.deliveryRadius) || 0,
        latitude: truncateCoordinate(settings.latitude),
        longitude: truncateCoordinate(settings.longitude),
        workingHours: cleanNested(settings.workingHours),
        socials: cleanNested(settings.socials)
      };

      const response = await api.put('/site-settings/info/', payload);
      
      if (response.status === 200 || response.status === 201) {
        setSettings(prev => ({ ...prev, ...response.data }));
        toast.success("Settings saved successfully! ✅", { id: toastId });
      }
    } catch (error) {
      const errorMessage = extractErrorMessages(error);
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  const handleGetCurrentLocation = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          handleChange('latitude', lat);
          handleChange('longitude', lng);
          try {
            const locationData = await fetchLocationDetails(lat, lng);
            if (locationData && locationData.formattedAddress) {
              handleChange('address', locationData.formattedAddress);
            }
          } catch (error) {
            console.error("Address fetch error", error);
          }
          toast.success("Location fetched!");
          setIsLocating(false);
        },
        () => {
          toast.error("Location access denied.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [settings]);

  return {
    settings, isLoading, isSaving, isLocating, 
    handleChange, handleNestedChange, handleGetCurrentLocation, saveSettings
  };
};  