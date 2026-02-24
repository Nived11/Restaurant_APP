import React from "react";
import { 
  BannerSection, 
  DailySpecials, 
  BestSellers, 
  ComboSection, 
  CategorySection, 
  FAQ, 
  Testimonials, 
  BrandFeatures, 
  HomeError, 
  useHomeData 
} from "../../features/user/home";

const Home = () => {
  const { data, loading, error, refetch } = useHomeData();

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <HomeError message={error} refetch={refetch} />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <BannerSection data={data.banners} loading={loading} />
      <CategorySection /> 
      <DailySpecials data={data.specials} loading={loading} />
      <BestSellers data={data.bestSellers} loading={loading} />
      <ComboSection data={data.combos} loading={loading} />
      
      <Testimonials />
      <FAQ />
      <BrandFeatures />
    </div>
  );
};

export default Home;