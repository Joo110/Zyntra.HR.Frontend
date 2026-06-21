import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ added
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

const GROUPS = ["Main Menu", "HR Management"];
const grouped = GROUPS.map((g) => ({
  group: g,
  items: navItems.filter((n) => n.group === g),
}));

// ─── Sidebar Content ──────────────────────────────────────────────────────────
function SidebarContent({
  activePage,
  onNavigate,
  setMobileOpen,
  collapsed,
  onToggleCollapse,
  showCollapseToggle,
}: {
  activePage: PageKey;
  onNavigate: (path: string) => void;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  onToggleCollapse?: () => void;
  showCollapseToggle: boolean;
}) {
  const { t } = useTranslation("layout"); // ✅ inside component so it re-renders on lang change

  return (
    <div className="flex flex-col h-full bg-[#1a1f2e] text-white w-[230px] min-w-[230px]">

      {/* ── Logo ── */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#4F8EF7] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#4F8EF7]/30">
            <span className="text-white font-bold text-xs tracking-wide">AM</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Arabian Meem</p>
            <p className="text-[11px] text-white/40 leading-tight mt-0.5">الميم العربية</p>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        {grouped.map(({ group, items }) => (
          <div key={group} className="mb-1">
            {/* Group label */}
            <p className="px-5 pt-4 pb-1.5 text-[10px] text-white/25 uppercase tracking-[0.12em] font-semibold select-none">
              {group}
            </p>

            {items.map(({ key, label, icon: Icon, path }) => {
              const isActive = activePage === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    onNavigate(path);
                    setMobileOpen(false);
                  }}
                  className={`
                    relative w-full flex items-center gap-3 px-4 py-2.5 mx-0 text-[13px] transition-all text-left group
                    ${isActive
                      ? "text-[#4F8EF7] font-semibold"
                      : "text-white/55 hover:text-white/85 hover:bg-white/5"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#4F8EF7] rounded-r-full" />
                  )}

                  {/* Active background */}
                  {isActive && (
                    <span className="absolute inset-0 bg-[#4F8EF7]/10 rounded-none" />
                  )}

                  <Icon
                    size={15}
                    className={`shrink-0 relative z-10 transition-colors ${
                      isActive ? "text-[#4F8EF7]" : "text-white/40 group-hover:text-white/70"
                    }`}
                  />
                  <span className="flex-1 truncate relative z-10">{label}</span>
                  {isActive && (
                    <ChevronRight
                      size={12}
                      className="shrink-0 relative z-10 text-[#4F8EF7]/60"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Collapse toggle (desktop only) ── */}
      {showCollapseToggle && onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className={`
            hidden lg:flex items-center mx-3 mb-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5
            transition-all
            ${collapsed ? "justify-center w-12 h-9 mx-auto" : "justify-start gap-2.5 px-3 h-9"}
          `}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeft
            size={15}
            className={`shrink-0 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      )}

      {/* ── User Footer ── */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#6C63FF] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
            MM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">Mohamed Morsy</p>
            <p className="text-[10px] text-white/35 truncate mt-0.5">Administrator</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" title="Online" />
        </div>
      </div>
    </div>
  );
}

// ─── Exported Sidebar ─────────────────────────────────────────────────────────
export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed: collapsedProp,
  onCollapsedChange,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  /** Optional controlled collapsed state. If omitted, Sidebar manages its own state + persists to localStorage. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = getActivePage(location.pathname);

  const isControlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === "1";
  });

  const collapsed = isControlled ? collapsedProp! : internalCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    if (!isControlled) {
      setInternalCollapsed(next);
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore storage errors (e.g. private browsing) */
      }
    }
    onCollapsedChange?.(next);
  };

  // Close mobile drawer on escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 shadow-xl">
        <SidebarContent
          activePage={activePage}
          onNavigate={navigate}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-3 left-4 z-50 bg-[#1a1f2e] text-white p-2.5 rounded-xl shadow-xl border border-white/10"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer — always expanded, never shows the collapse toggle */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          activePage={activePage}
          onNavigate={navigate}
          setMobileOpen={setMobileOpen}
        />
      </div>
    </>
  );
}