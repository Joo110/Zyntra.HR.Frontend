import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./topbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f8fc]">
      <style>{`
        .content-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(15,23,42,0.18) transparent;
        }
        .content-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .content-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .content-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(15,23,42,0.18);
          border-radius: 9999px;
        }
        .content-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(15,23,42,0.28);
        }
      `}</style>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMobileMenuClick={() => setMobileOpen(true)} />
        <main className="content-scroll flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}