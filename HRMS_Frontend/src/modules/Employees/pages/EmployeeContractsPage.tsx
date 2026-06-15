import React, { useState } from "react";
import { Eye, Pencil, Trash2, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import ContractViewModal from "./ContractViewModal";
import ContractEditModal from "./ContractEditModal";

export interface Contract {
  id: string;
  employee: string;
  department: string;
  type: string;
  salary: string;
  joinDate: string;
  status: "active" | "inactive" | "expired";
  employeeName: string;
}

const mockContracts: Contract[] = Array.from({ length: 8 }, () => ({
  id: "CNT-2024-001",
  employee: "Mohamed Morsy",
  employeeName: "Mohamed Morsy",
  department: "it",
  type: "permanent",
  salary: "AED 28,000",
  joinDate: "24/5/2026",
  status: "active",
}));

const statusStyles: Record<Contract["status"], string> = {
  active:   "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
  expired:  "bg-red-100 text-red-500",
};

export default function EmployeeContractsPage() {
  const { t } = useTranslation("employees");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [viewContract, setViewContract] = useState<Contract | null>(null);
  const [editContract, setEditContract] = useState<Contract | null>(null);

  const typeOptions = [
    { value: "all",       label: t("contractsPage.filters.allTypes") },
    { value: "permanent", label: t("contract.types.permanent") },
    { value: "temporary", label: t("contract.types.temporary") },
  ];

  const statusOptions = [
    { value: "all",      label: t("contractsPage.filters.allStatuses") },
    { value: "active",   label: t("contract.statuses.active") },
    { value: "inactive", label: t("contract.statuses.inactive") },
    { value: "expired",  label: t("contract.statuses.expired") },
  ];

  const deptOptions = [
    { value: "all",         label: t("contractsPage.filters.allDepartments") },
    { value: "it",          label: t("contract.departments.it") },
    { value: "engineering", label: t("contract.departments.engineering") },
    { value: "hr",          label: t("contract.departments.hr") },
  ];

  const tableHeaders = [
    t("contractsPage.table.contractId"),
    t("contractsPage.table.employee"),
    t("employee.fields.department"),
    t("employee.fields.contractType"),
    t("employee.fields.salary"),
    t("contractsPage.table.joinDate"),
    t("employeesPage.table.status"),
    t("employeesPage.table.actions"),
  ];

  const filtered = mockContracts.filter((c) =>
    c.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {t("contractsPage.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t("contractsPage.description")}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Download size={15} />
          {t("contractsPage.exportButton")}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("contractsPage.searchPlaceholder")}
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />
        {[
          { value: typeFilter,   setter: setTypeFilter,   options: typeOptions },
          { value: statusFilter, setter: setStatusFilter, options: statusOptions },
          { value: deptFilter,   setter: setDeptFilter,   options: deptOptions },
        ].map(({ value, setter, options }) => (
          <select
            key={value}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {tableHeaders.map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-400 px-4 py-3 whitespace-nowrap"
                >
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
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {t(`contract.departments.${c.department}`)}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {t(`contract.types.${c.type}`)}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.salary}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.joinDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[c.status]}`}>
                    {t(`contract.statuses.${c.status}`)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewContract(c)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setEditContract(c)}
                      className="text-gray-400 hover:text-gray-600"
                    >
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
        <ContractViewModal
          contract={viewContract}
          onClose={() => setViewContract(null)}
          onEdit={() => { setEditContract(viewContract); setViewContract(null); }}
        />
      )}
      {editContract && (
        <ContractEditModal
          contract={editContract}
          onClose={() => setEditContract(null)}
        />
      )}
    </div>
  );
}