import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ added
import {
  LayoutDashboard, Users, Building2, Clock, CalendarOff,
  DollarSign, UserSearch, TrendingUp, User, Wallet, BarChart3,
  GitBranch, ShieldCheck, ChevronRight, Menu, X,
  FileText, FolderOpen, GraduationCap, Phone,
} from "lucide-react";

export type PageKey =
  | "dashboard" | "employees" | "employeeContracts" | "employeeDocuments"
  | "employeeQualifications" | "emergencyContacts" | "departments"
  | "attendance" | "leaveManagement" | "payroll" | "recruitment"
  | "performance" | "selfService" | "finance" | "reports"
  | "branches" | "rolesPermissions";

interface NavItem {
  key: PageKey;
  // ✅ labelKey replaces label — we look up translation at render time
  labelKey: string;
  icon: React.ElementType;
  path: string;
  group: "mainMenu" | "hrManagement";
}

const navItems: NavItem[] = [
  // Main Menu
  { key: "dashboard",              labelKey: "sidebar.items.dashboard",              icon: LayoutDashboard, path: "/dashboard",                group: "mainMenu" },
  { key: "employees",              labelKey: "sidebar.items.employees",              icon: Users,           path: "/employees",                group: "mainMenu" },
  { key: "departments",            labelKey: "sidebar.items.departments",            icon: Building2,       path: "/departments",              group: "mainMenu" },
  { key: "attendance",             labelKey: "sidebar.items.attendance",             icon: Clock,           path: "/attendance",               group: "mainMenu" },
  { key: "leaveManagement",        labelKey: "sidebar.items.leaveManagement",        icon: CalendarOff,     path: "/leave-management",         group: "mainMenu" },
  { key: "payroll",                labelKey: "sidebar.items.payroll",                icon: DollarSign,      path: "/payroll",                  group: "mainMenu" },
  { key: "recruitment",            labelKey: "sidebar.items.recruitment",            icon: UserSearch,      path: "/recruitment",              group: "mainMenu" },
  { key: "performance",            labelKey: "sidebar.items.performance",            icon: TrendingUp,      path: "/performance",              group: "mainMenu" },
  { key: "selfService",            labelKey: "sidebar.items.selfService",            icon: User,            path: "/self-service",             group: "mainMenu" },
  { key: "finance",                labelKey: "sidebar.items.finance",                icon: Wallet,          path: "/finance",                  group: "mainMenu" },
  { key: "reports",                labelKey: "sidebar.items.reports",                icon: BarChart3,       path: "/reports",                  group: "mainMenu" },
  { key: "branches",               labelKey: "sidebar.items.branches",               icon: GitBranch,       path: "/branches",                 group: "mainMenu" },
  { key: "rolesPermissions",       labelKey: "sidebar.items.rolesPermissions",       icon: ShieldCheck,     path: "/roles-permissions",        group: "mainMenu" },
  // HR Management
  { key: "employeeContracts",      labelKey: "sidebar.items.employeeContracts",      icon: FileText,        path: "/employee-contracts",       group: "hrManagement" },
  { key: "employeeDocuments",      labelKey: "sidebar.items.employeeDocuments",      icon: FolderOpen,      path: "/employee-documents",       group: "hrManagement" },
  { key: "employeeQualifications", labelKey: "sidebar.items.employeeQualifications", icon: GraduationCap,   path: "/employee-qualifications",  group: "hrManagement" },
  { key: "emergencyContacts",      labelKey: "sidebar.items.emergencyContacts",      icon: Phone,           path: "/emergency-contacts",       group: "hrManagement" },
];

// ✅ group keys map to translation keys, not raw strings
const groups: { key: "mainMenu" | "hrManagement"; labelKey: string }[] = [
  { key: "mainMenu",     labelKey: "sidebar.mainMenu" },
  { key: "hrManagement", labelKey: "sidebar.hrManagement" },
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

function SidebarContent({
  activePage,
  onNavigate,
  setMobileOpen,
}: {
  activePage: PageKey;
  onNavigate: (path: string) => void;
  setMobileOpen: (open: boolean) => void;
}) {
  const { t } = useTranslation("layout"); // ✅ inside component so it re-renders on lang change

  return (
    <div className="flex flex-col h-full bg-[#1a1f2e] text-white w-[220px] min-w-[220px]">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#4F8EF7] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">AM</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">
              {t("sidebar.brand.name")}       {/* ✅ */}
            </p>
            <p className="text-[11px] text-white/50">
              {t("sidebar.brand.subtitle")}   {/* ✅ */}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {groups.map(({ key: groupKey, labelKey: groupLabelKey }) => (
          <div key={groupKey}>
            <p className="px-4 py-1.5 text-[10px] text-white/30 uppercase tracking-widest font-medium mt-2">
              {t(groupLabelKey)} {/* ✅ translated group header */}
            </p>
            {navItems
              .filter((n) => n.group === groupKey)
              .map(({ key, labelKey, icon: Icon, path }) => {
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
                    <span className="flex-1 truncate">{t(labelKey)}</span> {/* ✅ */}
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
            <p className="text-xs font-medium text-white truncate">
              {t("sidebar.user.name")} {/* ✅ */}
            </p>
            <p className="text-[10px] text-white/40 truncate">
              {t("sidebar.user.role")} {/* ✅ */}
            </p>
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

      {/* Mobile toggle */}
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