import { useState, useEffect } from 'react';
import { Timer, MapPin, Lock, Unlock, Navigation2, Search, X, Loader2 } from 'lucide-react';
import EditableField from './EditableField';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => { if (center[0] && center[1]) map.flyTo(center, 15); }, [center, map]);
  return null;
};

const MapController = ({ onMapClick, locked }) => {
  const map = useMap();
  useEffect(() => {
    const controls = ['dragging', 'touchZoom', 'doubleClickZoom', 'scrollWheelZoom', 'boxZoom', 'keyboard'];
    controls.forEach(c => locked ? map[c].disable() : map[c].enable());
  }, [locked, map]);

  useMapEvents({ click: (e) => { if (!locked) onMapClick(e.latlng.lat, e.latlng.lng); } });
  return null;
};

const SettingsTimeMap = ({ 
  settings, handleChange, onSave, searchQuery, setSearchQuery, 
  searchResults, showDropdown, setShowDropdown, handleMapClick,
  getCurrentLocation, isLocating
}) => {
  const [mapLocked, setMapLocked] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  
  const currentPos = [
    parseFloat(settings?.latitude) || 11.25, 
    parseFloat(settings?.longitude) || 75.78
  ];

  const onMapInteraction = async (lat, lng) => {
    await handleMapClick(lat, lng, false);
    setHasChanges(true);
  };

  const handleCurrentLocationAction = async () => {
    await getCurrentLocation();
    setHasChanges(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. Time Section - UPDATED WITH type="time" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
        <EditableField 
            icon={Timer} 
            label="Opening Time" 
            type="time"
            value={settings?.openingTime} 
            onChange={(v) => handleChange('openingTime', v)} 
            onSave={onSave} 
        />
        <EditableField 
            icon={Timer} 
            label="Closing Time" 
            type="time"
            value={settings?.closingTime} 
            onChange={(v) => handleChange('closingTime', v)} 
            onSave={onSave} 
        />
      </div>

      <div className="space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Store Location</label>
          <div className="flex items-center gap-3">
            
            {/* Search Bar */}
            <div className="relative group">
              <div className={`flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-80 shadow-sm transition-all ${mapLocked ? 'opacity-50 cursor-not-allowed' : 'focus-within:ring-2 focus-within:ring-orange-200'}`}>
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  className="text-xs font-bold outline-none w-full disabled:bg-transparent" 
                  placeholder="Search address..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  disabled={mapLocked} 
                />
                {!mapLocked && searchQuery && <X size={16} className="cursor-pointer text-gray-400" onClick={() => setSearchQuery("")} />}
              </div>
              
              {showDropdown && searchResults.length > 0 && !mapLocked && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-2 rounded-2xl shadow-2xl z-[2000] max-h-60 overflow-y-auto">
                  {searchResults.map((res, i) => (
                    <button key={i} onClick={() => { 
                      onMapInteraction(parseFloat(res.lat), parseFloat(res.lon)); 
                      setSearchQuery(res.display_name); 
                      setShowDropdown(false); 
                    }} className="w-full text-left p-4 text-[11px] font-bold border-b border-gray-50 hover:bg-orange-50">
                      {res.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={() => setMapLocked(!mapLocked)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${mapLocked ? 'bg-gray-100 text-gray-600' : 'bg-[#f9a602] text-white shadow-lg'}`}>
              {mapLocked ? <><Lock size={14} /> UNLOCK TO EDIT</> : <><Unlock size={14} /> LOCK MAP</>}
            </button>
          </div>
        </div>

        {/* 2. Map Container */}
        <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-inner group">
          <MapContainer center={currentPos} zoom={15} zoomControl={false} attributionControl={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
            <ChangeMapView center={currentPos} />
            <MapController locked={mapLocked} onMapClick={onMapInteraction} />
            <Marker position={currentPos} />
            <Circle center={currentPos} radius={(parseFloat(settings?.deliveryRadius) || 0) * 1000} pathOptions={{ color: '#f9a602', fillOpacity: 0.1 }} />
          </MapContainer>

          {!mapLocked && (
            <button 
              onClick={handleCurrentLocationAction} 
              className="absolute bottom-6 right-6 z-[1000] bg-white p-3.5 rounded-2xl shadow-2xl border border-gray-100 text-[#f9a602] hover:scale-110 active:scale-95 transition-all"
            >
              {isLocating ? <Loader2 size={22} className="animate-spin" /> : <Navigation2 size={22} fill="currentColor" />}
            </button>
          )}
          
          {mapLocked && (
            <div className="absolute inset-0 z-[1001] bg-black/[0.02] pointer-events-none flex items-center justify-center">
               <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 border border-gray-100">
                  <Lock size={12} className="text-gray-400" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">View Only Mode</span>
               </div>
            </div>
          )}
        </div>

        {/* 3. Address & Save Button Section */}
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 rounded-2xl shrink-0"><MapPin className="text-[#f9a602]" size={22} /></div>
            <div>
              <p className="text-[10px] font-black text-[#f9a602] uppercase tracking-widest mb-1">Selected Address</p>
              <p className="text-sm font-bold text-gray-800 leading-snug">{settings?.address || "No address set"}</p>
            </div>
          </div>
          
          {hasChanges && (
            <button 
              onClick={() => { 
                onSave(); 
                setHasChanges(false); 
                setMapLocked(true); 
              }} 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg transition-all animate-pulse"
            >
              SAVE CHANGES
            </button>
          )}
        </div>

        {/* 4. Radius Field */}
        <EditableField 
          icon={Navigation2} 
          label="Service Radius (KM)" 
          value={settings?.deliveryRadius} 
          onChange={(val) => { 
            handleChange('deliveryRadius', val); 
            setHasChanges(true); 
          }} 
          onSave={onSave} 
        />
      </div>
    </div>
  );
};

export default SettingsTimeMap;