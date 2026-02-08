import React from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoImg from '../../../assets/Logo-web.png'; 
import useLogin from './useLogin'; // Hook Import ചെയ്യുന്നു

const Login = () => {
  // Hook-ൽ നിന്ന് data destructure ചെയ്യുന്നു
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    isLoading,
    handleLogin
  } = useLogin();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop')" 
        }} 
      ></div>
      
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[3px]"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full px-6 md:max-w-md flex flex-col items-center">
        
        {/* LOGO */}
        <div className="mb-8 animate-fade-in-down">
           <img 
            src={logoImg} 
            alt="The Crunch Logo" 
            className="w-48 md:w-64 drop-shadow-2xl filter brightness-110"
           />
        </div>

        {/* LOGIN CARD */}
        <div className="w-full bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-[#FFC107] relative">
          
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue to The Crunch.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100 flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Email Address</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#FFC107] focus-within:border-transparent transition-all">
                <Mail size={20} className="text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thecrunch.com"
                  className="bg-transparent border-none outline-none text-gray-900 w-full ml-3 placeholder-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Password</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#FFC107] focus-within:border-transparent transition-all">
                <Lock size={20} className="text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none text-gray-900 w-full ml-3 placeholder-gray-400 font-medium"
                />
                <button type="button" onClick={toggleShowPassword} className="hover:text-[#FFC107] transition-colors">
                  {showPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
                </button>
              </div>
              
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-bold text-gray-400 hover:text-[#FFC107] transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#FFC107] hover:bg-yellow-400 text-black font-extrabold py-4 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-all flex justify-center items-center gap-2 text-lg mt-2"
            >
              {isLoading ? "Signing In..." : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>

          </form>

        </div>
        
        {/* Footer */}
        <p className="mt-8 text-white/50 text-xs font-medium text-center">
          &copy; 2026 The Crunch. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Login;