import React, { useState, useRef } from "react";
import { X, Upload, Info } from "lucide-react";

interface Props { onClose: () => void }

export default function DocumentUploadModal({ onClose }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Upload Document</h2>
            <p className="text-xs text-gray-400">Add a new employee document</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Employee Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Employee Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Employee ID *</label>
                <input defaultValue="#6456-25" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Employee Name *</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Document Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Document Type *</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  {["Medical Certificate", "National ID", "Educational Certificates", "Bank Details", "Employment Contract"].map((o) => <option key={o}>{o}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">This document has an expiry date</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Expiry Date *</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option>e.g., Mar 2027</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload File */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Upload File</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Document Type *</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  {["Engineering", "IT Technology", "HR", "Finance"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <Upload size={18} className="text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {file ? file.name : "Drag and drop your file here"}
                </p>
                {!file && <p className="text-xs text-gray-400 mb-3">or click to browse</p>}
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-1"
                >
                  <Upload size={12} /> Choose File
                </button>
                <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                <input ref={inputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
              </div>

              <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ensure all uploaded documents are clear, legible, and contain accurate information. Documents will be verified by the HR team.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition">Cancel</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Upload Document</button>
        </div>
      </div>
    </div>
  );
}