import DashboardCharts from "@/components/DashboardCharts";
import Stats from "@/components/Stats";
import MembersTable from "@/tables/MembersTable";

const Dashboard = () => {
  return (
    <div className="  px-2  w-full flex flex-col items-center justify-center gap-2 ">
      <div className="flex container mx-auto flex-col gap-5  md:gap-10 lg:gap-o lg:flex-row justify-center items-center w-full">
        <Stats />
        <DashboardCharts />
      </div>
      <MembersTable />
    </div>
  );
};

export default Dashboard;
