    import React, { useState } from 'react';
    import { useMenu } from '../hooks/useMenu';
    import { Search, Plus, SlidersHorizontal, X, ChevronDown, Check, Leaf, Flame } from 'lucide-react';

    const MenuPage = () => {
    const { 
        categories, 
        activeCategory, 
        setActiveCategory, 
        filterType, 
        setFilterType, 
        filteredItems 
    } = useMenu();

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // --- HELPER COMPONENT: SLIDING DIET TOGGLE ---
    const DietToggle = () => {
        
        // Calculate position based on selection
        const getSliderStyle = () => {
        switch (filterType) {
            case 'Veg': return 'translate-x-[100%]';
            case 'Non-Veg': return 'translate-x-[200%]';
            default: return 'translate-x-0'; // All
        }
        };

        return (
        <div className="relative bg-gray-100 p-1 rounded-full w-[300px] h-10 mx-auto grid grid-cols-3 items-center border border-gray-200">
            
            {/* The Sliding White Background (Animation Layer) */}
            <div 
            className={`absolute top-1 left-1 bottom-1 w-[calc(33.33%-5px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${getSliderStyle()}`}
            ></div>

            {/* Buttons (Transparent Layer on Top) */}
            {['All', 'Veg', 'Non-Veg'].map((type) => (
            <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`
                relative z-10 h-full rounded-full text-[10px] font-bold flex items-center justify-center gap-1.5 uppercase tracking-wide transition-colors duration-300
                ${filterType === type ? 'text-black' : 'text-gray-400 hover:text-gray-600'}
                `}
            >
                {/* Icons change color based on selection */}
                {type === 'Veg' && (
                <Leaf size={10} className={filterType === 'Veg' ? "text-green-600 fill-current" : "text-gray-400"} />
                )}

                {type === 'Non-Veg' && (
                <Flame size={10} className={filterType === 'Non-Veg' ? "text-red-600 fill-current" : "text-gray-400"} />
                )}

                {type}
            </button>
            ))}
        </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans pb-24 selection:bg-[var(--color-primary)] selection:text-black">
        
        {/* 1. Header & Controls */}
        <div className="bg-white/90 backdrop-blur-lg sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all">
            
            {/* Brand Name */}
            <div className="py-3 px-4 text-center border-b border-gray-50 md:border-none">
                <h1 className="text-xl md:text-3xl font-black tracking-tighter">
                MENU<span className="text-[var(--color-primary)]">.</span>
                </h1>
            </div>

            {/* --- DESKTOP VIEW CATEGORIES (Hidden on Mobile) --- */}
            <div className="hidden md:block container mx-auto px-4 pb-4">
                <div className="flex flex-col items-center gap-4">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300
                            ${activeCategory === cat 
                                ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }
                            `}
                        >
                            {cat}
                        </button>
                        ))}
                    </div>
                    
                    {/* Custom Diet Toggle (Sliding) */}
                    <DietToggle />
                </div>
            </div>

            {/* --- MOBILE VIEW CONTROL BAR (Visible only on Mobile) --- */}
            <div className="md:hidden px-4 py-3 flex justify-between items-center bg-white">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Browsing</span>
                    <div className="flex items-center gap-1">
                        <span className="text-lg font-black text-gray-900 leading-none truncate max-w-[150px]">{activeCategory}</span>
                        
                    </div>
                </div>
                <button 
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-md active:scale-95 transition-transform"
                >
                    <SlidersHorizontal size={14} />
                    Filters
                    {(filterType !== 'All' || activeCategory !== 'All') && (
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></span>
                    )}
                </button>
            </div>
        </div>

        {/* 2. Menu Grid */}
        <div className="container mx-auto px-3 md:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
            {filteredItems.map((item) => (
                <div key={item.id} className="group relative flex flex-col">
                
                {/* Image Card */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200">
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Badges on Image (Original Style) */}
                    <div className="absolute top-2 left-2 flex gap-1">
                        <div className="bg-white/95 backdrop-blur rounded px-1.5 py-1 shadow-sm flex items-center gap-1">
                            {item.isVeg ? (
                                <Leaf size={10} className="text-green-600 fill-current" />
                            ) : (
                                <Flame size={10} className="text-red-600 fill-current" />
                            )}
                        </div>
                    </div>

                    {/* Add Button */}
                    <button className="absolute bottom-2 right-2 h-8 w-8 md:h-9 md:w-9 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-primary)] hover:scale-110 transition-all active:scale-90 z-10 cursor-pointer">
                        <Plus size={18} strokeWidth={3} />
                    </button>
                </div>

                {/* Text Info */}
                <div className="mt-2 px-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{item.name}</h3>
                        <span className="text-xs md:text-sm font-black text-[var(--color-primary)] whitespace-nowrap">₹{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-[10px] font-medium mt-0.5 line-clamp-1">{item.category}</p>
                </div>
                </div>
            ))}
            </div>

            {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <Search size={32} className="mb-2" />
                <p className="text-sm font-medium">No items found</p>
            </div>
            )}
        </div>

        {/* --- MOBILE FILTER BOTTOM SHEET --- */}
        {showMobileFilters && (
            <div className="fixed inset-0 z-[60] mb-17 md:hidden">
                <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setShowMobileFilters(false)}
                ></div>

                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 animate-slide-up shadow-2xl flex flex-col max-h-[80vh]">
                    
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <h2 className="text-xl font-black">Filter Menu</h2>
                        <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto mb-4 scrollbar-hide">
                        {/* 1. Diet Filter using the SLIDING Toggle Style */}
                        <div className="mb-6 flex justify-center">
                        <DietToggle />
                        </div>

                        {/* 2. Categories Filter */}
                        <div className="mb-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</p>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors duration-200
                                        ${activeCategory === cat 
                                            ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]' 
                                            : 'bg-white text-gray-600 border-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 shrink-0">
                        <button 
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full py-3 bg-black text-white rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Apply Filters <Check size={16} />
                        </button>
                        <p className="text-center text-[10px] text-gray-400 mt-2">
                            Showing {filteredItems.length} items
                        </p>
                    </div>

                </div>
            </div>
        )}

        </div>
    )
    }

    export default MenuPage