import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart,ProgressBar, CartSection, AddressSection, ReviewSection, OrderAnimation } from '../../features/user/cart';

export default function Cart() {
  const { cartItems, subTotal, totalAmount, incrementQty, decrementQty, removeItem } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [isLoggedIn] = useState(true); 
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleNextStep = () => {
    if (step === 1) {
      if (!isLoggedIn) { window.location.href = "/login"; return; }
      setStep(2);
    } else if (step === 2) {
      if (!selectedAddress) { alert("Please select an address"); return; }
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    setIsOrderProcessing(true);
    setTimeout(() => {
      navigate("/profile?tab=orders");
    }, 3000);
  };

  if (isOrderProcessing) return <OrderAnimation />;

  return (
    <div className="min-h-screen bg-white pt-10 pb-24">
      <ProgressBar step={step} />
      <main className="max-w-7xl mx-auto px-6">
        {step === 1 && (
          <CartSection 
            cartItems={cartItems} 
            subTotal={subTotal} 
            totalAmount={totalAmount} 
            incrementQty={incrementQty} 
            decrementQty={decrementQty} 
            removeItem={removeItem} 
            onNext={handleNextStep}
          />
        )}
        {/* Step 2 and 3 continue... */}
        {step === 2 && <AddressSection onNext={handleNextStep} onBack={() => setStep(1)} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}
        {step === 3 && <ReviewSection cartItems={cartItems} subTotal={subTotal} totalAmount={totalAmount} onPlaceOrder={handlePlaceOrder} onBack={() => setStep(2)} selectedAddress={selectedAddress} />}
      </main>
    </div>
  );
}