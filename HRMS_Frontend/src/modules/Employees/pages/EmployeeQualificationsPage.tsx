import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddQualificationModal from "./AddQualificationModal";

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
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Employee Qualifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track educational qualifications, certifications, and training</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Qualifications
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Qualifications"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white"
        />
        {[
          { val: typeFilter, set: setTypeFilter, opts: ["All Types", "Degree", "Certification", "Training"] },
          { val: statusFilter, set: setStatusFilter, opts: ["All Statuses", "Verified", "Pending", "Rejected"] },
          { val: levelFilter, set: setLevelFilter, opts: ["All Levels", "Bachelor's", "Master's", "PhD"] },
        ].map(({ val, set, opts }) => (
          <select key={val} value={val} onChange={(e) => set(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
            {opts.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockQuals.map((q) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition relative">
            {/* Actions */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button className="text-gray-400 hover:text-gray-600"><Pencil size={14} /></button>
              <button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
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
              <span className="ml-1">Graduation Year</span>
            </div>

            {/* Level + Status badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Level: {q.level}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${q.status === "Verified" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {q.status === "Verified" ? "Degree" : "Degree"}
              </span>
              {q.status === "Verified" && (
                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Verified</span>
              )}
            </div>

            {/* University info */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>🏛</span> {q.university}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>📚</span> Field: {q.field}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>⭐</span> Grade: {q.gpa}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddQualificationModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}