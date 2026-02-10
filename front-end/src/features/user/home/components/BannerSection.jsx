import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Your imports
import car1 from "../../../../assets/cars1.png";
import car2 from "../../../../assets/cars2.png";
import car3 from "../../../../assets/cars3.png";
import car4 from "../../../../assets/cars4.png";
import car5 from "../../../../assets/cars5.png";


const BannerSection = () => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const bannerData = [
        { id: 1, image: car1, name: "Car 1" },
        { id: 2, image: car2, name: "Car 2" },
        { id: 3, image: car3, name: "Car 3" },
        { id: 4, image: car4, name: "Car 4" },
        { id: 5, image: car5, name: "Car 5" },
    ];

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "250px",
        slidesToShow: 1,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        beforeChange: (current, next) => setActiveIndex(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: { centerPadding: "100px" }
            },
            {
                breakpoint: 640,
                settings: {
                    centerMode: false,
                    centerPadding: "0px"
                }
            }
        ]
    };

    return (
        <div className="relative w-full overflow-hidden py-6  group">
            {/* Navigation Buttons - Restored to your original design */}
            <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="cursor-pointer hidden md:block absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-black/50 transition"
            >
                <FiChevronLeft size={24} className="text-white" />
            </button>

            <button
                onClick={() => sliderRef.current?.slickNext()}
                className="cursor-pointer hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full p-2 hover:bg-black/50 transition"
            >
                <FiChevronRight size={24} className="text-white" />
            </button>

            <Slider ref={sliderRef} {...settings}>
                {bannerData.map((banner, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <div key={banner.id} className="outline-none focus:outline-none w-full h-full  py-0 px-2 sm:px-0">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1 : 0.82,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                }}
                                className="relative w-full h-[180px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-xl shadow-lg"
                            >
                                {/* Image */}
                                <img
                                    src={banner.image}
                                    alt={banner.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Black overlay for side images */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 0 : 0.55,
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 bg-black/20"
                                />
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