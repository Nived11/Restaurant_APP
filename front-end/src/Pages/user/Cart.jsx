import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useCart, 
  ProgressBar, 
  CartSection, 
  AddressSection, 
  OrderSection, 
  OrderAnimation 
} from '../../features/user/cart';
import { toast } from 'sonner';

export default function Cart() {
  const { cartItems, subTotal, totalAmount, incrementQty, decrementQty, removeItem } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const isLoggedIn = !!localStorage.getItem('user_access');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    scrollToTop();
  }, [step]);

  const handleNextStep = () => {
    if (step === 1) {
      const hasStockError = cartItems.some(item => item.isOutOfStock);
      if (hasStockError) {
        toast.error("Please resolve the stock issues before proceeding.");
        return;
      }
      if (!isLoggedIn) { 
        toast.warning("Please login to proceed");
        setTimeout(() => {
          navigate("/login", { state: { from: "/cart" } });
        }, 1500);
        return; 
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedAddress) { 
        toast.error("Please select an address");
        return; 
      }
      setStep(3);
    }
    scrollToTop();
  };

  const handleBack = (prevStep) => {
    setStep(prevStep);
    scrollToTop();
  };

  const handlePlaceOrder = () => {
    // This will be called after successful API response
    navigate("/profile?tab=orders");
  };

  if (isOrderProcessing) return <OrderAnimation />;

  return (
    <div className="min-h-screen bg-white pt-6 pb-24 overflow-y-visible">
      <ProgressBar step={step} />
      <main className="max-w-7xl mx-auto px-6">
        {step === 1 && (
          <CartSection 
            cartItems={cartItems} subTotal={subTotal} totalAmount={totalAmount} 
            incrementQty={incrementQty} decrementQty={decrementQty} removeItem={removeItem} 
            onNext={handleNextStep}
          />
        )}
        {step === 2 && (
          <AddressSection 
            onNext={handleNextStep} onBack={() => handleBack(1)} 
            selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} 
          />
        )}
        {step === 3 && (
          <OrderSection 
            cartItems={cartItems} subTotal={subTotal} totalAmount={totalAmount} 
            onPlaceOrder={handlePlaceOrder} onBack={() => handleBack(2)} 
            selectedAddress={selectedAddress} 
            setIsOrderProcessing={setIsOrderProcessing} // Passing the animation setter
          />
        )}
      </main>
    </div>
  );
}