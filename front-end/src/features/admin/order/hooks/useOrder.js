import { useState, useEffect } from "react";

export const useOrder = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    setOrders(storedOrders);
  };

  useEffect(() => {
    loadOrders(); 

    const interval = setInterval(() => {
      loadOrders();
    }, 2000);

    return () => clearInterval(interval); 
  }, []);

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("adminOrders", JSON.stringify(updatedOrders));
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("adminOrders", JSON.stringify(updatedOrders));
  };

  return {
    orders,
    deleteOrder,
    updateStatus,
  };
};