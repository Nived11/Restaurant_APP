import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ReviewModal from "../components/common/ReviewModal";
import { useReviews } from "../features/user/profile/hooks/useReviews";
import { fetchCart } from "../redux/cartSlice";
import { checkInitialStatus, handleLocationUpdate } from "../hooks/locationActions";
import { setChecking } from "../redux/locationSlice";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const { eligibility } = useReviews();
  const [showPopup, setShowPopup] = useState(false);
  const { currentLocation } = useSelector((state) => state.location);

  // 1. Initial Cart Fetch
  useEffect(() => {
    const token = localStorage.getItem('user_access');
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // 2. Real-time store status check (Polls every 20 seconds)
  useEffect(() => {
    const checkStatus = async () => {
      await dispatch(checkInitialStatus(true, false));
    };
    const interval = setInterval(checkStatus, 20000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // 3. Initial App Setup & Location Logic
  useEffect(() => {
    const initializeApp = async () => {
      const status = await dispatch(checkInitialStatus(false, true));

      if (status === "OPEN" && !currentLocation.lat) {
        askForLocation();
      }
    };

    const askForLocation = () => {
      if (!navigator.geolocation) {
        dispatch(setChecking(false));
        return;
      }
      const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          dispatch(handleLocationUpdate(latitude, longitude));
        },
        (err) => {
          console.log("Location Denied/Error", err);
          dispatch(setChecking(false));
        },
        options
      );
    };

    initializeApp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // Removed currentLocation.lat from dependencies to prevent infinite loops

  // 4. Review Popup Logic
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