import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ReviewModal from "../components/common/ReviewModal";
import { useReviews } from "../features/user/profile/hooks/useReviews";
import { fetchCart } from "../redux/cartSlice";
import { checkInitialStatus } from "../hooks/locationActions";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eligibility } = useReviews();
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const lastCheckTime = useRef(0);

  // 1. Initial Cart Fetch
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  // 2. Optimized Setup & Real-time store status check
  useEffect(() => {
    const checkStatus = () => {
      const now = Date.now();
      if (now - lastCheckTime.current > 60000) {
        dispatch(checkInitialStatus(true, false));
        lastCheckTime.current = now;
      }
    };

    const navigationTimeout = setTimeout(() => {
      checkStatus();
    }, 2000); 

    // Polling interval (3 min 20 sec)
    const interval = setInterval(() => {
      if (!document.hidden) {
        checkStatus();
      }
    }, 200000); 
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(navigationTimeout);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, location.pathname]); 

  // 3. Review Popup Logic
  useEffect(() => {
    if (eligibility?.is_eligible && !eligibility?.has_reviewed) {
      setShowPopup(true);
    }
  }, [eligibility]);

  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <ReviewModal isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <Footer />
    </div>
  );
};

export default PublicLayout;