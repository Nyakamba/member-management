import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
const Stats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["memberStats"],
    queryFn: () => apiClient.getMemberStats(),
  });

  if (isLoading) return <div>Loading statistics...</div>;

  return (
    <div className="flex  items-center justify-between sm:justify-center  gap-12 sm:gap-64 lg:gap-20">
      <div className=" bg-blue-100 border w-32 h-24 rounded-xl text-sm p-4 font-bold  ">
        <p className="text-center mb-4"> Members</p>
        <h3 className=" text-center font-normal">{data.totalMembers}</h3>
      </div>

      <div className=" bg-red-100 w-32 h-24 rounded-xl text-sm p-4 font-bold">
        <p className="text-center mb-4">Activity Logs</p>
        <h3 className=" text-center font-normal">{data.totalActivityLogs}</h3>
      </div>
    </div>
  );
};
export default Stats;
