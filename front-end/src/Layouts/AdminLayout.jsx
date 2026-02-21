import React, { useState, useEffect } from "react";
import { useOutletContext, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminHeader from "../components/common/AdminHeader";
import { Menu, Bell } from "lucide-react";
import { checkTokenExpiry } from "../utils/auth"; 

const AdminLayout = () => {
  const { user } = useOutletContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- STRICT AUTO LOGOUT TIMER ---
  useEffect(() => {
    checkTokenExpiry();

    const interval = setInterval(() => {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        // Expire aayal udane pazhaya token clear cheythu purathakkunnu
        if (currentTime >= expiryTime) {
          localStorage.clear(); 
          navigate('/admin/login');
        }
      } catch (error) {
        localStorage.clear();
        navigate('/admin/login');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);
  // ------------------------------------

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8F8] text-[#1A1A1A] font-sans antialiased">
      
      {/* 1. SIDEBAR */}
      <div 
        className={`fixed inset-y-0 left-0 z-[100] transition-transform duration-500 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isExpanded ? "lg:w-60" : "lg:w-24"} 
        `}
      >
        <AdminSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          user={user}
          isMobile={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 2. MAIN BODY */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen transition-all duration-500 
        ${isExpanded ? "lg:ml-60" : "lg:ml-24"}`}>

        {/* --- HEADER --- */}
        <header className="lg:hidden h-20 bg-[#1A1A1A] px-6 flex items-center justify-between sticky top-0 z-40 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-[#1A1A1A] overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&backgroundColor=f9a602`} alt="pfp" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white relative p-2">
              <Bell size={22} className="text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1A1A1A]"></span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white bg-white/10 p-2 rounded-xl active:scale-95 transition-transform"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <div className="hidden lg:block flex-shrink-0">
          <AdminHeader user={user} />
        </div>

        {/* 4. CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10  bg-white">
          <div className="max-w-7xl mx-auto ">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;