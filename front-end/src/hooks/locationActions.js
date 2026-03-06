import { setLocation, setChecking, setErrorPopup } from '../redux/locationSlice';
import { fetchLocationDetails } from '../utils/addressHelper';
import api from '../api/axios'; 

const isStoreOpen = (workingHours) => {
    if (!workingHours) return true;
    const now = new Date();
    const day = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const match = timeStr.trim().match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
        if (!match) return 0;
        
        let [_, hours, minutes, modifier] = match;
        hours = parseInt(hours);
        minutes = minutes ? parseInt(minutes) : 0;
        
        if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
        if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
    };

    try {
        const hoursStr = day === 0 ? workingHours.sunday : workingHours.weekdays;
        if (!hoursStr || hoursStr.toLowerCase() === "closed") return false;
        
        const [startStr, endStr] = hoursStr.split("-").map(s => s.trim());
        const startTime = parseTime(startStr);
        const endTime = parseTime(endStr);
        
        return currentTime >= startTime && currentTime < endTime;
    } catch (e) {
        return true; 
    }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const checkInitialStatus = (isSilent = false, showPopup = true) => async (dispatch, getState) => {
    if (!isSilent) {
        dispatch(setChecking(true));
    }
    
    const minimumDelay = isSilent ? Promise.resolve() : new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const [response] = await Promise.all([
            api.get(`/site-settings/info/?t=${new Date().getTime()}`),
            minimumDelay
        ]);

        const { workingHours } = response.data;
        
        if (workingHours) {
            const currentLoc = getState().location.currentLocation;
            dispatch(setLocation({
                ...currentLoc,
                workingHours: workingHours
            }));
        }

        if (!isStoreOpen(workingHours)) {
            if (showPopup) {
                dispatch(setErrorPopup({
                    message: `Sorry, we are currently closed. We'll be back soon!`,
                    workingHours
                }));
            }
            return "CLOSED";
        }

        return "OPEN";
    } catch (error) {
        console.error("Status check failed", error);
        dispatch(setChecking(false));
        return "ERROR";
    }
};

export const handleLocationUpdate = (lat, lng, isBackground = false) => async (dispatch) => {
    try {
        const response = await api.get(`/site-settings/info/?t=${new Date().getTime()}`);
        const settings = response.data;
        const { latitude: SHOP_LAT, longitude: SHOP_LNG, deliveryRadius: MAX_RADIUS, workingHours } = settings;

        const details = await fetchLocationDetails(lat, lng);
        const distance = calculateDistance(lat, lng, SHOP_LAT, SHOP_LNG);
        const isDeliverable = distance <= MAX_RADIUS;

        const locationData = {
            address: details.formattedAddress,
            lat, lng,
            pincode: details.pincode,
            workingHours 
        };

        dispatch(setLocation(locationData));

        if (!isDeliverable) {
            if (!isBackground) {
                dispatch(setErrorPopup(`Delivery is not available in your area.`));
            }
            return false; 
        }
        
        return true;
    } catch (error) {
        console.error("Location Update Failed", error);
        return false;
    } finally {
        dispatch(setChecking(false));
    }
};