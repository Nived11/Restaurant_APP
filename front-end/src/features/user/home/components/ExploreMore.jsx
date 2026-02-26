import React from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const ExploreMore = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10 md:py-16">
      <div className="relative h-56 md:h-72 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl group border border-white/10">
        
        {/* New High-Quality Food Image (Burger & Fries Close-up) */}
        <img 
          src="https://i.pinimg.com/736x/02/0a/a1/020aa191a471a7d5e6c3d393da575ed8.jpg" 
          alt="Explore Full Menu"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Gradient Overlay - Dark to Transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex flex-col md:flex-row items-center justify-between px-8 md:px-20 text-center md:text-left">
          
          <div className="flex flex-col justify-center mt-4 md:mt-0">
            <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              Still <span className="text-primary italic">Hungry?</span>
            </h3>
            <p className="text-gray-300 text-[10px] md:text-base font-bold uppercase tracking-[0.2em] mt-1">
              Explore 50+ dishes in our full menu
            </p>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="cursor-pointer mb-8 md:mb-0 group flex items-center gap-3 bg-primary text-black px-8 md:px-14 py-4 md:py-5 rounded-2xl font-black uppercase text-[11px] md:text-sm transition-all duration-300 hover:bg-white active:scale-95 shadow-xl"
          >
            <span>EXPLORE NOW</span>
            <RiArrowRightLine 
              size={20} 
              className="group-hover:translate-x-2 transition-transform duration-300" 
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExploreMore;