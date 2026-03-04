import { setLocation, setChecking, setErrorPopup } from '../redux/locationSlice';
import { fetchLocationDetails } from '../utils/addressHelper';
import api from '../api/axios'; 
import { extractErrorMessages } from '../utils/extractErrorMessages'; 

// Distance calculate cheyyanulla Haversine Formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
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
        // --- 1. API Fetch using custom axios instance ---
        // End-point: /site-settings/info/
        const response = await api.get('/site-settings/info/');
        
        // Response-il ninnu shop settings edukkunnu
        const { 
            latitude: SHOP_LAT, 
            longitude: SHOP_LNG, 
            deliveryRadius: MAX_RADIUS 
        } = response.data;

        // --- 2. User-inte Address Details Fetch Cheyyunnu ---
        const details = await fetchLocationDetails(lat, lng);
        
        // --- 3. Distance Calculation ---
        const distance = calculateDistance(lat, lng, SHOP_LAT, SHOP_LNG);
        const isDeliverable = distance <= MAX_RADIUS;

        // --- 4. Update Redux State ---
        dispatch(setLocation({
            address: details.formattedAddress,
            lat, 
            lng,
            pincode: details.pincode
        }));

        if (isDeliverable) {
            return true;
        } else {
            // Delivery range-il allenkil dynamic message kaanikkunnu
            dispatch(setErrorPopup(`Delivery is not available in your area.`));
            return false;
        }

    } catch (error) {
        // --- 5. Error Extraction ---
        // Utils-ile extractError function upayogichu error message edukkunnu
        const errorMessage = extractErrorMessages(error) || "Unable to verify delivery area.";
        console.error("Location Logic Error:", errorMessage);
        
        dispatch(setErrorPopup(errorMessage));
        return false;
    } finally {
        dispatch(setChecking(false));
    }
};