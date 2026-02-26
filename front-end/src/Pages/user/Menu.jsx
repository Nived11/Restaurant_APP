import { useState } from "react"; 
import { AnimatePresence } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-white">
      <MenuHeader />
      
      <MenuFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {/* മോഡൽ ലോജിക് */}
      <AnimatePresence>
        {selectedItem && (
          <ProductModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
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
  );
};

export default MenuPage;