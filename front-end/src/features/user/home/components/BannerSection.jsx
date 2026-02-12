import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri"; // Matches your combo section icon
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BannerSection = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bannerData = [
    {
      id: 1,
      desktopImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
      mobileImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      title: "Crave-Worthy Pizzas",
      subtitle: "Freshly baked woodfired pizzas delivered hot.",
    },
    {
      id: 2,
      desktopImg: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop",
      mobileImg: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop",
      title: "Ultimate Smashed Burgers",
      subtitle: "Double patties, double cheese, double the flavor.",
    },
    {
      id: 3,
      desktopImg: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2064&auto=format&fit=crop",
      mobileImg: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop",
      title: "Indulgent Desserts",
      subtitle: "Satisfy your sweet tooth with signature treats.",
    },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    centerMode: !isMobile, 
    centerPadding: isMobile ? "0px" : "250px",
    beforeChange: (current, next) => setActiveIndex(next),
  };

  return (
    <div className="relative w-full overflow-hidden py-6 group">
      {/* Navigation Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-primary transition-all active:scale-90"
      >
        <FiChevronLeft size={24} className="text-white" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-primary transition-all active:scale-90"
      >
        <FiChevronRight size={24} className="text-white" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {bannerData.map((banner, index) => {
          const isActive = index === activeIndex;

          return (
            <div key={banner.id} className="px-2 outline-none">
              <motion.div
                initial={false}
                animate={{
                  scale: !isMobile ? (isActive ? 1 : 0.82) : 1,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="relative w-full h-[180px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-3xl shadow-lg"
              >
                <picture>
                  <source media="(max-width: 1023px)" srcSet={banner.mobileImg} />
                  <img
                    src={banner.desktopImg}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </picture>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
                  <AnimatePresence>
                    {isActive && (
                      <div className="overflow-hidden">
                        {/* Title */}
                        <motion.h2
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-white text-lg md:text-3xl font-black uppercase tracking-tighter"
                        >
                          {banner.title}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-gray-300 text-[10px] md:text-base font-bold uppercase mt-1 mb-3 md:mb-5"
                        >
                          {banner.subtitle}
                        </motion.p>

                        {/* Button */}
                        <motion.button
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="flex items-center gap-2 bg-primary text-black px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase shadow-lg hover:bg-white transition-colors"
                        >
                          <RiFlashlightFill size={16} />
                          Grab Now
                        </motion.button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Inactive Overlay */}
                {!isMobile && (
                  <motion.div
                    animate={{ opacity: isActive ? 0 : 0.55 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BannerSection;