import React, { useState } from "react";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import DocumentUploadModal from "./DocumentUploadModal";
import DocumentViewModal from "./DocumentViewModal";

export interface Document {
  id: string;
  employee: string;
  employeeId: string;
  employeeName: string;
  departmentKey: string;
  typeKey: string;
  salary: string;
  joinDate: string;
  status: "active" | "expired";
  expiryDate?: string | null;
}

const mockDocs: Document[] = Array.from({ length: 8 }, () => ({
  id: "CNT-2024-001",
  employee: "Mohamed Morsy",
  employeeId: "EMP-1024",
  employeeName: "Mohamed Morsy",
  departmentKey: "it",
  typeKey: "medicalCertificate",
  salary: "AED 28,000",
  joinDate: "24/5/2026",
  status: "active",
  expiryDate: "Mar 2027",
}));

const statusStyles: Record<Document["status"], string> = {
  active:  "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-500",
};

export default function EmployeeDocumentsPage() {
  const { t } = useTranslation("employees");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
  const [viewDoc, setViewDoc] = useState<Document | null>(null);

  const typeOptions = [
    { value: "all",                    label: t("documentsPage.filters.allTypes") },
    { value: "medicalCertificate",     label: t("documents.types.medicalCertificate") },
    { value: "nationalId",             label: t("documents.types.nationalId") },
    { value: "educationalCertificates",label: t("documents.types.educationalCertificates") },
  ];

  const statusOptions = [
    { value: "all",     label: t("contractsPage.filters.allStatuses") },
    { value: "active",  label: t("contract.statuses.active") },
    { value: "expired", label: t("contract.statuses.expired") },
  ];

  const tableHeaders = [
    t("contractsPage.table.contractId"),
    t("contractsPage.table.employee"),
    t("employee.fields.department"),
    t("documentsPage.table.type"),
    t("employee.fields.salary"),
    t("contractsPage.table.joinDate"),
    t("employeesPage.table.status"),
    t("employeesPage.table.actions"),
  ];

  const filtered = mockDocs.filter((d) =>
    d.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {t("documentsPage.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t("documentsPage.description")}
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Upload size={15} />
          {t("documents.uploadButton")}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("documentsPage.searchPlaceholder")}
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />
        {[
          { value: typeFilter,   setter: setTypeFilter,   options: typeOptions },
          { value: statusFilter, setter: setStatusFilter, options: statusOptions },
        ].map(({ value, setter, options }) => (
          <select
            key={value}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
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
            {filtered.map((d, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{d.id}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.employee}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {t(`contract.departments.${d.departmentKey}`)}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {t(`documents.types.${d.typeKey}`)}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.salary}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.joinDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[d.status]}`}>
                    {t(`contract.statuses.${d.status}`)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewDoc(d)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
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

      {showUpload && <DocumentUploadModal onClose={() => setShowUpload(false)} />}
      {viewDoc && <DocumentViewModal doc={viewDoc} onClose={() => setViewDoc(null)} />}
    </div>
  );
}