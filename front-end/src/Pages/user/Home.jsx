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
  HomeSkeleton,
  useHomeData 
  
} from "../../features/user/home";

const Home = () => {
const { data, isLoading,isError, error, refetch } = useHomeData();

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
      <BannerSection data={data?.banners} />
      <CategorySection data={data?.categories} />
      <DailySpecials data={data?.specials} />
      <BestSellers data={data?.bestSellers} />
      <ComboSection data={data?.combos} />
      
      <Testimonials />
      <FAQ />
      <BrandFeatures />
    </div>
  );
};

export default Home;