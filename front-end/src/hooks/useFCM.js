import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../utils/firebase";
import api from "../api/axios";
import { toast } from "sonner";

export const useFCM = (isAdminPath, user) => {
  useEffect(() => {
    const setupFCM = async () => {
      const adminToken = localStorage.getItem("admin_token");

      if (isAdminPath && adminToken && "Notification" in window) {
        try {
          // 1. സർവീസ് വർക്കർ രജിസ്റ്റർ ചെയ്യുക
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          
          // 2. സർവീസ് വർക്കർ റെഡി ആകുന്നത് വരെ കാത്തിരിക്കുക
          await navigator.serviceWorker.ready;
          console.log("Service Worker is ready and active");

          const permission = await Notification.requestPermission();
          
          if (permission === "granted") {
            // 3. രജിസ്ട്രേഷൻ ഒബ്ജക്റ്റ് സഹിതം ടോക്കൺ എടുക്കുക
            const token = await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration, 
            });

            if (token) {
              await api.post(
                "/notifications/save-fcm-token/",
                { fcm_token: token },
                { headers: { Authorization: `Bearer ${adminToken}` } }
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

    // Foreground Notification (ആപ്പ് തുറന്നിരിക്കുമ്പോൾ)
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
        duration: 5000,
      });
      // സൗണ്ട് പ്ലേ ചെയ്യുന്നു
      const audio = new Audio("/OrderNotify.mp3");
      audio.play().catch((err) => console.log("Audio play blocked:", err));
    });

    return () => unsubscribe();
  }, [user, isAdminPath]); 
};