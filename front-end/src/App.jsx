import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./hooks/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import SiteLaunchLoader from "./components/ui/SiteLaunchLoader";
import { messaging, getToken, onMessage } from "./utils/firebase";
import api from "./api/axios";
import { toast } from "sonner";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isChecking } = useSelector((state) => state.location);
  const user = useSelector((state) => state.auth?.user);
  const isAdminPath = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    const setupFCM = async () => {
      const isAuthorized = user?.role === 'admin' || user?.role === 'staff' || isAdminPath;

      if (isAuthorized && "Notification" in window) {
        try {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            const token = await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
            });

            if (token) {
              await api.post('/notifications/save-fcm-token/', { fcm_token: token });
              console.log("FCM Token saved");
            }
          }
        } catch (error) {
          console.error("Error setting up FCM:", error);
        }
      }
    };

    setupFCM();

    const unsubscribe = onMessage(messaging, (payload) => {
      toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
        duration: 8000,
      });
      new Audio('/OrderNotify.mp3').play().catch(() => { });
    });

    return () => unsubscribe();
  }, [user, isAdminPath]);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isChecking && !isAdminPath && (
          <SiteLaunchLoader key="launch-loader" />
        )}
      </AnimatePresence>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <div style={{ display: (isChecking && !isAdminPath) ? 'none' : 'block' }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;