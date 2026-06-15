import React from "react";
import { useTranslation } from "react-i18next";

type DayStatus = "present" | "late" | "absent" | "leave" | "weekend" | "future" | "today";

interface DayData {
  day: number;
  status: DayStatus;
}

const calendarDays: (DayData | null)[] = [
  null, null, null, null,
  { day: 1, status: "present" },
  { day: 2, status: "weekend" },
  { day: 3, status: "weekend" },
  { day: 4, status: "present" },
  { day: 5, status: "present" },
  { day: 6, status: "late" },
  { day: 7, status: "present" },
  { day: 8, status: "present" },
  { day: 9, status: "weekend" },
  { day: 10, status: "weekend" },
  { day: 11, status: "present" },
  { day: 12, status: "present" },
  { day: 13, status: "present" },
  { day: 14, status: "present" },
  { day: 15, status: "present" },
  { day: 16, status: "weekend" },
  { day: 17, status: "weekend" },
  { day: 18, status: "leave" },
  { day: 19, status: "leave" },
  { day: 20, status: "present" },
  { day: 21, status: "present" },
  { day: 22, status: "present" },
  { day: 23, status: "weekend" },
  { day: 24, status: "weekend" },
  { day: 25, status: "late" },
  { day: 26, status: "present" },
  { day: 27, status: "today" },
  { day: 28, status: "future" },
  { day: 29, status: "future" },
  { day: 30, status: "weekend" },
];

const statusStyles: Record<DayStatus, string> = {
  present: "bg-green-100 text-green-700",
  late: "bg-orange-100 text-orange-600",
  absent: "bg-red-100 text-red-500",
  leave: "bg-blue-100 text-blue-500",
  weekend: "text-gray-300",
  future: "text-gray-400",
  today: "border-2 border-blue-500 text-gray-700 font-bold",
};

export default function AttendanceTab() {
  const { t } = useTranslation("employees");

  const weekDays = [
    t("attendance.weekDays.mon"),
    t("attendance.weekDays.tue"),
    t("attendance.weekDays.wed"),
    t("attendance.weekDays.thu"),
    t("attendance.weekDays.fri"),
    t("attendance.weekDays.sat"),
    t("attendance.weekDays.sun"),
  ];

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-5">
        {t("attendance.overview")}
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
            <span className="text-xs text-green-700 font-medium">
              {t("attendance.status.present")}
            </span>
          </div>
          <p className="text-3xl font-bold text-green-700">18</p>
        </div>

        <div className="bg-orange-50 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs">!</span>
            <span className="text-xs text-orange-600 font-medium">
              {t("attendance.status.late")}
            </span>
          </div>
          <p className="text-3xl font-bold text-orange-500">2</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">✕</span>
            <span className="text-xs text-red-500 font-medium">
              {t("attendance.status.absent")}
            </span>
          </div>
          <p className="text-3xl font-bold text-red-400">0</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">↗</span>
            <span className="text-xs text-blue-500 font-medium">
              {t("attendance.status.onLeave")}
            </span>
          </div>
          <p className="text-3xl font-bold text-blue-400">2</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="border border-gray-100 rounded-xl p-4">
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} />;
            const style = statusStyles[cell.status];
            return (
              <div
                key={cell.day}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${style}`}
              >
                {cell.day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}