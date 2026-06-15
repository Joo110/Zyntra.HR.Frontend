import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  CalendarOff,
  DollarSign,
  UserSearch,
  TrendingUp,
  User,
  Wallet,
  BarChart3,
  GitBranch,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  FileText,
  FolderOpen,
  GraduationCap,
  Phone,
} from "lucide-react";

export type PageKey =
  | "dashboard"
  | "employees"
  | "employeeContracts"
  | "employeeDocuments"
  | "employeeQualifications"
  | "emergencyContacts"
  | "departments"
  | "attendance"
  | "leaveManagement"
  | "payroll"
  | "recruitment"
  | "performance"
  | "selfService"
  | "finance"
  | "reports"
  | "branches"
  | "rolesPermissions";

interface NavItem {
  key: PageKey;
  label: string;
  icon: React.ElementType;
  path: string;
  group?: string;
}

const navItems: NavItem[] = [
  // Main
  { key: "dashboard",               label: "Dashboard",               icon: LayoutDashboard, path: "/dashboard",                  group: "Main Menu" },
  { key: "employees",               label: "Employees",               icon: Users,           path: "/employees",                  group: "Main Menu" },
  { key: "departments",             label: "Departments",             icon: Building2,       path: "/departments",                group: "Main Menu" },
  { key: "attendance",              label: "Attendance",              icon: Clock,           path: "/attendance",                 group: "Main Menu" },
  { key: "leaveManagement",         label: "Leave Management",        icon: CalendarOff,     path: "/leave-management",           group: "Main Menu" },
  { key: "payroll",                 label: "Payroll",                 icon: DollarSign,      path: "/payroll",                   group: "Main Menu" },
  { key: "recruitment",             label: "Recruitment",             icon: UserSearch,      path: "/recruitment",               group: "Main Menu" },
  { key: "performance",             label: "Performance",             icon: TrendingUp,      path: "/performance",               group: "Main Menu" },
  { key: "selfService",             label: "Self Service",            icon: User,            path: "/self-service",              group: "Main Menu" },
  { key: "finance",                 label: "Finance",                 icon: Wallet,          path: "/finance",                   group: "Main Menu" },
  { key: "reports",                 label: "Reports",                 icon: BarChart3,       path: "/reports",                   group: "Main Menu" },
  { key: "branches",                label: "Branches",                icon: GitBranch,       path: "/branches",                  group: "Main Menu" },
  { key: "rolesPermissions",        label: "Roles & Permissions",     icon: ShieldCheck,     path: "/roles-permissions",         group: "Main Menu" },
  // HR Management
  { key: "employeeContracts",       label: "Contracts",               icon: FileText,        path: "/employee-contracts",        group: "HR Management" },
  { key: "employeeDocuments",       label: "Documents",               icon: FolderOpen,      path: "/employee-documents",        group: "HR Management" },
  { key: "employeeQualifications",  label: "Qualifications",          icon: GraduationCap,   path: "/employee-qualifications",   group: "HR Management" },
  { key: "emergencyContacts",       label: "Emergency Contacts",      icon: Phone,           path: "/emergency-contacts",        group: "HR Management" },
];

function getActivePage(pathname: string): PageKey {
  if (pathname.startsWith("/employee-contracts"))      return "employeeContracts";
  if (pathname.startsWith("/employee-documents"))      return "employeeDocuments";
  if (pathname.startsWith("/employee-qualifications")) return "employeeQualifications";
  if (pathname.startsWith("/emergency-contacts"))      return "emergencyContacts";
  if (pathname.startsWith("/employees"))               return "employees";
  if (pathname.startsWith("/dashboard"))               return "dashboard";
  if (pathname.startsWith("/departments"))             return "departments";
  if (pathname.startsWith("/attendance"))              return "attendance";
  if (pathname.startsWith("/leave-management"))        return "leaveManagement";
  if (pathname.startsWith("/payroll"))                 return "payroll";
  if (pathname.startsWith("/recruitment"))             return "recruitment";
  if (pathname.startsWith("/performance"))             return "performance";
  if (pathname.startsWith("/self-service"))            return "selfService";
  if (pathname.startsWith("/finance"))                 return "finance";
  if (pathname.startsWith("/reports"))                 return "reports";
  if (pathname.startsWith("/branches"))                return "branches";
  if (pathname.startsWith("/roles-permissions"))       return "rolesPermissions";
  return "dashboard";
}

// Group nav items
const groups = ["Main Menu", "HR Management"];
const grouped = groups.map((g) => ({
  group: g,
  items: navItems.filter((n) => n.group === g),
}));

function SidebarContent({
  activePage,
  onNavigate,
  setMobileOpen,
}: {
  activePage: PageKey;
  onNavigate: (path: string) => void;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#1a1f2e] text-white w-[220px] min-w-[220px]">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#4F8EF7] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">AM</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Arabian Meem</p>
            <p className="text-[11px] text-white/50">الميم العربية</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {grouped.map(({ group, items }) => (
          <div key={group}>
            <p className="px-4 py-1.5 text-[10px] text-white/30 uppercase tracking-widest font-medium mt-2">
              {group}
            </p>
            {items.map(({ key, label, icon: Icon, path }) => {
              const isActive = activePage === key;
              return (
                <button
                  key={key}
                  onClick={() => { onNavigate(path); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all text-left ${
                    isActive
                      ? "bg-[#4F8EF7]/20 text-[#4F8EF7] font-medium border-r-2 border-[#4F8EF7]"
                      : "text-white/60 hover:bg-white/5 hover:text-white/90"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="flex-1 truncate">{label}</span>
                  {isActive && <ChevronRight size={13} className="shrink-0 opacity-60" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#4F8EF7] flex items-center justify-center text-white text-xs font-semibold shrink-0">
            MM
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">Mohamed Morsy</p>
            <p className="text-[10px] text-white/40 truncate">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = getActivePage(location.pathname);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0">
        <SidebarContent activePage={activePage} onNavigate={navigate} setMobileOpen={setMobileOpen} />
      </div>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-3 left-4 z-50 bg-[#1a1f2e] text-white p-2 rounded-xl shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent activePage={activePage} onNavigate={navigate} setMobileOpen={setMobileOpen} />
      </div>
    </>
  );
}