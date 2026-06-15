import React, { useState } from "react";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";
import DocumentUploadModal from "./DocumentUploadModal";
import DocumentViewModal from "./DocumentViewModal";

export interface Document {
  id: string;
  employee: string;
  department: string;
  type: string;
  salary: string;
  joinDate: string;
  status: string;
}

const mockDocs: Document[] = Array.from({ length: 8 }, () => ({
  id: "CNT-2024-001",
  employee: "Mohamed Morsy",
  department: "IT Technology",
  type: "Permanent",
  salary: "AED 28,000",
  joinDate: "24/5/2026",
  status: "Active",
}));

export default function EmployeeDocumentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showUpload, setShowUpload] = useState(false);
  const [viewDoc, setViewDoc] = useState<Document | null>(null);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Employee Document</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track all employee documentation</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Upload size={15} />
          Upload Document
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Documents"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
          {["All Types", "Medical Certificate", "National ID", "Educational Certificates"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
          {["All Statuses", "Active", "Expired"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["CONTRACT ID", "EMPLOYEE", "DEPARTMENT", "TYPE", "SALARY", "JOIN DATE", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockDocs.map((d, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{d.id}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.employee}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.department}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.type}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.salary}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.joinDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{d.status}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewDoc(d)} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></button>
                    <button className="text-gray-400 hover:text-gray-600"><Pencil size={15} /></button>
                    <button className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpload && <DocumentUploadModal onClose={() => setShowUpload(false)} />}
      {viewDoc && <DocumentViewModal doc={viewDoc} onClose={() => setViewDoc(null)} />}
    </div>
  );
}