import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState({
    coords: null,
    placeName: "Locating...",
    isServiceable: true,
    error: null,
  });

  // റെസ്റ്റോറന്റിന്റെ ലൊക്കേഷൻ (ഇത് നിങ്ങളുടെ അഡ്മിൻ പാനലിൽ നിന്ന് വരുന്നതാകണം)
  const RESTAURANT_COORDS = { lat: 10.0159, lng: 76.3419 }; // ഉദാഹരണത്തിന് Kakkanad
  const MAX_DISTANCE_KM = 5; // 5 കിലോമീറ്റർ വരെ ഡെലിവറി

  // രണ്ട് ലൊക്കേഷനുകൾ തമ്മിലുള്ള ദൂരം കാണാനുള്ള ഫങ്ക്ഷൻ (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // ഭൂമിയുടെ ആരം (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchPlaceName = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      const data = await res.json();
      const district = data.localityInfo?.administrative.find(l => l.order === 4)?.name.replace(/ district/gi, "") || "";
      return `${data.locality || data.city}, ${district}`;
    } catch (err) { return "Location Found"; }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationData(prev => ({ ...prev, error: "Not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const name = await fetchPlaceName(latitude, longitude);
      
      const distance = calculateDistance(latitude, longitude, RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng);
      
      setLocationData({
        coords: { latitude, longitude },
        placeName: name,
        isServiceable: distance <= MAX_DISTANCE_KM,
        error: null
      });
    }, (err) => {
      setLocationData(prev => ({ ...prev, error: "Denied", placeName: "Location Denied" }));
    });
  }, []);

  return locationData;
};