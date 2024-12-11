import * as apiClient from "../api/apiClient";

import { useQuery } from "@tanstack/react-query";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function RoleDistributionBarChart() {
  const {
    data: rolesCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rolesCount"],
    queryFn: apiClient.getRoles,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !rolesCount) {
    return <div>Error loading role distribution data</div>;
  }

  const roleDistributionData = rolesCount.data.data.map((role: any) => ({
    name: role.name,
    value: role.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={roleDistributionData}>
        <XAxis dataKey="name" className="text-xs tracking-tighter font-bold" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#36a2eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ActivityLogsPieChart() {
  const {
    data: activityCount,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["activityCount"],
    queryFn: apiClient.getActivities,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !activityCount) {
    return <div>Error loading activity logs data</div>;
  }

  const activityLogsData = activityCount.data.data.map((activity: any) => ({
    name: activity.action.split(" ")[0],
    value: activity.count,
  }));

  //console.log(activityLogsData);

  const COLORS = ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={activityLogsData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#36a2eb"
          label
        >
          {activityLogsData.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className=""
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function DashboardCharts() {
  return (
    <div className="  w-full mx-auto flex flex-col md:flex-row justify-between  items-center gap-10 ">
      <div className="w-full sm:w-[55%] lg:ml-10">
        <h2 className="text-lg text-center font-semibold mb-4">
          Roles Distribution
        </h2>
        <RoleDistributionBarChart />
      </div>
      <div className="w-full sm:w-[50%]">
        <h2 className="text-lg text-center  font-semibold mb-4">
          Member Activity Logs
        </h2>
        <ActivityLogsPieChart />
      </div>
    </div>
  );
}
