import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import api from '../../../../api/axios';

export const useOrderStats = () => {
  const audioRef = useRef(new Audio('/OrderNotify.mp3'));
  const prevNewOrders = useRef(0);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/stats');
      const resData = response.data;
      return {
        'NEW ORDERS': resData.new_orders || 0,
        'PREPARING': resData.preparing || 0,
        'ON THE WAY': resData.on_the_way || 0,
        'HISTORY': resData.history || 0
      };
    },
    refetchInterval: 5000, 
  });

  useEffect(() => {
  const currentNewOrders = data?.['NEW ORDERS'] || 0;

  if (currentNewOrders > prevNewOrders.current && prevNewOrders.current !== 0) {
    
    audioRef.current.currentTime = 0; 
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Autoplay Blocked");
      });
    }

    if (Notification.permission === "granted") {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("New Order Received! 🔔", {
          body: `You have ${currentNewOrders} new orders to process.`,
          icon: "/icon-192.png",
          badge: "/icon-192.png", 
          requireInteraction: true,
          data: { url: window.location.origin + '/admin/orders' } 
        });
      });
    } else {
      const notification = new Notification("New Order Received! 🔔", {
        body: `You have ${currentNewOrders} new orders to process.`,
        icon: "/icon-192.png",
        requireInteraction: true
      });
      notification.onclick = () => { window.focus(); notification.close(); };
    }
  }
  }

  prevNewOrders.current = currentNewOrders;
}, [data]);

  return {
    stats: data || { 'NEW ORDERS': 0, 'PREPARING': 0, 'ON THE WAY': 0, 'HISTORY': 0 },
    isLoading
  };
};