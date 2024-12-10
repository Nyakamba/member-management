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

// Role Distribution Data
const roleDistributionData = [
  { name: "Admins", value: 10 },
  { name: "Editors", value: 15 },
  { name: "Auditors", value: 5 },
  { name: "Guests", value: 8 },
  { name: "Moderators", value: 12 },
];

// Activity Logs Data
const activityLogsData = [
  { name: "Created", value: 20 },
  { name: "Updated", value: 35 },
  { name: "Deleted", value: 10 },
];

// Colors for Pie Chart
const COLORS = ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"];

function RoleDistributionBarChart() {
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
          {activityLogsData.map((entry, index) => (
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
