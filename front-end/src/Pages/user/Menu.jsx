import { useState, useEffect } from "react";
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
    // നമ്മൾ 'X' ബട്ടൺ അമർത്തി Modal ക്ലോസ് ചെയ്യുമ്പോൾ മാത്രം ബാക്ക് ഹിസ്റ്ററി തിരികെ പോകാൻ.
    // കാർട്ടിലേക്ക് പോകുമ്പോൾ ബാക്ക് അടിക്കേണ്ടതില്ല (അല്ലെങ്കിൽ കാർട്ടിൽ നിന്ന് വീണ്ടും മെനുവിലേക്ക് പോരും).
    if (window.history.state?.modalOpen && !isNavigatingToCart) {
      window.history.back();
    }
    setSelectedItem(null);
  };
  // ---------------------------------------------------

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
            onClose={handleCloseModal} // MODIFIED: Changed to handleCloseModal
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