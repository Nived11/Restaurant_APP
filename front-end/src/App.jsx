import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./hooks/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import SiteLaunchLoader from "./components/ui/SiteLaunchLoader";
import ServerErrorPage from "./components/ui/ServerErrorPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useFCM } from "./hooks/useFCM";
import api from "./api/axios"; 
import { setCredentials, logoutUser, setAuthLoading } from "./redux/authSlice"; 

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useDispatch();
  const { globalError } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.auth); 
  const currentPath = window.location.pathname;
  const isAdminPath = currentPath.startsWith("/admin");
  const isAuthPath = currentPath === "/login" || currentPath === "/signup";

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.get('/auth/verify-session/');
        
        if (response.data.status) {
          dispatch(setCredentials(response.data.user));
          
          const isPrivilegedUser = response.data.user.role === "admin" || response.data.user.role === "staff";
          if (isPrivilegedUser && currentPath === "/") {
            window.location.replace("/admin/dashboard");
          }
        }
      } catch (error) {
        dispatch(logoutUser());
        
        const adminRole = localStorage.getItem("admin_role");
        if ((adminRole === "admin" || adminRole === "staff") && currentPath === "/") {
            window.location.replace("/admin/dashboard");
        }
      } finally {
        dispatch(setAuthLoading(false)); 
      }
    };

    verifySession();
  }, [dispatch, currentPath]);

  const showLoader = isSplashVisible && !isAdminPath && !isAuthPath && !globalError;

  useFCM(isAdminPath, user);

  if (globalError && !isAdminPath) {
    return <ServerErrorPage />;
  }

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showLoader && <SiteLaunchLoader key="launch-loader" />}
      </AnimatePresence>
      <ScrollToTop />
      <Toaster position="top-center" />
      
      <div style={{ 
        visibility: showLoader ? "hidden" : "visible",
        height: showLoader ? "100vh" : "auto",
        overflow: showLoader ? "hidden" : "visible"
      }}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
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