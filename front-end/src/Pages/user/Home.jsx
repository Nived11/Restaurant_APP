import {  BannerSection, CategorySection, DailySpecials, BestSellers,FirstOrderBanner, ComboSection, BrandFeatures , Testimonials, FAQ} from "../../features/user/home";

const Home = () => {
  return (
     <div>
      <BannerSection />
      <CategorySection />
      <DailySpecials />
      <BestSellers />
      <ComboSection />
      <Testimonials />
      <FAQ />
      <FirstOrderBanner /> 
      <BrandFeatures />
      
    </div>
  );
};

export default Home;
