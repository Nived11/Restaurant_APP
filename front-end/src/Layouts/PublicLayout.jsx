import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ReviewModal from "../components/common/ReviewModal";
import { useReviews } from "../features/user/profile/hooks/useReviews";

const PublicLayout = () => {
  const { eligibility } = useReviews();
  const [showPopup, setShowPopup] = useState(false);

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