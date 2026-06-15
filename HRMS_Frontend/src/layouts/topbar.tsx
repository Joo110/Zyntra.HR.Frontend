import React from "react";
import { Search, Bell, Calendar, ChevronDown, Menu } from "lucide-react";

export default function Topbar() {
  const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem("language", lang);
};
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-3 sm:px-4 lg:px-6 gap-3 sticky top-0 z-30 shrink-0">

      {/* ── Mobile Menu Button ── */}
      <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
        <Menu size={18} className="text-gray-600" />
      </button>

      {/* ── Search ── */}
      <div className="flex-1 max-w-[180px] sm:max-w-xs lg:max-w-sm">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-9 pr-3 py-1.5 text-sm
              bg-gray-50 border border-gray-200 rounded-lg
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100
              transition
            "
          />
        </div>
      </div>

      {/* ── Right Side ── */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">

        {/* Date (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
          <Calendar size={13} />
          <span>Jun 10, 2026</span>
        </div>

        {/* Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={17} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
  >
    🌐 {i18n.language === "ar" ? "العربية" : "English"}
    <ChevronDown size={14} />
  </button>

  {open && (
    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <button
        onClick={() => changeLanguage("en")}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        English
      </button>

      <button
        onClick={() => changeLanguage("ar")}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        العربية
      </button>
    </div>
  )}
</div>

        {/* Avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">

          {/* Avatar circle smaller on mobile */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#4F8EF7] flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold">
            MM
          </div>

          {/* Text hidden on mobile */}
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-gray-700 leading-tight">
              Mohamed Morsy
            </p>
            <p className="text-[10px] text-gray-400 leading-tight">
              Admin
            </p>
          </div>

          {/* Arrow hidden on mobile */}
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}