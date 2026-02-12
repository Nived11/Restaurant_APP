import { motion } from "framer-motion";

const FirstOrderBanner = () => (
  <section className="py-6 px-4 md:px-10">
    <div className="max-w-[1440px] mx-auto">
      <div className="relative h-[180px] md:h-[260px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex items-center shadow-xl bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=1600" 
            alt="Food"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 px-6 md:px-16 w-full flex justify-between items-center">
          {/* TEXT ANIMATION: Repeats every time it scrolls into view */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[65%] md:max-w-xl"
          >
            <h2 className="text-white text-xl md:text-4xl font-black uppercase leading-tight tracking-tight">
              First Order? <br /> 
              <span className="text-primary italic">Grab Your Discount</span>
            </h2>
            <p className="text-gray-300 mt-1 md:mt-2 text-[9px] md:text-base font-medium opacity-90">
              Automatically applied at checkout for all new foodies.
            </p>
            <button className="mt-3 md:mt-6 bg-primary text-black font-black px-5 py-2 md:px-8 md:py-3 rounded-xl text-[9px] md:text-sm uppercase shadow-lg active:scale-95 transition-transform">
              Order Now
            </button>
          </motion.div>

          {/* STICKER ANIMATION: Repeats every time it scrolls into view */}
          <motion.div 
            initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: -10, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative"
          >
            {/* Main Sticker Square */}
            <div className="bg-primary border-[3px] border-black p-3 md:p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-[100px] md:min-w-[160px] relative overflow-hidden">
              
              {/* Dotted Pattern Decor */}
              <div className="absolute top-1 right-1 flex gap-1">
                <div className="size-1 md:size-2 bg-black rounded-full" />
                <div className="size-1 md:size-2 bg-black rounded-full" />
              </div>
              <div className="absolute bottom-1 left-1 flex gap-1">
                <div className="size-1 md:size-2 bg-black rounded-full" />
                <div className="size-1 md:size-2 bg-black rounded-full" />
              </div>

              <span className="text-black font-bold text-[10px] md:text-sm uppercase leading-none">Get</span>
              <span className="text-black font-black text-3xl md:text-6xl leading-none my-1">20%</span>
              <span className="text-black font-black text-[10px] md:text-lg leading-none border-t-2 border-black pt-1">OFF</span>
            </div>

            {/* Sticker Tail */}
            <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-black border-r-[0px] border-r-transparent" />
            <div className="absolute -bottom-1.5 left-[18px] w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-primary border-r-[0px] border-r-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default FirstOrderBanner;