import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { 
  useMenu, 
  MenuHeader, 
  MenuFilter, 
  MenuItemLists, 
  MenuSkeleton, 
  ErrorMenu 
} from '../../features/user/menu/index.js';
import ProductModal from "../../components/common/ProductModal"; 

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItemId = searchParams.get('item');

  const { 
    categories, activeCategory, setActiveCategory, 
    filterType, setFilterType, filteredItems,
    isLoading, error, refetch 
  } = useMenu();

  const handleCloseModal = () => {
    searchParams.delete('item');
    setSearchParams(searchParams);
  };

  const selectedItem = filteredItems.find(item => String(item.id) === selectedItemId);

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
        <MenuItemLists items={filteredItems} />
      )}
    </div>
  );
};

export default MenuPage;