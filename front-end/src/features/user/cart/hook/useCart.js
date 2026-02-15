import { useState } from 'react';

export const useCart = () => {
  // 1. Initialize with 2 Dummy Products
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 169,
      qty: 1,
      desc: "Extra Cheese, Thin Crust",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Chicken Pepperoni",
      price: 249,
      qty: 1,
      desc: "Spicy Chicken, Hand Tossed",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=150&auto=format&fit=crop"
    }
  ]);

  const deliveryFee = 60;
  const gst = 76.24;

  // 2. Increment Function
  const incrementQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // 3. Decrement Function
  const decrementQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  // 4. Calculate Subtotal
  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  // 5. Total Amount
  const totalAmount = subTotal + deliveryFee + gst;

  return {
    cartItems,      // Return the list of items
    deliveryFee,
    gst,
    subTotal,       // Item total
    totalAmount,    // Final Amount
    incrementQty,
    decrementQty,
  };
};