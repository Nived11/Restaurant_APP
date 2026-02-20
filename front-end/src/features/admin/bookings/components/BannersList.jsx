import React from 'react';
import BannersListMobile from './BannersListMobile';
import BannersListTablet from './BannersListTablet';
import BannersListLaptop from './BannersListLaptop';

const BannersList = (props) => {
  return (
    <>
      {/* Header (Common for all views) */}
      <div className="mb-8 md:mb-12">
         <h1 className="text-3xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter mb-2">HERO <span className="text-[#f9a602]">BANNERS.</span></h1>
         <p className="text-gray-500 text-sm md:text-lg">Manage visual highlights ({props.banners.length} Active)</p>
      </div>

      {/* Render Specific Views */}
      <BannersListMobile {...props} />
      <BannersListTablet {...props} />
      <BannersListLaptop {...props} />
    </>
  );
};

export default BannersList;