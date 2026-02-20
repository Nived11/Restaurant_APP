  import { Bell } from "lucide-react";

  const AdminHeader = ({ user }) => {
    const notificationCount = 5;

    return (
      <header className="h-24 bg-[#1A1A1A] border-b border-white/5 sticky top-0 z-40 px-10 flex items-center justify-end shadow-2xl">
        
        <div className="flex items-center gap-8">
          
          {/* --- NOTIFICATION WITH DARK THEME --- */}
          <button className="cursor-pointer relative p-3.5 bg-white/5 border border-white/10 text-white hover:border-primary hover:bg-white/10 transition-all duration-300 group rounded-2xl">
            <Bell size={20} className="group-hover:rotate-12 transition-transform text-primary group-hover:text-primary" />
            
            {notificationCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-primary text-[#1A1A1A] text-[10px] font-black px-1 flex items-center justify-center rounded-lg border-2 border-[#1A1A1A] shadow-lg uppercase">
                {notificationCount}
              </span>
            )}
          </button>

          {/* --- PROFILE SECTION --- */}
          <div className="flex items-center gap-5 pl-8 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-black text-white leading-tight uppercase tracking-tighter">
                  {user?.name || "Admin User"}
              </p>
              <div className="flex justify-end mt-1">
                  <p className="text-[9px] font-black text-[#1A1A1A] bg-primary px-2 py-0.5 rounded-md uppercase tracking-[0.1em]">
                      {user?.role || "MANAGER"}
                  </p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary border-[3px] border-[#1A1A1A] shadow-[0_0_20px_rgba(250,204,21,0.2)] group-hover:rotate-3 transition-all duration-500 overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&backgroundColor=f9a602`} 
                  alt="profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-[#1A1A1A] rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  export default AdminHeader;