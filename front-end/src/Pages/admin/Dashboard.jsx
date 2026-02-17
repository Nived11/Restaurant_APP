import {  DashboardHeader, StatsGrid, RevenueChart,  Leaderboard,  StatusSection } from "../../features/admin/dashboard";

const Dashboard = ({ user }) => {
  return (
    <div className="space-y-6 md:space-y-8 pb-10 font-sans px-4 md:px-0">
      <DashboardHeader />
      <StatsGrid user={user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <RevenueChart />
        <Leaderboard />
      </div>

      <StatusSection />
    </div>
  );
};

export default Dashboard;