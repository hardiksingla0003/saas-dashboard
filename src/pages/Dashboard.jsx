import RevenueChart from "../components/RevenueChart";
import StatCard from "../components/StatCard";
import UsersChart from "../components/UsersChart";
import { dashboardStats } from "../data/dummyData";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold ">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <UsersChart />
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
