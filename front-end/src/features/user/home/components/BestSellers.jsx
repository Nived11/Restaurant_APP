import React from "react";
import { RiAddLine, RiInboxLine } from "react-icons/ri";


const BestSellers = ({ data: bestSellers = [] }) => {
  

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-gray-900">
              Our <span className="text-primary">Best</span> Sellers
            </h2>
            <div className="h-1 w-10 bg-primary mt-1 rounded-full" />
          </div>
          <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Community Favorites
          </p>
        </div>

        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
            {bestSellers.map((item) => {
              // --- Discount Percentage Calculation ---
              const actual = parseFloat(item.actual_price);
              const offer = parseFloat(item.offer_price);
              let discountPercent = 0;
              if (actual > offer) {
                discountPercent = Math.round(((actual - offer) / actual) * 100);
              }

              return (
                <div key={item.id} className="group will-change-transform">
                  
                  {/* Image Container */}
                  <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-gray-50 mb-3 md:mb-5 shadow-sm transform-gpu">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500 ease-out" 
                    />

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-3 left-3 md:top-5 md:left-5">
                        <span className="bg-primary text-black text-[9px] md:text-[11px] font-black px-2 md:px-3 py-1 rounded-lg shadow-lg uppercase">
                          {discountPercent}% OFF
                        </span>
                      </div>
                    )}
                    
                    {/* + Plus Button */}
                    <button className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-white/90 backdrop-blur-md text-black size-8 md:size-12 cursor-pointer rounded-md md:rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 md:hover:bg-primary active:scale-90 z-10">
                      <RiAddLine size={24} className="md:size-8 font-bold" />
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="px-1">
                    <h3 className="font-black text-gray-900 text-[14px] md:text-lg leading-tight mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium line-clamp-1 mb-2">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-col">
                      {actual > offer && (
                        <span className="text-gray-400 text-[10px] md:text-xs line-through font-bold">
                          ₹{Math.round(actual)}
                        </span>
                      )}
                      <span className="font-black text-black text-base md:text-xl leading-none">
                        ₹{Math.round(offer)}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
             <RiInboxLine size={40} className="text-gray-200 mb-2" />
             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No Best Sellers Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;