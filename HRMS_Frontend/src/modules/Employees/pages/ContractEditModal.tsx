import React, { useState } from "react";
import { X } from "lucide-react";
import { Contract } from "./EmployeeContractsPage";

interface Props {
  contract: Contract;
  onClose: () => void;
}

function InputField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
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

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function ContractEditModal({ contract, onClose }: Props) {
  const [form, setForm] = useState({
    type: "Permanent",
    status: "Active",
    startDate: "Jan 15, 2022",
    endDate: "",
    duration: "Indefinite",
    salary: "32000",
    signedDate: "Jan 10, 2022",
    renewalDate: "",
    department: "Engineering",
  });

  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Contract</h2>
            <p className="text-xs text-gray-400">Update contract information for Ahmed Hassan Al-Mansouri</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Contract Type *" value={form.type} onChange={set("type")} options={["Permanent", "Temporary", "Freelance"]} />
              <SelectField label="Status *" value={form.status} onChange={set("status")} options={["Active", "Inactive", "Expired"]} />
              <InputField label="Start Date *" value={form.startDate} onChange={set("startDate")} />
              <InputField label="End Date *" value={form.endDate} onChange={set("endDate")} />
              <InputField label="Duration *" value={form.duration} onChange={set("duration")} />
              <InputField label="Salary (AED) *" value={form.salary} onChange={set("salary")} type="number" />
              <InputField label="Signed Date *" value={form.signedDate} onChange={set("signedDate")} />
              <InputField label="Renewal Date" value={form.renewalDate} onChange={set("renewalDate")} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Employment Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Department *" value={form.department} onChange={set("department")} options={["Engineering", "IT Technology", "HR", "Finance"]} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}