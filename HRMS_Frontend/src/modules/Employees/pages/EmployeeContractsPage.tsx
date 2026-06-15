import React, { useState } from "react";
import { Eye, Pencil, Trash2, Download } from "lucide-react";
import ContractViewModal from "./ContractViewModal";
import ContractEditModal from "./ContractEditModal";

export interface Contract {
  id: string;
  employee: string;
  department: string;
  type: string;
  salary: string;
  joinDate: string;
  status: "Active" | "Inactive" | "Expired";
}

const mockContracts: Contract[] = Array.from({ length: 8 }, (_, i) => ({
  id: "CNT-2024-001",
  employee: "Mohamed Morsy",
  department: "IT Technology",
  type: "Permanent",
  salary: "AED 28,000",
  joinDate: "24/5/2026",
  status: "Active",
}));

export default function EmployeeContractsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [viewContract, setViewContract] = useState<Contract | null>(null);
  const [editContract, setEditContract] = useState<Contract | null>(null);

  const filtered = mockContracts.filter((c) =>
    c.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Employee Contracts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage employment contracts and track renewal dates
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Contracts"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />
        {[
          { val: typeFilter, set: setTypeFilter, opts: ["All Type", "Permanent", "Temporary"] },
          { val: statusFilter, set: setStatusFilter, opts: ["All Statuses", "Active", "Inactive", "Expired"] },
          { val: deptFilter, set: setDeptFilter, opts: ["All Departments", "IT Technology", "Engineering", "HR"] },
        ].map(({ val, set, opts }) => (
          <select
            key={val}
            value={val}
            onChange={(e) => set(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          >
            {opts.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["CONTRACT ID", "EMPLOYEE", "DEPARTMENT", "TYPE", "SALARY", "JOIN DATE", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 px-4 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{c.id}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.employee}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.department}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.type}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.salary}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.joinDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewContract(c)} className="text-blue-500 hover:text-blue-700">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => setEditContract(c)} className="text-gray-400 hover:text-gray-600">
                      <Pencil size={15} />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewContract && (
        <ContractViewModal contract={viewContract} onClose={() => setViewContract(null)} onEdit={() => { setEditContract(viewContract); setViewContract(null); }} />
      )}
      {editContract && (
        <ContractEditModal contract={editContract} onClose={() => setEditContract(null)} />
      )}
    </div>
  );
}