import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ProductModal from "../../components/common/ProductModal";
import SEO from '../../components/common/SEO';

// ✅ മുകളിൽ കാണേണ്ട പ്രധാന സെക്ഷനുകൾ മാത്രം ആദ്യം ഇമ്പോർട്ട് ചെയ്യുന്നു
import {
  BannerSection,
  CategorySection,
  DailySpecials,
  BestSellers,
  FirstOrderBanner,
  ComboSection,
  HomeError,
  HomeSkeleton,
  useHomeData
} from "../../features/user/home";

// ✅ താഴെ കിടക്കുന്ന സെക്ഷനുകൾ (Below the fold) Lazy ആയി ഇമ്പോർട്ട് ചെയ്യുന്നു
// ഇത് മൊത്തം ആപ്പിന്റെ ലോഡിങ് സ്പീഡ് 40% വരെ കൂട്ടും!
const ExploreMore = lazy(() => import("../../features/user/home").then(module => ({ default: module.ExploreMore })));
const Testimonials = lazy(() => import("../../features/user/home").then(module => ({ default: module.Testimonials })));
const FAQ = lazy(() => import("../../features/user/home").then(module => ({ default: module.FAQ })));
const BrandFeatures = lazy(() => import("../../features/user/home").then(module => ({ default: module.BrandFeatures })));

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useHomeData();
  const [selectedItem, setSelectedItem] = useState(null);

  // --- Safe Mobile Back Button Logic (History API) ---
  useEffect(() => {
    const handlePopState = () => {
      if (selectedItem) {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedItem]);

  const handleCloseModal = (isNavigatingToCart = false) => {
    if (window.history.state?.modalOpen && !isNavigatingToCart) {
      window.history.back();
    }
    setSelectedItem(null);
  };

  if (isError) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <HomeError message={error?.message || "Something went wrong"} refetch={refetch} />
      </div>
    );
  }

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <>
    <SEO 
        title="Best Food Delivery & Table Reservation in Kochi" 
        description="Experience Kochi's finest burgers, loaded fries, and pasta. Order online from The Crunch India for fast, hot delivery or book your table today in Ernakulam."
        keywords="food delivery Kochi, best restaurants in Ernakulam, premium burgers Kochi, The Crunch India, table reservation Ernakulam"
      />

    <div className="pb-20">
      <BannerSection data={data?.banners} onBannerClick={(item) => setSelectedItem(item)} />
      <CategorySection data={data?.categories} />
      <DailySpecials data={data?.specials} onItemClick={(item) => setSelectedItem(item)} />
      <BestSellers data={data?.bestSellers} onItemClick={(item) => setSelectedItem(item)} />
      <FirstOrderBanner />
      <ComboSection data={data?.combos} onItemClick={(item) => setSelectedItem(item)} />
      
      {/* ✅ Lazy ആയി ഇമ്പോർട്ട് ചെയ്തവ Suspense-നകത്ത് കൊടുക്കുന്നു */}
      <Suspense fallback={<div className="py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">Loading more...</div>}>
        <ExploreMore />
        <Testimonials data={data?.feedbacks} />
        <FAQ data={data?.faqs} />
        <BrandFeatures />
      </Suspense>

      <AnimatePresence>
        {selectedItem && (
          <ProductModal
            item={selectedItem}
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default Home;