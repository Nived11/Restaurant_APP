import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { removeFromCart, updateQuantity } from '../../../../redux/cartSlice';
import { toast } from 'sonner';

export const useCart = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);


  const { data: latestProducts = [], isLoading: isLoadingStock } = useQuery({
    queryKey: ["cartItemsStock"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/menu-items/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        console.error("Stock fetch error:", err);
        return [];
      }
    },
    enabled: cartItems.length > 0,
    refetchInterval: 30000, 
    staleTime: 0,
  });

  const cartWithStockStatus = cartItems.map(item => {
    const serverProduct = latestProducts.find(p => p.id === item.id);
    
    const currentAvailableStock = serverProduct ? serverProduct.quantity : (item.total_stock || 0);
    
    return {
      ...item,
      currentStock: currentAvailableStock,
      isOutOfStock: item.quantity > currentAvailableStock
    };
  });

  const subTotal = cartItems.reduce((acc, item) => acc + (item.offer_price * item.quantity), 0);
  const totalAmount = subTotal;

  const incrementQty = (item) => {
    const serverProduct = latestProducts.find(p => p.id === item.id);
    const maxLimit = serverProduct ? serverProduct.quantity : item.total_stock;

    if (item.quantity < maxLimit) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    } else {
      toast.error(`Sorry, only ${maxLimit} units available for ${item.name}!`);
    }
  };

  const decrementQty = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart!");
  };

  return {
    cartItems: cartWithStockStatus, 
    subTotal,
    totalAmount,
    incrementQty,
    decrementQty,
    removeItem,
    isLoadingStock
  };
};

export default useCart;