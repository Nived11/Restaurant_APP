import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminHeader from "../components/common/AdminHeader";
import { Menu, Bell, X } from "lucide-react";

const AdminLayout = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  return (
    <div className="flex min-h-screen bg-[#F8F8F8] text-[#1A1A1A] font-sans antialiased">

      <div className={`fixed inset-y-0 left-0 z-[100] transition-transform duration-500 lg:translate-x-0 lg:static
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <AdminSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          user={user}
          isMobile={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Mobile Backdrop (Click to close menu) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 2. Main Body */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isExpanded ? "lg:pl-0" : "lg:pl-0"}`}>

        {/* --- MOBILE ONLY HEADER --- */}
        <header className="lg:hidden h-20 bg-[#1A1A1A] px-6 flex items-center justify-between sticky top-0 z-40 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-[#1A1A1A] overflow-hidden">
              <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&backgroundColor=f9a602" alt="pfp" />
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

        {/* --- DESKTOP ONLY HEADER --- */}
        <div className="hidden lg:block">
          <AdminHeader user={user} />
        </div>

        {/* 4. Content Area */}
        <main className="p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;