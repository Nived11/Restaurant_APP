import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Type, MousePointerClick, Globe, AlignLeft, Monitor, Smartphone, Move, ZoomIn, ZoomOut } from 'lucide-react';

const BannerFormModal = ({ isOpen, onClose, isEditing, newBanner, handleInputChange, handleImageUpload, saveBanner }) => {
  if (!isOpen) return null;

  const [activeDevice, setActiveDevice] = useState('desktop'); 
  const [zoomLevel, setZoomLevel] = useState(1);
  const [positions, setPositions] = useState({ mobile: { x: 0, y: 0 }, desktop: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.type === 'mousedown' && e.button !== 0) return;
    setIsDragging(true);
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - positions[activeDevice].x, y: clientY - positions[activeDevice].y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    setPositions(prev => ({ ...prev, [activeDevice]: { x: clientX - dragStart.x, y: clientY - dragStart.y } }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const getCurrentImage = () => {
    if (activeDevice === 'desktop') return newBanner.imageDesktop || newBanner.image;
    return newBanner.imageMobile || newBanner.image;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden">
       
       <div className="bg-white w-full h-[100dvh] md:h-[90vh] md:rounded-[2rem] md:max-w-7xl overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
          
          <button onClick={onClose} className="lg:hidden absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-md text-gray-800"><X size={20} /></button>

          {/* --- LEFT: PREVIEW SECTION --- */}
          <div className="w-full lg:w-7/12 bg-[#1a1a1a] flex flex-col relative select-none shrink-0 h-[45vh] lg:h-auto border-r border-gray-800" 
               onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchEnd={handleMouseUp}>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

             {/* Device Tabs */}
             <div className="flex items-center justify-center gap-3 p-3 lg:p-6 z-20">
                <DeviceTab icon={<Monitor size={14}/>} label="Desktop" isActive={activeDevice === 'desktop'} onClick={() => { setActiveDevice('desktop'); setZoomLevel(1); }} />
                <DeviceTab icon={<Smartphone size={14}/>} label="Mobile" isActive={activeDevice === 'mobile'} onClick={() => { setActiveDevice('mobile'); setZoomLevel(1); }} />
             </div>

             {/* Preview Frame Container */}
             <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-10 overflow-hidden bg-[#111]">
                
                {/* FIXED: 
                   1. Changed 'w-full' to percentages for responsive scaling.
                   2. Added 'max-w-[90vw]' for mobile/tablet safety.
                   3. kept 'lg:max-w-[650px]' for large screens.
                */}
                <div className={`transition-all duration-500 bg-black shadow-2xl overflow-hidden relative border-4 border-gray-800 flex-shrink-0 mx-auto
                    ${activeDevice === 'mobile' ? 'h-[85%] aspect-[1/1] rounded-[1.5rem]' : ''} 
                    ${activeDevice === 'desktop' ? 'w-[95%] md:w-[90%] lg:w-full lg:max-w-[650px] aspect-[2.5/1] rounded-xl' : ''}
                `}>
                    <div 
                        className="w-full h-full relative cursor-move bg-gray-900" 
                        style={{ touchAction: 'none' }} 
                        onMouseDown={handleMouseDown} 
                        onMouseMove={handleMouseMove} 
                        onTouchStart={handleMouseDown} 
                        onTouchMove={handleMouseMove} 
                        onTouchEnd={handleMouseUp}
                    >
                        {getCurrentImage() ? (
                            <img 
                                src={getCurrentImage()} 
                                alt="Preview" 
                                className="max-w-none absolute origin-center min-w-full min-h-full object-cover"
                                style={{ 
                                    transform: `translate(${positions[activeDevice].x}px, ${positions[activeDevice].y}px) scale(${zoomLevel})` 
                                }} 
                                draggable={false} 
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                                <Upload size={32} className="mb-2 opacity-50"/>
                                <span className="text-[10px] font-bold opacity-50">Upload Image</span>
                            </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex flex-col justify-end pointer-events-none">
                            <h4 className={`font-black uppercase tracking-tighter text-white mb-1 drop-shadow-md ${activeDevice === 'mobile' ? 'text-lg' : 'text-xl lg:text-3xl'}`}>
                                {newBanner.title || "TITLE HERE"}
                            </h4>
                            <p className={`text-gray-300 uppercase font-bold mb-3 opacity-90 line-clamp-2 ${activeDevice === 'mobile' ? 'text-[9px]' : 'text-[10px] lg:text-sm'}`}>
                                {newBanner.subtitle || "Your banner description text."}
                            </p>
                            <span className="px-3 py-1.5 bg-[#f9a602] text-black text-[10px] font-black uppercase rounded-lg shadow-lg inline-block w-max">
                                {newBanner.buttonText || "BUTTON"}
                            </span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Zoom Controls */}
             <div className="flex justify-center gap-4 pb-4 lg:pb-6 z-20">
                 <button onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))} className="p-1.5 lg:p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 active:scale-95"><ZoomOut size={14}/></button>
                 <span className="text-gray-400 text-xs font-mono py-2">{Math.round(zoomLevel * 100)}%</span>
                 <button onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))} className="p-1.5 lg:p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 active:scale-95"><ZoomIn size={14}/></button>
             </div>
          </div>

          {/* --- RIGHT: FORM SECTION --- */}
          <div className="w-full lg:w-5/12 flex flex-col bg-[#F8F9FA] h-[55vh] lg:h-full overflow-hidden">
             <div className="px-5 py-3 lg:px-6 lg:py-5 bg-white border-b border-gray-200 flex justify-between items-center sticky top-0 z-30 shadow-sm shrink-0">
                <div>
                   <h2 className="text-base lg:text-xl font-black text-[#0A0A0A]">{isEditing ? "Edit Banner" : "New Banner"}</h2>
                   <p className="text-[10px] lg:text-xs text-gray-500 font-bold mt-0.5 uppercase tracking-wider">Configure slides & images</p>
                </div>
                <button onClick={onClose} className="hidden lg:block p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
             </div>

             <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6">
                
                {/* 1. UPLOAD SECTION */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                   <div className="flex items-center justify-between mb-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Upload Images</label>
                   </div>
                   
                   <div className="space-y-3">
                      <UploadRow 
                        label="Desktop (Landscape)" 
                        size="2000 x 800 px" 
                        isActive={activeDevice === 'desktop'}
                        hasImage={!!(newBanner.imageDesktop || newBanner.image)}
                        onClick={() => setActiveDevice('desktop')}
                        onUpload={(e) => handleImageUpload(e, 'desktop')}
                        icon={<Monitor size={18}/>}
                      />

                      <UploadRow 
                        label="Mobile (Portrait)" 
                        size="1000 x 1000 px" 
                        isActive={activeDevice === 'mobile'}
                        hasImage={!!newBanner.imageMobile}
                        onClick={() => setActiveDevice('mobile')}
                        onUpload={(e) => handleImageUpload(e, 'mobile')}
                        icon={<Smartphone size={18}/>}
                      />
                   </div>
                </div>

                {/* 2. TEXT FIELDS */}
                <div className="space-y-4">
                   <InputGroup label="Headline Title" icon={<Type size={16}/>}>
                      <input type="text" name="title" value={newBanner.title} onChange={handleInputChange} placeholder="e.g. CRAVE-WORTHY PIZZAS" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm focus:border-[#f9a602] outline-none"/>
                   </InputGroup>

                   <div className="grid grid-cols-2 gap-3">
                      <InputGroup label="Button Label" icon={<MousePointerClick size={16}/>}>
                         <input type="text" name="buttonText" value={newBanner.buttonText} onChange={handleInputChange} placeholder="GRAB NOW" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm focus:border-[#f9a602] outline-none"/>
                      </InputGroup>
                      <InputGroup label="Link URL" icon={<Globe size={16}/>}>
                         <input type="text" name="link" value={newBanner.link} onChange={handleInputChange} placeholder="/menu" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-sm focus:border-[#f9a602] outline-none"/>
                      </InputGroup>
                   </div>

                   <InputGroup label="Description" icon={<AlignLeft size={16}/>}>
                      <textarea name="subtitle" value={newBanner.subtitle} onChange={handleInputChange} placeholder="Description..." rows="3" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-sm focus:border-[#f9a602] outline-none resize-none"></textarea>
                   </InputGroup>
                </div>
                
                {/* Spacer */}
                <div className="h-10"></div>
             </div>

             <div className="p-4 lg:p-5 bg-white border-t border-gray-200 sticky bottom-0 z-30 flex gap-3 shrink-0">
                <button onClick={onClose} className="flex-1 py-3 lg:py-3.5 rounded-xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors text-xs lg:text-sm">Cancel</button>
                <button onClick={saveBanner} className="flex-[2] py-3 lg:py-3.5 rounded-xl font-bold bg-[#0A0A0A] text-white hover:bg-[#f9a602] hover:text-black transition-all shadow-lg flex items-center justify-center gap-2 text-xs lg:text-sm">
                   <CheckCircle2 size={18}/> {isEditing ? "Update Banner" : "Publish Banner"}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Sub Components ---
const DeviceTab = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all border ${isActive ? 'bg-[#f9a602] text-black border-[#f9a602]' : 'bg-transparent text-gray-500 border-gray-700 hover:text-white'}`}>
        {icon} {label}
    </button>
);

const InputGroup = ({ label, icon, children }) => (
    <div className="group"><label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-wide">{label}</label><div className="relative"><div className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#f9a602] transition-colors">{icon}</div>{children}</div></div>
);

const UploadRow = ({ label, size, isActive, hasImage, onClick, onUpload, icon }) => (
    <div onClick={onClick} className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${isActive ? 'border-[#f9a602] bg-[#f9a602]/5' : 'border-gray-100 hover:border-gray-200'}`}>
        <div className="flex items-center gap-3">
            <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${hasImage ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                {hasImage ? <CheckCircle2 size={18}/> : icon}
            </div>
            <div>
                <p className={`text-[10px] lg:text-xs font-bold uppercase ${isActive ? 'text-black' : 'text-gray-500'}`}>{label}</p>
                <p className="text-[9px] lg:text-[10px] text-gray-400">{size}</p>
            </div>
        </div>
        <div className="relative">
             <button className="px-3 py-1.5 bg-white border border-gray-200 text-[10px] font-bold rounded-lg shadow-sm hover:bg-gray-50">
                {hasImage ? 'Change' : 'Upload'}
             </button>
             <input type="file" accept="image/*" onChange={onUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
        </div>
    </div>
);

export default BannerFormModal;