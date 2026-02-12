const FirstOrderBanner = () => (
  <section className="py-6 px-4 md:px-10">
    <div className="max-w-[1440px] mx-auto">
      <div className="relative h-[180px] md:h-[260px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex items-center shadow-xl bg-black">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=1600" 
            alt="Food"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 px-6 md:px-16 w-full flex justify-between items-center">
          
          {/* Left Side: Static Text */}
          <div className="max-w-[65%] md:max-w-xl">
            <h2 className="text-white text-xl md:text-4xl font-black uppercase leading-tight tracking-tight">
              First Order? <br /> 
              <span className="text-primary italic">Grab Your Discount</span>
            </h2>
            <p className="text-gray-300 mt-1 md:mt-2 text-[9px] md:text-base font-medium opacity-90">
              Automatically applied at checkout.
            </p>
            <button className="mt-3 md:mt-6 bg-primary text-black font-black px-5 py-2 md:px-8 md:py-3 rounded-xl text-[9px] md:text-sm uppercase shadow-lg active:scale-95 transition-transform">
              Order Now
            </button>
          </div>

          {/* Right Side: Static Sticker (Pre-rotated to keep the look) */}
          <div className="relative -rotate-[10deg]">
            <div className="bg-primary border-[3px] border-black p-3 md:p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-[95px] md:min-w-[160px]">
              <span className="text-black font-bold text-[10px] md:text-sm uppercase leading-none">Get</span>
              <span className="text-black font-black text-3xl md:text-6xl leading-none my-1">20%</span>
              <span className="text-black font-black text-[10px] md:text-lg leading-none border-t-2 border-black pt-1">OFF</span>
            </div>
            {/* Sticker Tail */}
            <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-black" />
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default FirstOrderBanner;