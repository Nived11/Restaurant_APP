export const fetchLocationDetails = async (lat, lon) => {
  if (!lat || !lon) return null;
  
  try {
    const TOKEN = import.meta.env.VITE_LOCATION_IQ_TOKEN;
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${TOKEN}&lat=${lat}&lon=${lon}&format=json`
    );
    
    if (!response.ok) return null;
    const data = await response.json();
    const addr = data.address;

    const place = addr.town || addr.village || addr.suburb || addr.city_district || "";
    
    const subDistrict = addr.county || "";

    const district = addr.state_district || addr.city || addr.district || "";

    const state = addr.state || "";

    const pincode = addr.postcode || "";

    const addressParts = [place, subDistrict, district, state]
      .map(item => item?.replace(/\s*(taluk|district)\s*/gi, "").trim())
      .filter(Boolean);

    const finalAddress = [...new Set(addressParts)].join(", ");

    return {
      formattedAddress: finalAddress || data.display_name,
      pincode: pincode
    };

  } catch (error) {
    console.error("LocationIQ Error:", error);
    return null;
  }
};