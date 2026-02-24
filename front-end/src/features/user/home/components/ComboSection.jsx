import React, { useRef, useState } from "react";
import { RiFlashlightFill, RiArrowLeftSLine, RiArrowRightSLine, RiInboxLine } from "react-icons/ri";

// --- Skeleton Loading Component ---
const SkeletonCombo = () => (
  <div className="snap-start min-w-[310px] md:min-w-[440px] bg-slate-50 rounded-[2rem] p-3 md:p-4 flex gap-4 md:gap-6 animate-pulse items-center">
    <div className="shrink-0 w-28 h-28 md:w-36 md:h-40 bg-slate-200 rounded-[1.5rem] md:rounded-[2rem]" />
    <div className="flex-1 space-y-3">
      <div className="h-5 w-3/4 bg-slate-200 rounded" />
      <div className="h-3 w-full bg-slate-200 rounded" />
      <div className="h-8 w-1/2 bg-slate-200 rounded mt-4" />
    </div>
  </div>
);

const ComboSection = ({ data: combos = [], loading }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScrollState = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <div className="h-8 w-48 bg-slate-100 rounded mb-8" />
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {[1, 2, 3].map((n) => <SkeletonCombo key={n} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap text-gray-900">
            Combo <span className="text-primary underline decoration-black/5">Deals</span>
          </h2>
          <div className="h-[2px] w-full bg-gray-200/60" />
        </div>

        <div className="relative group">
          
          {/* Left Arrow */}
          <div className={`hidden md:flex absolute left-[-10px] top-0 z-20 h-full w-32 items-center justify-start bg-gradient-to-r from-white via-white/40 to-transparent transition-opacity duration-300 pointer-events-none ${showLeftArrow ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => scroll("left")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90">
              <RiArrowLeftSLine size={24} className="text-black" />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="hidden md:flex absolute right-[-10px] top-0 z-20 h-full w-32 items-center justify-end bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none">
            <button onClick={() => scroll("right")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90">
              <RiArrowRightSLine size={24} className="text-black" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScrollState}
            className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory px-2 scroll-smooth"
          >
            <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

            {combos.length > 0 ? (
              combos.map((combo) => {
                const actual = parseFloat(combo.actual_price);
                const offer = parseFloat(combo.offer_price);
                const savings = Math.round(actual - offer);

                return (
                  <div 
                    key={combo.id} 
                    className="snap-start min-w-[310px] md:min-w-[440px] bg-white rounded-[2rem] p-3 md:p-4 flex gap-4 md:gap-6 shadow-sm border border-gray-100 group/item items-center"
                  >
                    <div className="relative shrink-0 w-28 h-28 md:w-36 md:h-40 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-inner bg-gray-100">
                      <img 
                        src={combo.image} 
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                        alt={combo.name}
                      />
                      {savings > 0 && (
                        <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-black text-[7px] md:text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-sm">
                          Save ₹{savings}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center flex-1 min-w-0 py-1">
                      <div>
                        <h4 className="font-black text-sm md:text-xl uppercase text-gray-900 truncate tracking-tight">
                          {combo.name}
                        </h4>
                        <p className="text-[9px] md:text-xs text-gray-500 font-bold mt-1 md:mt-2 uppercase line-clamp-2 leading-tight">
                          {combo.description}
                        </p>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-xl md:text-2xl font-black text-black">₹{Math.round(offer)}</span>
                          {actual > offer && (
                            <span className="text-[10px] md:text-sm text-gray-400 line-through font-bold">₹{Math.round(actual)}</span>
                          )}
                        </div>
                        
                        <button className="w-full bg-black text-white py-2.5 md:py-3 rounded-xl text-[9px] md:text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all active:scale-95 shadow-lg shadow-black/5">
                          <RiFlashlightFill size={16} className="text-primary group-hover/item:text-black" />
                          Grab Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="min-w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                 <RiInboxLine size={32} className="text-gray-200 mb-2" />
                 <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">No Combo Deals Available</p>
              </div>
            )}
            <div className="shrink-0 w-8 md:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboSection;