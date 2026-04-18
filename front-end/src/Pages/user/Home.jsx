import SEO from "../../components/common/SEO";
import {  BannerSection, CategorySection, DailySpecials, BestSellers,FirstOrderBanner, ComboSection } from "../../features/user/home";

const Home = () => {
  return (
    <>
    <SEO 
        title="Best Food Delivery & Table Reservation in Kochi" 
        description="Experience Kochi's finest burgers, loaded fries, and pasta. Order online from The Crunch India for fast, hot delivery or book your table today in Ernakulam."
        keywords="food delivery Kochi, best restaurants in Ernakulam, premium burgers Kochi, The Crunch India, table reservation Ernakulam"
      />
     <div>
      <BannerSection />
      <CategorySection />
      <DailySpecials />
      <BestSellers />
      <FirstOrderBanner />
      <ComboSection />
    </div>
    </>
  );
};

export default Home;
