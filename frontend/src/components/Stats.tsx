import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
const Stats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["memberStats"],
    queryFn: () => apiClient.getMemberStats(),
  });

  if (isLoading) return <div>Loading statistics...</div>;

  return (
    <div className="flex justify-between items-center w-full gap-4 md:gap-20">
      <div className="grid grid-cols-3 gap-4 md:gap-20 xl:gap-40">
        <div className=" bg-blue-100  flex flex-col justify-center items-center rounded-xl text-sm p-4 font-bold">
          <p>Total Members</p>
          <h3 className=" text-center font-bold">{data.totalMembers}</h3>
        </div>
        <div className=" bg-green-100 flex flex-col justify-center items-center rounded-xl text-sm p-4 font-bold">
          <p>Member Admins</p>
          <h3 className="text-sm text-center font-bold">
            {data.adminCountForMembers}
          </h3>
        </div>
        <div className=" bg-red-100 flex flex-col justify-center items-center rounded-xl text-sm p-4 font-bold">
          <p>Activity Logs</p>
          <h3 className="text-sm text-center font-bold">
            {data.totalActivityLogs}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Stats;
