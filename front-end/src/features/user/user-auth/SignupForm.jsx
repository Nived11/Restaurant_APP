import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, ChevronRight, ChevronLeft, User, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import logo from '../../../assets/Logo-web.png';
import logoicon from '../../../assets/Logocrunch.png'; 
import loginbg from '../../../assets/loginbg.jpg';

const SignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (formData.phone.length === 10 && formData.name !== '') {
      setStep(2);
    } else {
      alert("Please enter your name and a valid 10-digit mobile number");
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#0a0a0a] overflow-hidden font-sans">
      
      {/* 1. LEFT CONTENT SECTION */}
      <div className="relative w-full lg:w-[60%] h-[25vh] lg:h-full bg-black flex-shrink-0 overflow-hidden">
        <img 
          src={loginbg} 
          className="absolute inset-0 w-full h-full object-cover opacity-25 lg:opacity-30" 
          alt="Premium Culinary"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden"></div>
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent"></div>
        <div className="hidden lg:block absolute top-32 left-25 z-20">
          <img src={logoicon} alt="Logo" className="w-22 h-22 object-contain opacity-90 drop-shadow-2xl" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center lg:justify-start p-6 lg:p-24 lg:pt-52">
          <div className="flex flex-col items-center lg:hidden">
             <img src={logo} alt="Logo" className="w-32 h-32 -mt-8 object-contain drop-shadow-2xl" />
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f9a602] -mt-8 sm:mt-4">The Elite Kitchen</p>
          </div>
          <div className="hidden lg:block space-y-10">
            <h1 className="text-7xl lg:text-[100px] font-black uppercase italic leading-[0.9] tracking-tighter text-white">
              Beyond <br /> <span className="text-[#f9a602]">Taste.</span>
            </h1>
            <div className="max-w-md space-y-6">
              <p className="text-gray-300 text-xl font-medium leading-relaxed tracking-wide italic border-l-4 border-[#f9a602] pl-8">
                The Ultimate Culinary Experience
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-500 pt-4">
                not just a meal, an experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT CONTENT: ONLY TOP TO BOTTOM ANIMATION HERE */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} // Start slightly above
        animate={{ opacity: 1, y: 0 }}   // Move to place
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[40%] flex flex-col items-center justify-start lg:justify-center px-8 lg:px-20 bg-[#0a0a0a] flex-grow pt-0 lg:pt-0 overflow-y-auto"
      >
        <div className="max-w-sm w-full space-y-8 lg:space-y-10">
          <header className="text-center lg:text-left space-y-3 lg:space-y-4">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight italic">
              Sign <span className="text-[#f9a602]">Up.</span>
            </h2>
            <p className="text-gray-500 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center lg:justify-start gap-2">
              <Zap size={12} className="text-[#f9a602] fill-[#f9a602]" /> 
              Join the Inner Circle
            </p>
          </header>

          <div className="w-full">
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <User size={18} className="text-[#f9a602] opacity-70" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-14 pr-6 py-3 lg:py-3 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white text-[12px] sm:text-base outline-none placeholder:text-gray-700"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-[#f9a602] font-black text-[12px] sm:text-base pr-3 border-r border-white/10">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-18 pr-6 py-3 lg:py-3 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white text-[12px] sm:text-base outline-none placeholder:text-gray-700"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Mail size={18} className="text-[#f9a602] opacity-70" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-14 pr-6 py-3 lg:py-3 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white text-[12px] sm:text-base outline-none placeholder:text-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 lg:mt-10 bg-[#f9a602] text-black py-3 lg:py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] lg:text-[11px] hover:bg-primary/80 cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95 shadow-2xl shadow-[#f9a602]/10"
                >
                  Create Account <ArrowRight size={16} strokeWidth={3} />
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      className="w-full h-12 lg:h-14 bg-white/5 border border-white/10 rounded-xl text-center font-black text-xl text-[#f9a602] focus:border-[#f9a602] outline-none"
                    />
                  ))}
                </div>
                <button className="cursor-pointer w-full bg-[#f9a602] text-black py-3 lg:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] lg:text-[11px] hover:bg-primary/80 transition-all flex items-center justify-center gap-2">
                  Verify & Register <ShieldCheck size={16} />
                </button>
                <div className="flex justify-center">
                  <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 cursor-pointer text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white underline underline-offset-4 decoration-[#f9a602]">
                    <ChevronLeft size={14} /> Back to details
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pt-8 border-t border-white/5">
             <div className="flex flex-col items-center lg:items-start gap-4">
                <p className="text-[10px] font-medium text-gray-500 tracking-tight">
                  Already have an account?
                </p>
                <button 
                  onClick={() => navigate('/login')}
                  className="cursor-pointer group flex items-center gap-2 text-white transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f9a602] group-hover:text-black transition-all">
                    <ChevronLeft size={14} />
                  </div>
                  <span className="font-black uppercase tracking-widest text-[11px] group-hover:text-[#f9a602]">Sign In Now</span>
                </button>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;