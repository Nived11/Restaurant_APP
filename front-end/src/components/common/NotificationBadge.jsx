import { Bell } from "lucide-react";

const NotificationBadge = () => {
  const notificationCount = 5;

  return (
    <button className="cursor-pointer relative p-2.5 md:p-3.5 bg-white/5 border border-white/10 text-white hover:border-primary hover:bg-white/10 transition-all duration-300 group rounded-xl md:rounded-2xl">
      {/* Icon size: Mobile-ൽ 18, Desktop-ൽ 20 */}
      <Bell className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] group-hover:rotate-12 transition-transform text-primary" />
      
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 min-w-[16px] md:min-w-[20px] h-4 md:h-5 bg-primary text-[#1A1A1A] text-[8px] md:text-[10px] font-black px-1 flex items-center justify-center rounded-md md:rounded-lg border-2 border-[#1A1A1A] shadow-lg uppercase">
          {notificationCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;