import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import api from "../../../../api/axios";
import { 
  removeFromCart, 
  updateQuantity, 
  syncCartUpdate, 
  fetchCart 
} from '../../../../redux/cartSlice';
import { toast } from 'sonner';

const useCart = () => {
  const dispatch = useDispatch();
  
  const { items: cartItems, loading, error: reduxError } = useSelector((state) => state.cart);
  const token = localStorage.getItem('user_access');

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const { 
    data: latestProducts = [], 
    isLoading: isStockLoading,
    isFetched: isStockFetched, // ഡാറ്റ ഒരിക്കലെങ്കിലും വന്നു എന്ന് ഉറപ്പാക്കാൻ
    error: stockError 
  } = useQuery({
    queryKey: ["cartItemsStock"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/menu-items/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        console.error("Stock check failed", err);
        return [];
      }
    },
    enabled: cartItems.length > 0,
    refetchInterval: 30000, 
  });

  const cartWithStockStatus = cartItems.map(item => {
    const targetId = item.item_id || item.id;
    const serverProduct = latestProducts.find(p => p.id === targetId);
    
    // ഡാറ്റ ലോഡ് ആയിട്ടില്ലെങ്കിൽ കാർട്ടിലുള്ള ക്വാണ്ടിറ്റി തന്നെ സ്റ്റോക്ക് ആയി താൽക്കാലികമായി കരുതുന്നു
    const currentAvailableStock = serverProduct 
      ? serverProduct.quantity 
      : (isStockLoading && !isStockFetched ? item.quantity : 0); 
    
    return {
      ...item,
      currentStock: currentAvailableStock,
      // സ്റ്റോക്ക് ഡാറ്റ പൂർണ്ണമായും ലഭിച്ച ശേഷം മാത്രം Out of Stock ചെക്ക് ചെയ്യുന്നു
      isOutOfStock: isStockFetched && item.quantity > currentAvailableStock
    };
  });

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.offer_price || 0);
    return acc + (price * item.quantity);
  }, 0);

  const incrementQty = (item) => {
    const itemId = item.item_id || item.id;
    if (item.quantity < item.currentStock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
      if (token) {
        dispatch(syncCartUpdate({ itemId, actionType: 'add' }));
      }
    } else {
      toast.error(`Stock limit reached! Only ${item.currentStock} available.`);
    }
  };

  const decrementQty = (item) => {
    const itemId = item.item_id || item.id;
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
      if (token) {
        dispatch(syncCartUpdate({ itemId, actionType: 'decrease' }));
      }
    }
  };

  const removeItem = (id, itemId) => {
    dispatch(removeFromCart(id));
    if (token) {
      dispatch(syncCartUpdate({ itemId, actionType: 'remove' }));
    }
    toast.success("Item removed from cart");
  };

  return {
    cartItems: cartWithStockStatus, 
    subTotal: totalAmount.toFixed(2),
    totalAmount: totalAmount,
    loading: loading || (isStockLoading && !isStockFetched), 
    error: reduxError || (stockError ? "Failed to sync stock" : null),
    incrementQty,
    decrementQty,
    removeItem,
  };
};

export default useCart;