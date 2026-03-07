// locationActions.js
import { setLocation, setChecking, setErrorPopup } from '../redux/locationSlice';
import { fetchLocationDetails } from '../utils/addressHelper';
import api from '../api/axios'; 

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
    if (!isSilent) dispatch(setChecking(true));
    const minimumDelay = isSilent ? Promise.resolve() : new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const [response] = await Promise.all([
            api.get(`/site-settings/info/?t=${new Date().getTime()}`),
            minimumDelay
        ]);

        const { workingHours, isOpen } = response.data;
        const currentLoc = getState().location.currentLocation;

        dispatch(setLocation({
            ...currentLoc,
            workingHours,
            isOpen // Redux-ലേക്ക് അയക്കുന്നു
        }));

        if (isOpen === false && showPopup) {
            dispatch(setErrorPopup({
                message: `Sorry, we are currently closed. We'll be back soon!`,
                workingHours,
                isOpen
            }));
            return "CLOSED";
        }
        return "OPEN";
    } catch (error) {
        dispatch(setChecking(false));
        return "ERROR";
    }
};
export const handleLocationUpdate = (lat, lng, isBackground = false) => async (dispatch) => {
    try {
        const response = await api.get(`/site-settings/info/?t=${new Date().getTime()}`);
        const settings = response.data;
        
        // ബാക്കെൻഡ് തരുന്ന എല്ലാ പ്രധാന ഡാറ്റയും എടുക്കുന്നു
        const { 
            latitude: SHOP_LAT, 
            longitude: SHOP_LNG, 
            deliveryRadius: MAX_RADIUS, 
            workingHours,
            isOpen 
        } = settings;

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

        // 1. ആദ്യം ഷോപ്പ് തുറന്നിട്ടുണ്ടോ എന്ന് നോക്കുന്നു
        if (isOpen === false) {
            if (!isBackground) {
                dispatch(setErrorPopup({
                    message: `Sorry, we are currently closed. We'll be back soon!`,
                    workingHours
                }));
            }
            return "CLOSED";
        }

        // 2. രണ്ടാമത് ഡെലിവറി റേഞ്ച് നോക്കുന്നു
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