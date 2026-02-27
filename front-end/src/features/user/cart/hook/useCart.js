import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../../redux/cartSlice';
import { toast } from 'sonner';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subTotal = cartItems.reduce((acc, item) => acc + (item.offer_price * item.quantity), 0);
  const totalAmount = subTotal;

  const incrementQty = (item) => {
    const maxLimit = item.total_stock || 0;
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
    toast.success("Item removed from basket");
  };

  return {
    cartItems,
    subTotal,
    totalAmount,
    incrementQty,
    decrementQty,
    removeItem
  };
};

export default useCart;