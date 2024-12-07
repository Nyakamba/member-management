import Stats from "@/components/Stats";
import MembersTable from "@/tables/MembersTable";

const Dashboard = () => {
  return (
    <div className="px-2  w-full flex flex-col items-center justify-center ">
      <Stats />
      <MembersTable />
    </div>
  );
};

export default Dashboard;
