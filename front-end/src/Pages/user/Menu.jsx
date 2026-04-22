import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SEO from "../../components/common/SEO";
import { 
  useMenu, 
  MenuHeader, 
  MenuFilter, 
  MenuItemLists, 
  MenuSkeleton, 
  ErrorMenu 
} from '../../features/user/menu';
import ProductModal from "../../components/common/ProductModal"; 

const MenuPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const { 
    categories, activeCategory, setActiveCategory, 
    filterType, setFilterType, filteredItems,
    isLoading, error, refetch 
  } = useMenu();

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
  // ---------------------------------------------------

  return (
    <>
    <SEO 
        title="Our Menu | Best Burgers, Pasta & Fries in Kochi" 
        description="Explore The Crunch India's menu in Ernakulam. Freshly prepared, mouth-watering burgers, loaded fries, authentic pasta, and refreshing beverages."
        keywords="The Crunch menu, burgers Kochi, pasta Ernakulam, food delivery menu Kochi, best loaded fries"
      />
    <div className="min-h-screen bg-white">
      <MenuHeader />
      
      <MenuFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem} 
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {error ? (
        <ErrorMenu 
          message={error.message} 
          onRetry={() => refetch()} 
        />
      ) : isLoading ? (
        <MenuSkeleton />
      ) : (
        <MenuItemLists 
          items={filteredItems} 
          onItemClick={(item) => setSelectedItem(item)}
        />
      )}
    </div>
    </>
  );
};

export default MenuPage;