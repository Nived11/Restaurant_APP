import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from 'react';
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
  const { workingHours } = useSelector((state) => state.location);
  const token = localStorage.getItem('user_access');

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

  const isStoreClosed = useMemo(() => {
    if (!workingHours) return false;

    const day = now.getDay(); 
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr) => {
      if (!timeStr) return 0;
      const match = timeStr.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
      if (!match) return 0;

      let [ , hours, minutes, modifier] = match;
      hours = parseInt(hours);
      minutes = minutes ? parseInt(minutes) : 0;

      if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
      if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    };

    try {
      const hoursStr = day === 0 ? workingHours.sunday : workingHours.weekdays;
      
      if (!hoursStr || hoursStr.toLowerCase() === "closed") return true;

      const [startStr, endStr] = hoursStr.split("-").map(s => s.trim());
      const startTime = parseTime(startStr);
      const endTime = parseTime(endStr);

      if (endTime < startTime) {
         const isOpen = currentTimeInMinutes >= startTime || currentTimeInMinutes < endTime;
         return !isOpen;
      }

      return currentTimeInMinutes < startTime || currentTimeInMinutes >= endTime;
    } catch (e) {
      console.error("Error calculating store status:", e);
      return false;
    }
  }, [workingHours, now]); 

  const { 
    data: latestProducts = [], 
    isLoading: isStockLoading,
    isFetched: isStockFetched,
    error: stockError 
  } = useQuery({
    queryKey: ["cartItemsStock"],
    queryFn: async () => {
      try {
        const res = await api.get("/inventory/public/menu-items/");
        return Array.isArray(res.data) ? res.data : res.data.results || [];
      } catch (err) {
        return [];
      }
    },
    enabled: cartItems.length > 0,
    refetchInterval: 30000, 
  });

  const cartWithStockStatus = cartItems.map(item => {
    const targetId = item.item_id || item.id;
    const serverProduct = latestProducts.find(p => p.id === targetId);
    const currentAvailableStock = serverProduct 
      ? serverProduct.quantity 
      : (isStockLoading && !isStockFetched ? item.quantity : 0); 
    
    return {
      ...item,
      currentStock: currentAvailableStock,
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
      if (token) dispatch(syncCartUpdate({ itemId, actionType: 'add' }));
    } else {
      toast.error(`Stock limit reached! Only ${item.currentStock} available.`);
    }
  };

  const decrementQty = (item) => {
    const itemId = item.item_id || item.id;
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
      if (token) dispatch(syncCartUpdate({ itemId, actionType: 'decrease' }));
    }
  };

  const removeItem = (id, itemId) => {
    dispatch(removeFromCart(id));
    if (token) dispatch(syncCartUpdate({ itemId, actionType: 'remove' }));
    toast.success("Item removed from cart");
  };

  return {
    cartItems: cartWithStockStatus, 
    subTotal: totalAmount.toFixed(2),
    totalAmount,
    loading: loading || (isStockLoading && !isStockFetched), 
    error: reduxError || (stockError ? "Failed to sync stock" : null),
    isStoreClosed, 
    incrementQty,
    decrementQty,
    removeItem,
  };
};

export default useCart;