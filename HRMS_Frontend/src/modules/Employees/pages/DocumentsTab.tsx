import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const documents = [
  { id: 1, title: "National ID", uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 2, title: "Educational Certificates", uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 3, title: "National ID", uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 4, title: "Medical Certificate", uploaded: "Jan 14, 2022", expires: "N/A" },
  { id: 5, title: "Bank Details", uploaded: "Jan 14, 2022", expires: "N/A" },
  { id: 6, title: "Employment Contract", uploaded: "Jan 14, 2022", expires: "N/A" },
];

export default function DocumentsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Employee Documents</h2>
        <button className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <ArrowDownTrayIcon className="w-4 h-4 rotate-180" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-100 rounded-xl p-4 flex flex-col gap-1"
          >
            <p className="text-sm font-semibold text-gray-800">{doc.title}</p>
            <p className="text-xs text-gray-400">Uploaded: {doc.uploaded}</p>
            <p className="text-xs text-gray-400">Expires: {doc.expires}</p>
            <div className="flex items-center gap-2 mt-3">
              <button className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-50 transition">
                <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                Download
              </button>
              <button className="text-xs border border-gray-200 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-50 transition">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}