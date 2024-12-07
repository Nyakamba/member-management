import * as apiClient from "../api/apiClient";
import { useQuery } from "@tanstack/react-query";
const Stats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["memberStats"],
    queryFn: () => apiClient.getMemberStats(),
  });
  console.log(data);

  if (isLoading) return <div>Loading statistics...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="stat bg-blue-100 p-4 rounded">
        <p>Total Members</p>
        <h3 className="text-2xl font-bold">{data.totalMembers}</h3>
      </div>
      <div className="stat bg-green-100 p-4 rounded">
        <p>Member Admins</p>
        <h3 className="text-2xl font-bold">{data.adminCountForMembers}</h3>
      </div>
      <div className="stat bg-red-100 p-4 rounded">
        <p>Activity Logs</p>
        <h3 className="text-2xl font-bold">{data.totalActivityLogs}</h3>
      </div>
    </div>
  );
};
export default Stats;
