import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProductModal from "../../components/common/ProductModal";
import {
  BannerSection,
  CategorySection,
  DailySpecials,
  BestSellers,
  FirstOrderBanner,
  ComboSection,
  ExploreMore,
  Testimonials,
  FAQ,
  BrandFeatures,
  HomeError,
  HomeSkeleton,
  useHomeData
} from "../../features/user/home";

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useHomeData();
  const [selectedItem, setSelectedItem] = useState(null);

  // --- Safe Mobile Back Button Logic (History API) ---
  useEffect(() => {
    // മൊബൈലിൽ ബാക്ക് അടിക്കുമ്പോൾ Modal ക്ലോസ് ചെയ്യാനുള്ള ഫങ്ക്ഷൻ
    const handlePopState = () => {
      if (selectedItem) {
        setSelectedItem(null); // ബാക്ക് അടിക്കുമ്പോൾ Modal അടയുന്നു
      }
    };

    // Modal ഓപ്പൺ ആകുമ്പോൾ ഹിസ്റ്ററിയിലേക്ക് ഒരു ഡമ്മി എൻട്രി ആഡ് ചെയ്യുന്നു
    if (selectedItem) {
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedItem]);

  // MODIFIED: Added isNavigatingToCart parameter
  const handleCloseModal = (isNavigatingToCart = false) => {
    
    if (window.history.state?.modalOpen && !isNavigatingToCart) {
      window.history.back();
    }
    setSelectedItem(null);
  };
  // ---------------------------------------------------

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
    <div className="pb-20">
      <BannerSection
        data={data?.banners}
        onBannerClick={(item) => setSelectedItem(item)}
      />

      <CategorySection data={data?.categories} />

      <DailySpecials
        data={data?.specials}
        onItemClick={(item) => setSelectedItem(item)}
      />

      <BestSellers
        data={data?.bestSellers}
        onItemClick={(item) => setSelectedItem(item)}
      />
      <FirstOrderBanner />
      <ComboSection
        data={data?.combos}
        onItemClick={(item) => setSelectedItem(item)}
      />
      <ExploreMore />
      
      <Testimonials data={data?.feedbacks} />

      <FAQ data={data?.faqs} />
      
      <BrandFeatures />

      <AnimatePresence>
        {selectedItem && (
          <ProductModal
            item={selectedItem}
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;