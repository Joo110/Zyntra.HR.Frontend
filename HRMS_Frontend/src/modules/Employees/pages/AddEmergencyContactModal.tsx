import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("employees");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("emergencyContact.modal.title")}
            </h2>
            <p className="text-xs text-gray-400">
              {t("emergencyContact.modal.description")}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Employee Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("emergencyContact.sections.employeeInfo")}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Field
                label={t("emergencyContact.fields.employeeId")}
                placeholder={t("emergencyContact.placeholders.employeeId")}
              />
              <Field
                label={t("emergencyContact.fields.employeeName")}
                placeholder={t("emergencyContact.placeholders.employeeName")}
              />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("employee.fields.department")} *
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">{t("emergencyContact.placeholders.selectDepartment")}</option>
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
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("emergencyContact.sections.contactInfo")}
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label={`${t("employee.fields.contactName")} *`}
                  placeholder={t("emergencyContact.placeholders.contactName")}
                />
                <Field
                  label={`${t("employee.fields.relationship")} *`}
                  placeholder=""
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label={`${t("emergencyContact.fields.primaryPhone")} *`}
                  placeholder={t("emergencyContact.placeholders.primaryPhone")}
                />
                <Field
                  label={t("emergencyContact.fields.alternatePhone")}
                  placeholder={t("emergencyContact.placeholders.alternatePhone")}
                />
              </div>
              <Field
                label={`${t("emergencyContact.fields.email")} *`}
                placeholder={t("emergencyContact.placeholders.email")}
              />
              <Field
                label={t("employee.fields.address")}
                placeholder={t("emergencyContact.placeholders.address")}
              />
              <Field
                label={t("emergencyContact.fields.notes")}
                placeholder={t("emergencyContact.placeholders.notes")}
                textarea
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition"
          >
            {t("employee.cancel")}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {t("emergencyContact.modal.addButton")}
          </button>
        </div>
      </div>
    </div>
  );
}