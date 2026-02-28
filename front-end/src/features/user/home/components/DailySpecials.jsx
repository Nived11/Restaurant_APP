import React from "react";
import { RiFireFill, RiInboxLine } from "react-icons/ri";

const DailySpecials = ({ data: specials = [], onItemClick }) => {
  if (specials.length === 0) return null;

  return (
    <section className="py-0 md:py-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-start gap-2 mb-6 md:mb-10">
          <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-gray-900">
            Today's <span className="text-orange-600">Hot</span> Specials
          </h2>
        </div>

        {specials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specials.map((item) => {
              const actual = parseFloat(item.actual_price);
              const offer = parseFloat(item.offer_price);
              let discountPercent = 0;
              
              if (actual > offer) {
                discountPercent = Math.round(((actual - offer) / actual) * 100);
              }

              return (
                <div 
                  key={item.id} 
                  onClick={() => onItemClick?.(item)}
                  className="relative h-52 md:h-64 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Floating Discount Tag */}
                  {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 z-10 bg-orange-600 text-white text-[8px] md:text-[10px] font-black px-2 py-1  rounded-2xl shadow-lg">
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 md:p-6 flex flex-col justify-end">
                    
                    <div className="mb-2">
                      <h3 className="text-white text-base md:text-xl font-black leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-[9px] md:text-xs font-medium line-clamp-1 opacity-90">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-3">
                      <div className="flex flex-col">
                        {actual > offer && (
                          <span className="text-gray-400 text-[9px] md:text-[11px] line-through font-bold">
                            ₹{Math.round(actual)}
                          </span>
                        )}
                        <span className="text-primary text-lg md:text-2xl font-black leading-none">
                          ₹{Math.round(offer)}
                        </span>
                      </div>
                      
                      <button className="bg-white text-black px-4 py-2 md:px-5 md:py-2 rounded-xl text-[9px] md:text-[11px] font-black hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-md">
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