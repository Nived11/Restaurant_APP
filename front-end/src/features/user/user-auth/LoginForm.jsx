import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Smartphone, Utensils } from 'lucide-react';
import logo from '../../../assets/Logo-web.png'; 

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length === 10) setStep(2);
    else alert("Please enter a valid 10-digit mobile number");
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* 1. Left Side: Image Section (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 h-screen relative bg-black">
        
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="bg-[#f9a602] w-16 h-1 w-16 mb-6"></div>
          <h1 className="text-6xl font-black uppercase italic leading-none tracking-tighter">
            Freshly Made <br /> 
            <span className="text-[#f9a602]">Daily For You.</span>
          </h1>
          <p className="mt-6 text-gray-200 font-medium max-w-md tracking-wide">
            Experience the best flavors in town. Fast delivery, fresh ingredients, and a taste you'll never forget.
          </p>
        </div>
        {/* Decorative Element */}
        <div className="absolute bottom-10 left-20 flex items-center gap-4 text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
          <Utensils size={16} /> Authentic Taste Guaranteed
        </div>
      </div>

      {/* 2. Right Side: Login Form (Mobile Full Screen) */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-6 relative">
        
        {/* Mobile Background Decoration (Only visible on mobile) */}
        <div className="lg:hidden absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-100 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover blur-sm opacity-10" 
            alt="bg"
          />
        </div>

        <div className="max-w-md w-full relative z-10 bg-white lg:bg-transparent p-8 lg:p-0 rounded-[3rem] lg:rounded-none shadow-2xl shadow-gray-200 lg:shadow-none border border-gray-100 lg:border-none">
          
          {/* Logo & Header */}
          <div className="text-center lg:text-left mb-10">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto lg:mx-0 mb-6 object-contain" />
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-black italic leading-tight">
              Welcome <br /> <span className="text-[#f9a602]">Back Hero!</span>
            </h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
              {step === 1 ? "Login to access your delicious orders" : "Verify the 6-digit code sent to you"}
            </p>
          </div>

          {/* Forms Section */}
          <div className="mt-8">
            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="group relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-black text-sm group-focus-within:text-[#f9a602] transition-colors">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:border-[#f9a602] focus:bg-white outline-none transition-all font-black text-sm tracking-[0.1em] shadow-inner"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#f9a602] hover:text-black transition-all flex items-center justify-center gap-3 group shadow-xl active:scale-95"
                >
                  Request OTP <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      className="w-full h-14 border-2 border-gray-100 bg-gray-50 rounded-xl text-center font-black text-xl focus:border-[#f9a602] focus:bg-white outline-none transition-all shadow-sm"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <button
                    className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#f9a602] hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                  >
                    Verify & Enjoy <ShieldCheck size={18} />
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors py-2"
                  >
                    Change Mobile Number?
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center lg:text-left">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
              New here? <span className="text-black underline cursor-pointer hover:text-[#f9a602]">Create Account</span> <br />
              Secure Login by <span className="text-[#f9a602]">SafeAuth™</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;