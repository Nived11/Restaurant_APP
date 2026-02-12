import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Smashed Burgers", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=300" },
  { name: "Woodfired Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300" },
  { name: "Coolers & Soda", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=300" },
  { name: "Hot Dogs", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300" },
  { name: "Crispy Tacos", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=300" },
  { name: "Sweet Treats", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=300" },
  { name: "Loaded Fries", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=300" },
  { name: "Fresh Salads", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300" },
  { name: "Baked Goods", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300" },
  { name: "Grilled Chicken", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=300" },
];

const CategorySection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 400;
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
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 leading-tight uppercase">
            What are you <span className="text-primary underline decoration-black/10">Craving?</span>
          </h2>
          <p className="text-gray-500 font-bold text-xs sm:text-sm uppercase tracking-widest mt-1">
            Handcrafted flavors delivered fast
          </p>
        </div>

        <div className="relative overflow-hidden md:overflow-visible">
          
          {/* Mobile Right-Side Gradient Only (Hidden on Desktop because desktop has its own button gradient) */}
          <div className="block md:hidden absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Left Arrow Button Overlay */}
          <div className={`hidden md:flex absolute left-0 md:left-[-2px] xl:left-[-4px] top-0 z-20 h-full w-24 items-center justify-start bg-gradient-to-r from-white via-white/40 to-transparent transition-opacity duration-300 pointer-events-none ${showLeftArrow ? "opacity-100" : "opacity-0"}`}>
            <button 
              onClick={() => scroll("left")} 
              className="cursor-pointer pointer-events-auto ml-1 p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90"
            >
              <ChevronLeft size={24} className="text-black" />
            </button>
          </div>

          {/* Right Arrow Button Overlay */}
          <div className="hidden md:flex absolute right-0 md:right-[-2px] xl:right-[-4px] top-0 z-20 h-full w-24 items-center justify-end bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none">
            <button 
              onClick={() => scroll("right")} 
              className="cursor-pointer pointer-events-auto mr-1 p-3 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-primary transition-all active:scale-90"
            >
              <ChevronRight size={24} className="text-black" />
            </button>
          </div>

          {/* Categories List */}
          <div 
            ref={scrollRef} 
            onScroll={handleScrollState} 
            className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 no-scrollbar after:content-[''] after:shrink-0 after:w-12 md:after:w-32"
          >
            <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

            {categories.map((cat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center shrink-0 cursor-pointer group snap-start py-2">
                
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-primary transition-all duration-300">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="mt-4 flex flex-col items-center justify-start">
                  <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider text-gray-700 group-hover:text-black transition-colors text-center leading-[1.1] 
                                   w-[70px] md:w-[90px] min-h-[2.2em] flex items-center justify-center">
                    {cat.name}
                  </span>
                </div>

                <motion.div className="h-1 w-0 bg-primary mt-1 rounded-full group-hover:w-1/2 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;