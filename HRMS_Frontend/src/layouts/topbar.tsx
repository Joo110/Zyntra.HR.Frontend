import React from "react";
import { Search, Bell, Calendar, ChevronDown } from "lucide-react";

interface TopbarProps {
  onLangToggle: () => void;
}

export default function Topbar({ onLangToggle }: TopbarProps) {

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-xs ml-8 lg:ml-0">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ms-auto">
        {/* Date */}
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar size={14} />
          <span>May 21, 2021</span>
        </div>

     

        {/* Bell */}
        <button className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            MM
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">Mohamed Morsy</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}