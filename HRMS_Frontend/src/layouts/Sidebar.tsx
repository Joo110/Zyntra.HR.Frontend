import React, { useState } from "react";
import {
  LayoutDashboard, Users, Building2, Clock, CalendarOff,
  DollarSign, UserSearch, TrendingUp, User, Wallet,
  BarChart3, GitBranch, ShieldCheck, ChevronRight, Menu, X
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { key: "dashboard", icon: LayoutDashboard },
  { key: "employees", icon: Users, hasArrow: true },
  { key: "departments", icon: Building2 },
  { key: "attendance", icon: Clock },
  { key: "leaveManagement", icon: CalendarOff },
  { key: "payroll", icon: DollarSign },
  { key: "recruitment", icon: UserSearch },
  { key: "performance", icon: TrendingUp },
  { key: "selfService", icon: User },
  { key: "finance", icon: Wallet },
  { key: "reports", icon: BarChart3 },
  { key: "branches", icon: GitBranch },
  { key: "rolesPermissions", icon: ShieldCheck },
] as const;

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1a1f2e] text-white w-[200px] min-w-[200px]">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-[#1a1f2e] font-bold text-xs">AM</span>
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight">Arabian Meem</div>
            <div className="text-[10px] text-white/50">الميم العربية</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map(({ key, icon: Icon }) => {
          const isActive = activePage === key;
          return (
            <button
              key={key}
              onClick={() => { onNavigate(key); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                ${isActive
                  ? "bg-[#4F8EF7] text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1 text-start">{key}</span>
              {false && (
                <ChevronRight
                  size={14}
                  className={`shrink-0 transition-transform ${isActive ? "rotate-90" : ""} ${false ? "rotate-180" : ""}`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1a1f2e] text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 h-full z-50 transform transition-transform
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </div>
    </>
  );
}