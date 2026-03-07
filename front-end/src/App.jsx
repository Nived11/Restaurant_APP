import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./hooks/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { AnimatePresence } from "framer-motion"; 
import SiteLaunchLoader from "./components/ui/SiteLaunchLoader"; 

const queryClient = new QueryClient();

const AppContent = () => {
  const { isChecking } = useSelector((state) => state.location);
  const isAdminPath = window.location.pathname.startsWith('/admin');

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isChecking && !isAdminPath && (
          <SiteLaunchLoader key="launch-loader" />
        )}
      </AnimatePresence>
      <ScrollToTop />
      <Toaster />
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