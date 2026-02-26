import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductModal from "../../components/common/ProductModal";
import {
  BannerSection,
  DailySpecials,
  BestSellers,
  ComboSection,
  FirstOrderBanner,
  CategorySection,
  ExploreMore,
  FAQ,
  Testimonials,
  BrandFeatures,
  HomeError,
  HomeSkeleton,
  useHomeData
} from "../../features/user/home";

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useHomeData();
  const [selectedItem, setSelectedItem] = useState(null);

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
      <Testimonials />
      <FAQ />
      <BrandFeatures />

      <AnimatePresence>
        {selectedItem && (
          <ProductModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;