import React from "react";
import { X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Document } from "./EmployeeDocumentsPage";

interface Props { doc: Document; onClose: () => void }

function ReadField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 min-h-[38px]">
        {value || ""}
      </div>
    </div>
  );
}

export default function DocumentViewModal({ doc, onClose }: Props) {
  const { t } = useTranslation("employees");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("documentView.modal.title")}
            </h2>
            <p className="text-xs text-gray-400">
              {t("documentView.modal.description", { name: doc.employeeName })}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Employee Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("emergencyContact.sections.employeeInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("emergencyContact.fields.employeeId")}
                </label>
                <select
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-700"
                >
                  <option>{doc.employeeId}</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("emergencyContact.fields.employeeName")}
                </label>
                <select
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-700"
                >
                  <option>{doc.employeeName}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("documentUpload.sections.documentDetails")}
            </h3>
            <div className="space-y-3">
              <ReadField
                label={t("documentUpload.fields.documentType")}
                value={t(`documents.types.${doc.typeKey}`)}
              />
              <p className="text-xs text-gray-400 -mt-2">
                {t("documentUpload.fields.expiryHint")}
              </p>
              <ReadField
                label={t("documentUpload.fields.expiryDate")}
                value={doc.expiryDate ?? t("documents.noExpiry")}
              />
            </div>
          </div>

          {/* Upload File */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("documentUpload.sections.uploadFile")}
            </h3>
            <ReadField
              label={t("documentUpload.fields.documentType")}
              value={t(`contract.departments.${doc.departmentKey}`)}
            />
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
            <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("documentUpload.infoNote")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-5">
          <button className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition">
            {t("documentView.actions.delete")}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {t("documentView.actions.edit")}
          </button>
        </div>
      </div>
    </div>
  );
}