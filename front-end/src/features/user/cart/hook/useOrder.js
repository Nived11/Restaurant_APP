import { useState } from 'react';
import { toast } from 'sonner';

export const useOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeOrder = async (selectedAddress, cartItems, finalPayable) => {
    const hasStockError = cartItems.some(item => item.isOutOfStock);
    if (hasStockError) {
      toast.error("Some items are out of stock. Please check your cart.");
      return { success: false };
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        address_id: selectedAddress.id,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.offer_price
        })),
        payment_method: "COD",
        total_amount: finalPayable
      };

      // API Call (Uncomment when ready)
      // await axios.post('/api/orders/place/', orderPayload);
      
      await new Promise(resolve => setTimeout(resolve, 3000)); // Demo Delay

      toast.success("Order Placed Successfully!");
      return { success: true };

    } catch (error) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Failed to place order.");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { placeOrder, isSubmitting };
};