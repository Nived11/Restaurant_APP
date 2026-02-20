import { RevenueHeader, RevenueStats, RevenueChart, TransactionTable } from "../../features/admin/revenue";


const salesData = [
  { date: "Feb 11", amount: 4000 },
  { date: "Feb 12", amount: 3000 },
  { date: "Feb 13", amount: 9800 },
  { date: "Feb 14", amount: 3908 },
  { date: "Feb 15", amount: 4800 },
  { date: "Feb 16", amount: 6100 },
  { date: "Feb 17", amount: 8200 },
];

const transactions = [
  { id: "#ORD-9942", rider: "Suresh Kumar", time: "10:30 AM", amount: "₹ 1,240", status: "Collected" },
  { id: "#ORD-9941", rider: "Suresh Kumar", time: "11:15 AM", amount: "₹ 450", status: "Collected" },
  { id: "#ORD-9940", rider: "Manish Singh", time: "12:45 PM", amount: "₹ 2,100", status: "Pending" },
  { id: "#ORD-9939", rider: "Amit Verma", time: "01:20 PM", amount: "₹ 890", status: "In Transit" },
];

const Revenue = ({ user }) => {
  // Guard clause for access
  if (user?.role !== "admin") {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <h2 className="text-2xl font-black uppercase text-gray-300 tracking-tighter">Superadmin Access Only</h2>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-hidden space-y-6 md:space-y-8 pb-10 font-sans px-4 sm:px-6 lg:px-8">
      
      {/* Imported Components */}
      <RevenueHeader />
      
      <RevenueStats />
      
      <RevenueChart data={salesData} />
      
      <TransactionTable transactions={transactions} />

    </div>
  );
};

export default Revenue;