import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddQualificationModal from "./AddQualificationModal";
import { useTranslation } from "react-i18next";

interface Qualification {
  id: number;
  name: string;
  empId: string;
  degree: string;
  year: string;
  level: string;
  status: string;
  university: string;
  field: string;
  gpa: string;
}

const mockQuals: Qualification[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: "Ahmed Hassan Al-Mansouri",
  empId: "EMP-1024",
  degree: "Bachelor of Computer Science",
  year: "2012",
  level: "Bachelor's",
  status: i >= 3 ? "Verified" : "Degree",
  university: "UAE University",
  field: "Computer Science",
  gpa: "3.8 GPA",
}));

export default function EmployeeQualificationsPage() {
  const { t } = useTranslation("employees");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("allTypes");
  const [statusFilter, setStatusFilter] = useState("allStatuses");
  const [levelFilter, setLevelFilter] = useState("allLevels");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {t("qualificationsPage.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t("qualificationsPage.description")}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {t("qualificationsPage.addButton")}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("qualificationsPage.searchPlaceholder")}
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >
          <option value="allTypes">{t("qualificationsPage.filters.allTypes")}</option>
          <option value="degree">{t("qualification.types.degree")}</option>
          <option value="certification">{t("qualification.types.certification")}</option>
          <option value="training">{t("qualification.types.training")}</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >
          <option value="allStatuses">{t("qualificationsPage.filters.allStatuses")}</option>
          <option value="verified">{t("qualificationsPage.statuses.verified")}</option>
          <option value="pending">{t("qualificationsPage.statuses.pending")}</option>
          <option value="rejected">{t("qualificationsPage.statuses.rejected")}</option>
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >
          <option value="allLevels">{t("qualificationsPage.filters.allLevels")}</option>
          <option value="bachelor">{t("qualificationsPage.levels.bachelor")}</option>
          <option value="master">{t("qualificationsPage.levels.master")}</option>
          <option value="phd">{t("qualificationsPage.levels.phd")}</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockQuals.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition relative"
          >
            {/* Actions */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label={t("qualificationsPage.actions.edit")}
              >
                <Pencil size={14} />
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                aria-label={t("qualificationsPage.actions.delete")}
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-lg mb-2">
                AH
              </div>
              <p className="text-sm font-semibold text-gray-900">{q.name}</p>
              <p className="text-xs text-gray-400">{q.empId}</p>
            </div>

            {/* Degree */}
            <p className="text-sm font-semibold text-gray-800 mb-1">{q.degree}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
              <span>📅</span>
              <span>{q.year}</span>
              <span className="ml-1">{t("qualificationsPage.graduationYear")}</span>
            </div>

            {/* Level + Status badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                {t("qualificationsPage.levelLabel")}: {q.level}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  q.status === "Verified"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {t("qualification.types.degree")}
              </span>
              {q.status === "Verified" && (
                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  {t("qualificationsPage.statuses.verified")}
                </span>
              )}
            </div>

            {/* University info */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>🏛</span> {q.university}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>📚</span> {t("qualificationsPage.fieldLabel")}: {q.field}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>⭐</span> {t("qualificationsPage.gradeLabel")}: {q.gpa}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddQualificationModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}