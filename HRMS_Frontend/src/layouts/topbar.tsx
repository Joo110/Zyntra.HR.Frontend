import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, Calendar, ChevronDown, Menu, LogOut, Settings, UserCircle } from "lucide-react";

function useToday() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const now = new Date();
    setLabel(
      now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    );
  }, []);
  return label;
}

export default function Topbar({
  onMobileMenuClick,
}: {
  /** Optional: lets a parent layout open its own mobile drawer if it owns that state. */
  onMobileMenuClick?: () => void;
}) {
  const today = useToday();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the profile menu on outside click / escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center px-3 sm:px-4 lg:px-6 gap-2 sm:gap-3 sticky top-0 z-30 shrink-0">

      {/* ── Mobile Menu Button ── */}
      <button
        onClick={onMobileMenuClick}
        className="
          lg:hidden shrink-0 flex items-center justify-center
          w-9 h-9 rounded-lg
          text-gray-500 bg-gray-50 border border-gray-200
          hover:bg-gray-100 hover:text-gray-700
          active:scale-95
          transition-all
        "
        aria-label="Open menu"
      >
        <Menu size={17} strokeWidth={2.25} />
      </button>

      {/* ── Search ── */}
      <div className="flex-1 max-w-[180px] sm:max-w-xs lg:max-w-sm">
        <div className="relative group">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4F8EF7] transition-colors pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-9 pr-3 py-1.5 text-sm
              bg-gray-50 border border-gray-200 rounded-lg
              placeholder:text-gray-400
              focus:outline-none focus:border-[#4F8EF7] focus:ring-2 focus:ring-[#4F8EF7]/15 focus:bg-white
              hover:border-gray-300
              transition-all
            "
          />
          {/* subtle keyboard hint, desktop only */}
          <kbd className="hidden lg:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Right Side ── */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">

        {/* Date (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
          <Calendar size={13} className="text-gray-400" />
          <span>{today}</span>
        </div>

        {/* Bell */}
        <button
          className="relative p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1" />

        {/* Avatar + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`
              flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors
              ${menuOpen ? "bg-gray-100" : "hover:bg-gray-50"}
            `}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <div className="relative shrink-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#6C63FF] flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold shadow-sm">
                MM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 ring-2 ring-white" />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                Mohamed Morsy
              </p>
              <p className="text-[10px] text-gray-400 leading-tight">
                Admin
              </p>
            </div>

            <ChevronDown
              size={13}
              className={`text-gray-400 hidden sm:block transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div
              role="menu"
              className="
                absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg shadow-black/5
                border border-gray-100 py-1.5 z-50
                animate-[fadeIn_120ms_ease-out]
              "
            >
              <div className="px-3 py-2 border-b border-gray-50">
                <p className="text-xs font-semibold text-gray-700">Mohamed Morsy</p>
                <p className="text-[11px] text-gray-400 mt-0.5">mohamed.morsy@arabianmeem.com</p>
              </div>

              <button
                role="menuitem"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors text-left"
              >
                <UserCircle size={15} className="text-gray-400" />
                My profile
              </button>
              <button
                role="menuitem"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors text-left"
              >
                <Settings size={15} className="text-gray-400" />
                Settings
              </button>

              <div className="my-1 border-t border-gray-50" />

              <button
                role="menuitem"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}