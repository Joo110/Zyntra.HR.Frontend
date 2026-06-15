import React from "react";
import { X, Info } from "lucide-react";
import { Document } from "./EmployeeDocumentsPage";

interface Props { doc: Document; onClose: () => void }

function ReadField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 min-h-[38px]">{value || ""}</div>
    </div>
  );
}

export default function DocumentViewModal({ doc, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Employee Document</h2>
            <p className="text-xs text-gray-400">Mohamed Morsy document details</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Employee Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Employee ID *</label>
                <select disabled className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-700">
                  <option>Permanent</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Employee Name *</label>
                <select disabled className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-700">
                  <option>Active</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Document Details</h3>
            <div className="space-y-3">
              <ReadField label="Document Type *" value="Medical Certificate" />
              <p className="text-xs text-gray-400 -mt-2">This document has an expiry date</p>
              <ReadField label="Expiry Date *" value="e.g., Mar 2027" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Upload File</h3>
            <ReadField label="Document Type *" value="Engineering" />
          </div>

          <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
            <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Ensure all uploaded documents are clear, legible, and contain accurate information. Documents will be verified by the HR team.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition">Delete</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Edit Document</button>
        </div>
      </div>
    </div>
  );
}