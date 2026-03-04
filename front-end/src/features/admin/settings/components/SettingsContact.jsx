import React, { useEffect, useState } from 'react';
import { Building2, Mail, Phone, MapPin, Loader2, LocateFixed, Navigation2, Lock, Unlock, Search, X } from 'lucide-react';
import EditableField from './EditableField';
import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchLocationDetails } from '../../../../utils/addressHelper';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
};

const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

const SettingsContact = ({ settings, handleChange, isLocating, handleGetCurrentLocation, isEditingMode }) => {

  const isMapLocked = !isEditingMode;

  const defaultLat = 11.2588; 
  const defaultLng = 75.7804;
  
  const currentLat = settings?.latitude ? parseFloat(settings.latitude) : defaultLat;
  const currentLng = settings?.longitude ? parseFloat(settings.longitude) : defaultLng;

  const radiusInMeters = (parseFloat(settings?.deliveryRadius) || 0) * 1000;

  // ✅ Search State Variables
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ LocationIQ Search Function
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim().length < 3) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const TOKEN = import.meta.env.VITE_LOCATION_IQ_TOKEN;
        // LocationIQ Search API
        const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${TOKEN}&q=${searchQuery}&format=json&addressdetails=1&limit=5`);
        
        if (response.ok) {
          const data = await response.json();
          setSearchResults(Array.isArray(data) ? data : []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce to prevent too many API calls while typing
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // ✅ Handle selecting a location from search results
  const handleSelectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    handleChange('latitude', lat);
    handleChange('longitude', lon);
    handleChange('address', result.display_name); // Set the full address
    
    setSearchQuery(result.display_name); // Update search box with selected address
    setShowDropdown(false);
  };

  const handleMapClick = async (lat, lng) => {
    if (isMapLocked) return;

    handleChange('latitude', lat);
    handleChange('longitude', lng);
    
    try {
      const locationData = await fetchLocationDetails(lat, lng);
      if (locationData && locationData.formattedAddress) {
        handleChange('address', locationData.formattedAddress);
        setSearchQuery(""); // Clear search box when map is clicked
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
            <Building2 size={20} />
          </div>
          Contact & Location
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {isEditingMode ? "Editing mode active: You can modify map and details." : "View mode: Click 'Edit Settings' button above to make changes."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <EditableField icon={Building2} label="Restaurant Name" value={settings?.appName} onChange={(val) => handleChange('appName', val)} disabled={!isEditingMode} />
          <EditableField icon={Mail} label="Email Address" value={settings?.email} onChange={(val) => handleChange('email', val)} disabled={!isEditingMode} />
          <EditableField icon={Phone} label="Phone Number" value={settings?.phone} onChange={(val) => handleChange('phone', val)} disabled={!isEditingMode} />
        </div>

        <div className="md:col-span-2 mt-4 space-y-4">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Pinpoint Location (Search or Click on map)
          </label>
          
          <div className="relative w-full h-[450px] bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-sm z-0">
            
            {/* ✅ SEARCH BAR OVERLAY */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] z-[600]">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a place, city, or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isMapLocked}
                  className="w-full h-12 pl-11 pr-10 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f9a602] focus:border-transparent text-sm font-semibold text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                
                {searchQuery && !isMapLocked && (
                  <button 
                    onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
                  >
                    <X size={14} />
                  </button>
                )}
                
                {isSearching && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <Loader2 size={16} className="animate-spin text-[#f9a602]" />
                  </div>
                )}
              </div>

              {/* ✅ SEARCH RESULTS DROPDOWN */}
              {showDropdown && searchResults.length > 0 && !isMapLocked && (
                <ul className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-[600] max-h-60 overflow-y-auto animate-in slide-in-from-top-2">
                  {searchResults.map((result, index) => (
                    <li 
                      key={index}
                      onClick={() => handleSelectSearchResult(result)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 flex items-start gap-3 transition-colors"
                    >
                      <MapPin size={16} className="text-[#f9a602] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{result.display_name.split(',')[0]}</p>
                        <p className="text-xs font-medium text-gray-500 line-clamp-1">{result.display_name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Glass layer protection when map is locked */}
            {isMapLocked && (
              <div className="absolute inset-0 z-[500] bg-white/10 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300">
                <div className="bg-black/70 text-white px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-2xl pointer-events-none border border-white/20">
                  <Lock size={14} className="text-[#f9a602]" /> Map is locked. Enable edit mode to search or change location.
                </div>
              </div>
            )}

            <MapContainer 
              center={[currentLat, currentLng]} 
              zoom={13} 
              style={{ height: '100%', width: '100%', zIndex: 10 }}
              dragging={!isMapLocked}
              scrollWheelZoom={!isMapLocked}
              doubleClickZoom={!isMapLocked}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              
              {settings?.latitude && settings?.longitude && (
                <>
                  <Marker position={[currentLat, currentLng]} />
                  {radiusInMeters > 0 && (
                    <Circle 
                      center={[currentLat, currentLng]} 
                      radius={radiusInMeters} 
                      pathOptions={{ color: '#f9a602', fillColor: '#f9a602', fillOpacity: 0.15, weight: 2 }} 
                    />
                  )}
                </>
              )}
              
              <MapUpdater lat={settings?.latitude} lng={settings?.longitude} />
              <MapEvents onMapClick={handleMapClick} />
            </MapContainer>

            <div className="absolute bottom-6 right-6 z-[400]">
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating || isMapLocked}
                className="w-[45px] h-[45px] bg-white rounded-xl shadow-xl flex items-center justify-center hover:bg-gray-50 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-gray-100"
              >
                {isLocating ? <Loader2 size={20} className="animate-spin text-[#f9a602]" /> : <LocateFixed size={22} className="text-[#333]" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-2">
            <div className={`bg-gray-50 border border-gray-200 rounded-3xl p-5 flex items-start gap-4 shadow-sm transition-all duration-300 ${!isMapLocked ? 'hover:bg-white hover:shadow-md ring-2 ring-[#f9a602]/5' : 'opacity-80'}`}>
              <div className="bg-[#f9a602]/10 p-3 rounded-2xl shrink-0">
                <MapPin size={26} className="text-[#f9a602]" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Selected Map Location
                </p>
                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  {settings?.address ? settings.address : "Location not selected. Search or click on the map."}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <EditableField 
                icon={Navigation2} 
                label="Maximum Delivery Radius (in KM)" 
                value={settings?.deliveryRadius} 
                onChange={(val) => handleChange('deliveryRadius', val)} 
                placeholder="E.g., 5"
                disabled={!isEditingMode}
              />
              <p className="text-[10px] text-gray-400 mt-3 pl-2 font-medium">
                {isEditingMode ? "Changing this value will live-update the orange circle on the map." : "Deliveries are restricted within the orange area shown above."}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SettingsContact;