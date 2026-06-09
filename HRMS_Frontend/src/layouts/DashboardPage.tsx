import React from "react";
import {
  Users,
  Clock,
  CalendarOff,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const attendanceData = [
  { month: "Jan", present: 1200, leave: 80, absent: 40 },
  { month: "Feb", present: 1100, leave: 100, absent: 60 },
  { month: "Mar", present: 1300, leave: 70, absent: 30 },
  { month: "Apr", present: 1250, leave: 90, absent: 50 },
  { month: "May", present: 1400, leave: 60, absent: 20 },
  { month: "Jun", present: 1350, leave: 110, absent: 45 },
];

const payrollData = [
  { month: "Jan", value: 60000 },
  { month: "Feb", value: 75000 },
  { month: "Mar", value: 79000 },
  { month: "Apr", value: 85000 },
  { month: "May", value: 90000 },
  { month: "Jun", value: 100000 },
  { month: "Jul", value: 120000 },
];

const departmentData = [
  { name: "Engineering", value: 240, color: "#4F8EF7" },
  { name: "Sales", value: 125, color: "#22c55e" },
  { name: "Marketing", value: 48, color: "#f59e0b" },
  { name: "HR", value: 65, color: "#a855f7" },
  { name: "Operations", value: 35, color: "#ef4444" },
];

const leaveRequests = [
  {
    name: "Ahmed Al-Rashid",
    type: "Annual Leave",
    dates: "Jun 9, 2026 – Jun 14, 2026",
    status: "pending",
  },
  {
    name: "Fatima Al-Qahtani",
    type: "Sick Leave",
    dates: "Jun 5, 2026 – Jun 9, 2026",
    status: "approved",
  },
  {
    name: "Noura Al-Dosari",
    type: "Annual Leave",
    dates: "Jun 20, 2026 – Jun 30, 2026",
    status: "pending",
  },
  {
    name: "Khalid Al-Harbi",
    type: "Unpaid Leave",
    dates: "Jun 5, 2026 – Jun 12, 2026",
    status: "rejected",
  },
];

const activities = [
  {
    icon: "👤",
    text: "New employee onboarded",
    sub: "Faris Al-Mutairi • Engineering",
    time: "2 hours ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: "✅",
    text: "Leave request approved",
    sub: "Finance Team • HR",
    time: "4 hours ago",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: "💰",
    text: "Payroll processed",
    sub: "Finance Team • Finance",
    time: "1 day ago",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: "⏰",
    text: "Attendance marked late",
    sub: "Nader Al-Johani • Sales",
    time: "2 days ago",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: "📊",
    text: "Performance review submitted",
    sub: "Mohammed Al-Otaibi • Sales",
    time: "3 days ago",
    color: "bg-blue-100 text-blue-600",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Employees",
      value: "154",
      icon: Users,
      change: "+2.25%",
      up: true,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Present Today",
      value: "120",
      icon: Clock,
      change: "+1.35%",
      up: true,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "On Leave",
      value: "30",
      icon: CalendarOff,
      change: "-6%",
      up: false,
      color: "text-red-400",
      bg: "bg-red-50",
    },
    {
      label: "Monthly Payroll",
      value: "$24,025",
      icon: DollarSign,
      change: "+2.5K",
      up: true,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5 min-h-screen bg-[#f7f8fc]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Hi Sir</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
            Last 7 Days <span className="text-gray-400">▾</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#4F8EF7] text-white rounded-lg hover:bg-blue-600">
            <Download size={14} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{s.label}</span>
              <div
                className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}
              >
                <s.icon size={16} className={s.color} />
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">{s.value}</div>
            <div
              className={`flex items-center gap-1 text-xs mt-1 ${
                s.up ? "text-green-500" : "text-red-500"
              }`}
            >
              {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {s.change}{" "}
              <span className="text-gray-400">compared to last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Trends */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Attendance Trends
            </h2>
            <p className="text-xs text-gray-400">
              Monthly attendance overview
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="present"
                name="Present"
                fill="#4F8EF7"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="leave"
                name="Leave"
                fill="#a78bfa"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="absent"
                name="Absent"
                fill="#f87171"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Department Distribution
            </h2>
            <p className="text-xs text-gray-400">Employees by department</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {departmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {departmentData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-gray-700 flex-1">{d.name}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Trends */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Payroll Trends
          </h2>
          <p className="text-xs text-gray-400">Monthly payroll expenditure</p>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={payrollData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending Leave Requests */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Pending Leave Requests
            </h2>
            <button className="text-xs text-[#4F8EF7] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {leaveRequests.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {r.type} • {r.dates}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[r.status]}`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Activities
            </h2>
            <button className="text-xs text-[#4F8EF7] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 ${a.color}`}
                >
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800">{a.text}</p>
                  <p className="text-xs text-gray-400">{a.sub}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}