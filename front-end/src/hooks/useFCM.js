// src/hooks/useFCM.js

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../utils/firebase";
import api from "../api/axios";
import { toast } from "sonner";

export const useFCM = (isAdminPath, user) => {
  useEffect(() => {
    const setupFCM = async () => {
      const isAdminLoggedIn = user && (user.role === "admin" || user.role === "staff");

      if (isAdminPath && isAdminLoggedIn && "Notification" in window) {
        try {
    
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let reg of registrations) {
            if (reg.active && reg.active.scriptURL.includes('sw.js')) {
              await reg.unregister();
              console.log("Old sw.js conflict removed.");
            }
          }

          // --- STEP 2: REGISTER FIREBASE SERVICE WORKER ---
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          
          await navigator.serviceWorker.ready;
          console.log("Firebase Service Worker is ready and active");

          const permission = await Notification.requestPermission();
          
          if (permission === "granted") {
            // --- STEP 3: GET TOKEN USING THE REGISTRATION ---
            const token = await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration, 
            });

            if (token) {
              await api.post(
                "/notifications/save-fcm-token/",
                { fcm_token: token }
              );
              console.log("FCM Token synced with backend");
            }
          }
        } catch (error) {
          console.error("Error setting up FCM:", error);
        }
      }
    };

    setupFCM();

    // Foreground Notification Handling
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
        duration: 5000,
      });
      // Custom Notification Sound
      const audio = new Audio("/OrderNotify.mp3");
      audio.play().catch((err) => console.log("Audio play blocked by browser:", err));
    });

    return () => unsubscribe();
  }, [user, isAdminPath]); 
};