import React from "react";
import { RiFireFill, RiInboxLine } from "react-icons/ri";



const DailySpecials = ({ data: specials = []}) => {
  
  if (specials.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        <div className="flex items-center justify-start gap-2 md:gap-3 mb-6 md:mb-10">
          <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
          <h2 className="text-lg md:text-3xl font-black uppercase tracking-tight text-gray-900">
            Today's <span className="text-orange-600">Hot</span> Specials
          </h2>
          <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
        </div>

        {specials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {specials.map((item) => {
              // --- Discount Percentage Calculation ---
              const actual = parseFloat(item.actual_price);
              const offer = parseFloat(item.offer_price);
              let discountPercent = 0;
              
              if (actual > offer) {
                discountPercent = Math.round(((actual - offer) / actual) * 100);
              }

              return (
                <div 
                  key={item.id} 
                  className="relative h-56 md:h-72 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-md"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 md:p-6 flex flex-col justify-end">
                    
                    {/* Display calculated discount */}
                    {discountPercent > 0 && (
                      <span className="bg-primary text-black text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full w-fit mb-2 tracking-widest uppercase">
                        {discountPercent}% OFF
                      </span>
                    )}

                    <h3 className="text-white text-lg md:text-2xl font-black leading-tight mb-0.5 md:mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-[10px] md:text-sm font-medium line-clamp-1 mb-3 md:mb-4">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center border-t border-white/10 pt-3 md:pt-4">
                      <div className="flex flex-col">
                        {actual > offer && (
                          <span className="text-gray-400 text-[10px] md:text-xs line-through font-bold">
                            ₹{Math.round(actual)}
                          </span>
                        )}
                        <span className="text-primary text-xl md:text-2xl font-black leading-none">
                          ₹{Math.round(offer)}
                        </span>
                      </div>
                      <button className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black hover:bg-primary transition-all active:scale-95">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-[2rem]">
            <RiInboxLine size={48} className="text-slate-300 mb-4" />
            <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest">
              No Specials Today
            </h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">
              Check back later for exciting daily deals
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailySpecials;