import React, { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Contract } from "./EmployeeContractsPage";

interface Props {
  contract: Contract;
  onClose: () => void;
}

function InputField({ label, value, onChange, type = "text" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ContractEditModal({ contract, onClose }: Props) {
  const { t } = useTranslation("employees");

  const [form, setForm] = useState({
    type: "permanent",
    status: "active",
    startDate: "Jan 15, 2022",
    endDate: "",
    duration: "Indefinite",
    salary: "32000",
    signedDate: "Jan 10, 2022",
    renewalDate: "",
    department: "Engineering",
  });

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const contractTypeOptions = [
    { value: "permanent", label: t("contract.types.permanent") },
    { value: "temporary", label: t("contract.types.temporary") },
    { value: "freelance",  label: t("contract.types.freelance") },
  ];

  const statusOptions = [
    { value: "active",   label: t("contract.statuses.active") },
    { value: "inactive", label: t("contract.statuses.inactive") },
    { value: "expired",  label: t("contract.statuses.expired") },
  ];

  const departmentOptions = [
    { value: "Engineering",   label: t("contract.departments.engineering") },
    { value: "IT Technology", label: t("contract.departments.it") },
    { value: "HR",            label: t("contract.departments.hr") },
    { value: "Finance",       label: t("contract.departments.finance") },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("contract.modal.title")}
            </h2>
            <p className="text-xs text-gray-400">
              {t("contract.modal.description", { name: contract.employeeName })}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Contract Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("contract.sections.contractInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label={`${t("employee.fields.contractType")} *`}
                value={form.type}
                onChange={set("type")}
                options={contractTypeOptions}
              />
              <SelectField
                label={`${t("contract.fields.status")} *`}
                value={form.status}
                onChange={set("status")}
                options={statusOptions}
              />
              <InputField
                label={`${t("contract.fields.startDate")} *`}
                value={form.startDate}
                onChange={set("startDate")}
              />
              <InputField
                label={`${t("contract.fields.endDate")} *`}
                value={form.endDate}
                onChange={set("endDate")}
              />
              <InputField
                label={`${t("contract.fields.duration")} *`}
                value={form.duration}
                onChange={set("duration")}
              />
              <InputField
                label={`${t("contract.fields.salary")} *`}
                value={form.salary}
                onChange={set("salary")}
                type="number"
              />
              <InputField
                label={`${t("contract.fields.signedDate")} *`}
                value={form.signedDate}
                onChange={set("signedDate")}
              />
              <InputField
                label={t("contract.fields.renewalDate")}
                value={form.renewalDate}
                onChange={set("renewalDate")}
              />
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("contract.sections.employmentInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label={`${t("employee.fields.department")} *`}
                value={form.department}
                onChange={set("department")}
                options={departmentOptions}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition"
          >
            {t("employee.cancel")}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {t("employee.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}