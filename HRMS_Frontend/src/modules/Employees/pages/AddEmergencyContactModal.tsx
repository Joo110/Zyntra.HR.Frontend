import React from "react";
import { X } from "lucide-react";

interface Props { onClose: () => void }

function Field({ label, placeholder, textarea }: { label: string; placeholder?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />
      )}
    </div>
  );
}

export default function AddEmergencyContactModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Emergency Contact</h2>
            <p className="text-xs text-gray-400">Add a new emergency contact for an employee</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Employee Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Employee Information</h3>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Employee ID *" placeholder="e.g. EMP-1024" />
              <Field label="Employee Name *" placeholder="e.g. Ahmed Hassan" />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Department *</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">Select</option>
                  <option>Engineering</option>
                  <option>IT Technology</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Emergency Contact Information</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Contact Name *" placeholder="e.g. yousef massoud" />
                <Field label="Relationship *" placeholder="" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Primary Phone *" placeholder="e.g. +571 4 123 4567" />
                <Field label="Alternate Phone (Optional)" placeholder="e.g. +571 4 123 4567" />
              </div>
              <Field label="Email Address *" placeholder="e.g. contact@email.com" />
              <Field label="Address" placeholder="Villa 42, Al Wasl District, Dubai, UAE" />
              <Field label="Notes (Optional)" placeholder="Any additional information..." textarea />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition">Cancel</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Add Contact</button>
        </div>
      </div>
    </div>
  );
}