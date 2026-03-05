import { setLocation, setChecking, setErrorPopup } from '../redux/locationSlice';
import { fetchLocationDetails } from '../utils/addressHelper';
import api from '../api/axios'; 
import { extractErrorMessages } from '../utils/extractErrorMessages'; 

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

export const handleLocationUpdate = (lat, lng) => async (dispatch) => {
    dispatch(setChecking(true));
    try {
        const response = await api.get('/site-settings/info/');
        const { 
            latitude: SHOP_LAT, 
            longitude: SHOP_LNG, 
            deliveryRadius: MAX_RADIUS 
        } = response.data;

        const details = await fetchLocationDetails(lat, lng);
        
        const distance = calculateDistance(lat, lng, SHOP_LAT, SHOP_LNG);
        const isDeliverable = distance <= MAX_RADIUS;

        const locationData = {
            address: details.formattedAddress,
            lat, 
            lng,
            pincode: details.pincode
        };

        dispatch(setLocation(locationData));

        if (isDeliverable) {
            return true;
        } else {
            dispatch(setErrorPopup(`Delivery is not available in your area.`));
            return false;
        }

    } catch (error) {
        const errorMessage = extractErrorMessages(error) || "Unable to verify delivery area.";
        dispatch(setErrorPopup(errorMessage));
        return false;
    } finally {
        dispatch(setChecking(false));
    }
};