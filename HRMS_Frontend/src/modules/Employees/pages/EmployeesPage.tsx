import React, { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  ChevronDown,
  Plus,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  EmployeeDTO,
  EMPLOYEE_STATUS_LABELS,
  EmployeeStatus,
} from "../types/employee";

interface EmployeesPageProps {
  employees: EmployeeDTO[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  onView: (emp: EmployeeDTO) => void;
  onEdit: (emp: EmployeeDTO) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
}

const STATUS_FILTER_OPTIONS = ["All Statuses", "Active", "Inactive", "On Leave"];

export default function EmployeesPage({
  employees,
  totalCount,
  pageNumber,
  pageSize,
  totalPages,
  loading,
  error,
  onView,
  onEdit,
  onAdd,
  onDelete,
  onSearch,
  onPageChange,
}: EmployeesPageProps) {
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    const t = setTimeout(() => onSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput, onSearch]);

  const filtered = employees.filter((e) => {
    if (statusFilter === "All Statuses") return true;
    return EMPLOYEE_STATUS_LABELS[e.status] === statusFilter;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onDelete(id);
    }
  };

  const statusColor: Record<EmployeeStatus, string> = {
    [EmployeeStatus.Active]: "bg-green-100 text-green-700",
    [EmployeeStatus.Inactive]: "bg-gray-100 text-gray-600",
    [EmployeeStatus.OnLeave]: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 min-h-screen bg-[#f7f8fc]">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalCount > 0 ? `${totalCount} employees total` : "Manage your employees"}
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#4F8EF7] text-white rounded-lg hover:bg-blue-600 transition font-medium self-start"
        >
          <Plus size={14} />
          Add Employee
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 bg-white text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-white text-gray-700 cursor-pointer min-w-[140px]"
            >
              {STATUS_FILTER_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                {["#", "Employee", "Department", "Position", "Branch", "Hire Date", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <Loader2 className="animate-spin mx-auto text-blue-400" size={24} />
                    <p className="text-sm text-gray-400 mt-2">Loading employees...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filtered.map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {(pageNumber - 1) * pageSize + idx + 1}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {emp.firstName?.[0]}
                          {emp.lastName?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {emp.firstName} {emp.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.departmentName?.trim() ? emp.departmentName : "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.positionName?.trim() ? emp.positionName : "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.branchName?.trim() ? emp.branchName : "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.hireDate ? new Date(emp.hireDate).toLocaleDateString("en-GB") : "—"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          statusColor[emp.status]
                        }`}
                      >
                        {EMPLOYEE_STATUS_LABELS[emp.status]}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView(emp)}
                          className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => onEdit(emp)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {totalCount} employees
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(pageNumber - 1)}
                disabled={pageNumber <= 1 || loading}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={loading}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                      page === pageNumber
                        ? "bg-[#4F8EF7] text-white border-[#4F8EF7]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => onPageChange(pageNumber + 1)}
                disabled={pageNumber >= totalPages || loading}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}