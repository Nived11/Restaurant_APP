import { useRef, useState } from "react";
import { RiFlashlightFill, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const comboData = [
  { id: 1, name: "Party Bundle", items: "2 Pizzas + 2 Sides + 1.25L Coke", price: 899, originalPrice: 1250, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Weekend Smasher", items: "2 Burgers + Fries + 2 Drinks", price: 549, originalPrice: 720, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Family Feast", items: "1 Large Pizza + 6 Wings + Breadsticks", price: 799, originalPrice: 1050, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Snack Box", items: "Large Popcorn + 2 Dips + Large Coke", price: 399, originalPrice: 550, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400" }
];

const ComboSection = () => {
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
          
          {/* Left Arrow Button Overlay */}
          <div className={`hidden md:flex absolute left-[-10px] top-0 z-20 h-full w-32 items-center justify-start bg-gradient-to-r from-gray-50 via-gray-50/40 to-transparent transition-opacity duration-300 pointer-events-none ${showLeftArrow ? "opacity-100" : "opacity-0"}`}>
            <button 
              onClick={() => scroll("left")} 
              className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90"
            >
              <RiArrowLeftSLine size={24} className="text-black" />
            </button>
          </div>

          {/* Right Arrow Button Overlay */}
          <div className="hidden md:flex absolute right-[-10px] top-0 z-20 h-full w-32 items-center justify-end bg-gradient-to-l from-gray-50 via-gray-50/40 to-transparent pointer-events-none">
            <button 
              onClick={() => scroll("right")} 
              className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90"
            >
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

            {comboData.map((combo) => (
              <div 
                key={combo.id} 
                className="snap-start min-w-[310px] md:min-w-[440px] bg-white rounded-[2rem] p-3 md:p-4 flex gap-4 md:gap-6 shadow-sm border border-gray-100 group/item items-center"
              >
                {/* Responsive Image Container */}
                <div className="relative shrink-0 w-28 h-28 md:w-36 md:h-40 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-inner bg-gray-100">
                  <img 
                    src={combo.img} 
                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                    alt={combo.name}
                  />
                  <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-black text-[7px] md:text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-sm">
                    Save ₹{combo.originalPrice - combo.price}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col justify-center flex-1 min-w-0 py-1">
                  <div>
                    <h4 className="font-black text-sm md:text-xl uppercase text-gray-900 truncate tracking-tight">
                      {combo.name}
                    </h4>
                    <p className="text-[9px] md:text-xs text-gray-500 font-bold mt-1 md:mt-2 uppercase line-clamp-2 leading-tight">
                      {combo.items}
                    </p>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl md:text-2xl font-black text-black">₹{combo.price}</span>
                      <span className="text-[10px] md:text-sm text-gray-400 line-through font-bold">₹{combo.originalPrice}</span>
                    </div>
                    
                    <button className="w-full bg-black text-white py-2.5 md:py-3 rounded-xl text-[9px] md:text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all active:scale-95 shadow-lg shadow-black/5">
                      <RiFlashlightFill size={16} className="text-primary group-hover/item:text-black" />
                      Grab Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="shrink-0 w-8 md:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboSection;