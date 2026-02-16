import React from "react";
import { ShoppingBag, Users, DollarSign, Utensils } from "lucide-react";

const Dashboard = ({ user }) => {
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  // Dummy data - In real app, fetch these from your API
  const stats = [
    { title: "Live Orders", value: "12", icon: <ShoppingBag />, color: "bg-blue-500", show: true },
    { title: "Active Menu", value: "45 Items", icon: <Utensils />, color: "bg-orange-500", show: true },
    { title: "Total Users", value: "1,240", icon: <Users />, color: "bg-purple-500", show: isSuperAdmin },
    { title: "Today's Revenue", value: "₹12,450", icon: <DollarSign />, color: "bg-green-500", show: isSuperAdmin },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
          Welcome back, {user?.name || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => stat.show && (
          <div key={index} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">{stat.title}</p>
              <h3 className="text-xl font-black text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Charts/Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-64 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest italic">
          Live Order Graph Coming Soon
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-64 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest italic">
          Recent Activity Feed
        </div>
      </div>
    </div>
  );
};

export default Dashboard;