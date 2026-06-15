import { useTranslation } from "react-i18next"; // ✅ added
import {
  Users, Clock, CalendarOff, DollarSign,
  TrendingUp, TrendingDown, Download,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";

// ─── Static data ──────────────────────────────────────────────────────────────
// ✅ Month abbreviations and department names come from translation files;
//    data arrays only hold keys or numeric values.

const attendanceData = [
  { monthKey: "months.jan", present: 1200, leave: 80,  absent: 40 },
  { monthKey: "months.feb", present: 1100, leave: 100, absent: 60 },
  { monthKey: "months.mar", present: 1300, leave: 70,  absent: 30 },
  { monthKey: "months.apr", present: 1250, leave: 90,  absent: 50 },
  { monthKey: "months.may", present: 1400, leave: 60,  absent: 20 },
  { monthKey: "months.jun", present: 1350, leave: 110, absent: 45 },
];

const payrollData = [
  { monthKey: "months.jan", value: 60000  },
  { monthKey: "months.feb", value: 75000  },
  { monthKey: "months.mar", value: 79000  },
  { monthKey: "months.apr", value: 85000  },
  { monthKey: "months.may", value: 90000  },
  { monthKey: "months.jun", value: 100000 },
  { monthKey: "months.jul", value: 120000 },
];

const departmentData = [
  { nameKey: "departments.engineering", value: 240, color: "#4F8EF7" },
  { nameKey: "departments.sales",       value: 125, color: "#22c55e" },
  { nameKey: "departments.marketing",   value: 48,  color: "#f59e0b" },
  { nameKey: "departments.hr",          value: 65,  color: "#a855f7" },
  { nameKey: "departments.operations",  value: 35,  color: "#ef4444" },
];

const leaveRequests = [
  { name: "Ahmed Al-Rashid",   typeKey: "leaveTypes.annual", dates: "Jun 9, 2026 – Jun 14, 2026",  statusKey: "dashboard.status.pending"  },
  { name: "Fatima Al-Qahtani",typeKey: "leaveTypes.sick",   dates: "Jun 5, 2026 – Jun 9, 2026",   statusKey: "dashboard.status.approved" },
  { name: "Noura Al-Dosari",  typeKey: "leaveTypes.annual", dates: "Jun 20, 2026 – Jun 30, 2026", statusKey: "dashboard.status.pending"  },
  { name: "Khalid Al-Harbi",  typeKey: "leaveTypes.unpaid", dates: "Jun 5, 2026 – Jun 12, 2026",  statusKey: "dashboard.status.rejected" },
];

const activities = [
  { icon: "👤", textKey: "dashboard.activities.onboarded",   sub: "Faris Al-Mutairi • Engineering", timeKey: "dashboard.time.twoHours",  color: "bg-blue-100 text-blue-600"   },
  { icon: "✅", textKey: "dashboard.activities.leaveApproved",sub: "Finance Team • HR",             timeKey: "dashboard.time.fourHours", color: "bg-green-100 text-green-600"  },
  { icon: "💰", textKey: "dashboard.activities.payroll",      sub: "Finance Team • Finance",        timeKey: "dashboard.time.oneDay",    color: "bg-purple-100 text-purple-600" },
  { icon: "⏰", textKey: "dashboard.activities.late",         sub: "Nader Al-Johani • Sales",       timeKey: "dashboard.time.twoDays",   color: "bg-yellow-100 text-yellow-600" },
  { icon: "📊", textKey: "dashboard.activities.performance",  sub: "Mohammed Al-Otaibi • Sales",   timeKey: "dashboard.time.threeDays", color: "bg-blue-100 text-blue-600"   },
];

const statusColors: Record<string, string> = {
  "dashboard.status.pending":  "bg-yellow-100 text-yellow-700",
  "dashboard.status.approved": "bg-green-100 text-green-700",
  "dashboard.status.rejected": "bg-red-100 text-red-700",
};

export default function DashboardHomePage() {
  const { t } = useTranslation("layout");

  // ✅ Build translated data inside the component so t() is in scope
  const stats = [
    { labelKey: "dashboard.stats.totalEmployees", value: "154",     icon: Users,       change: "+2.25%", up: true,  color: "text-blue-500",  bg: "bg-blue-50"  },
    { labelKey: "dashboard.stats.presentToday",   value: "120",     icon: Clock,       change: "+1.35%", up: true,  color: "text-blue-500",  bg: "bg-blue-50"  },
    { labelKey: "dashboard.stats.onLeave",         value: "30",      icon: CalendarOff, change: "-6%",    up: false, color: "text-red-400",   bg: "bg-red-50"   },
    { labelKey: "dashboard.stats.monthlyPayroll",  value: "$24,025", icon: DollarSign,  change: "+2.5K",  up: true,  color: "text-green-500", bg: "bg-green-50" },
  ];

  // ✅ Translate month keys for recharts — recharts needs plain `month` string
  const translatedAttendance = attendanceData.map((d) => ({ ...d, month: t(d.monthKey) }));
  const translatedPayroll    = payrollData.map((d)    => ({ ...d, month: t(d.monthKey) }));

  return (
    <div className="p-4 lg:p-6 space-y-5 min-h-screen bg-[#f7f8fc]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">{t("dashboard.header.title")}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t("dashboard.header.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition">
            {t("dashboard.header.filter")} <span className="text-gray-400">▾</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#4F8EF7] text-white rounded-lg hover:bg-blue-600 transition">
            <Download size={14} />
            {t("dashboard.header.export")}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s) => (
          <div key={s.labelKey} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{t(s.labelKey)}</span>
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={16} className={s.color} />
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">{s.value}</div>
            <div className={`flex items-center gap-1 text-xs mt-1 ${s.up ? "text-green-500" : "text-red-500"}`}>
              {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {s.change} <span className="text-gray-400">{t("dashboard.stats.vsLastMonth")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Attendance Trends */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900">{t("dashboard.charts.attendance.title")}</h2>
            <p className="text-xs text-gray-400">{t("dashboard.charts.attendance.subtitle")}</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={translatedAttendance} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="present" name={t("dashboard.charts.attendance.present")} fill="#4F8EF7" radius={[3, 3, 0, 0]} />
              <Bar dataKey="leave"   name={t("dashboard.charts.attendance.leave")}   fill="#a78bfa" radius={[3, 3, 0, 0]} />
              <Bar dataKey="absent"  name={t("dashboard.charts.attendance.absent")}  fill="#f87171" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900">{t("dashboard.charts.department.title")}</h2>
            <p className="text-xs text-gray-400">{t("dashboard.charts.department.subtitle")}</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
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
                <div key={d.nameKey} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-700 flex-1">{t(d.nameKey)}</span>
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
          <h2 className="text-sm font-semibold text-gray-900">{t("dashboard.charts.payroll.title")}</h2>
          <p className="text-xs text-gray-400">{t("dashboard.charts.payroll.subtitle")}</p>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={translatedPayroll}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v / 1000}k`}
            />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Leave Requests */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-900">{t("dashboard.leaveRequests.title")}</h2>
            <button className="text-xs text-[#4F8EF7] hover:underline">{t("dashboard.leaveRequests.viewAll")}</button>
          </div>
          <div className="space-y-3">
            {leaveRequests.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{r.name}</p>
                    <p className="text-xs text-gray-400 truncate">{t(r.typeKey)} • {r.dates}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[r.statusKey]}`}>
                  {t(r.statusKey)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-900">{t("dashboard.activities.title")}</h2>
            <button className="text-xs text-[#4F8EF7] hover:underline">{t("dashboard.activities.viewAll")}</button>
          </div>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800">{t(a.textKey)}</p>
                  <p className="text-xs text-gray-400">{a.sub}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{t(a.timeKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}