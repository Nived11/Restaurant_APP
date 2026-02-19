import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
       <Toaster  />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
