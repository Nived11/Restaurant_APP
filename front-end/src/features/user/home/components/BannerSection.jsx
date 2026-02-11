import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import car1 from "../../../../assets/cars1.png";
import car2 from "../../../../assets/cars2.png";
import car3 from "../../../../assets/cars3.png";
import car4 from "../../../../assets/cars4.png";
import car5 from "../../../../assets/cars5.png";

const BannerSection = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile properly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px breakpoint for mobile and tablet
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

const bannerData = [
  {
    id: 1,
    desktopImg: car1,
    mobileImg: car2,
    name: "Car 1",
  },
  {
    id: 2,
    desktopImg: car3,
    mobileImg: car4,
    name: "Car 2",
  },
  {
    id: 3,
    desktopImg: car5,
    mobileImg: car1,
    name: "Car 3",
  },
];


  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    centerMode: !isMobile, // disable centerMode on mobile
    centerPadding: isMobile ? "0px" : "250px",
    beforeChange: (current, next) => setActiveIndex(next),
  };

  return (
    <div className="relative w-full overflow-hidden py-6 group">
      {/* Desktop Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-black/50 transition"
      >
        <FiChevronLeft size={24} className="text-white" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-black/50 transition"
      >
        <FiChevronRight size={24} className="text-white" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {bannerData.map((banner, index) => {
          const isActive = index === activeIndex;

          return (
            <div key={banner.id} className="px-2">
              <motion.div
                initial={false}
                animate={{
                  scale: !isMobile ? (isActive ? 1 : 0.82) : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="relative w-full h-[180px] md:h-[300px]  lg:h-[350px] overflow-hidden rounded-xl shadow-lg"
              >
                <picture>
  {/* Mobile Image */}
  <source
    media="(max-width: 1023px)"
    srcSet={banner.mobileImg}
  />

  {/* Desktop Image (default) */}
  <img
    src={banner.desktopImg}
    alt={banner.name}
    className="w-full h-full object-cover scale-x-[-1]"
  />
</picture>

                {!isMobile && (
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 0.55,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-black/40"
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </Slider>

      <style jsx global>{`
        .slick-list {
          overflow: visible !important;
        }
        .slick-track {
          display: flex !important;
          align-items: center !important;
        }
      `}</style>
    </div>
  );
};

export default BannerSection;
