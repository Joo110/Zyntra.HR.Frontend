import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Contract } from "./EmployeeContractsPage";

interface Props {
  contract: Contract;
  onClose: () => void;
  onEdit: () => void;
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 min-h-[38px]">
        {value || ""}
      </div>
    </div>
  );
}

export default function ContractViewModal({ contract, onClose, onEdit }: Props) {
  const { t } = useTranslation("employees");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("contract.view.title")}
            </h2>
            <p className="text-xs text-gray-400">{contract.id}</p>
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
              <Field
                label={`${t("employee.fields.contractType")} *`}
                value={t(`contract.types.${contract.type?.toLowerCase() ?? "permanent"}`)}
              />
              <Field
                label={`${t("contract.fields.status")} *`}
                value={t(`contract.statuses.${contract.status?.toLowerCase() ?? "active"}`)}
              />
              <Field
                label={`${t("contract.fields.startDate")} *`}
                value={contract.startDate}
              />
              <Field
                label={`${t("contract.fields.endDate")} *`}
                value={contract.endDate}
              />
              <Field
                label={`${t("contract.fields.duration")} *`}
                value={contract.duration}
              />
              <Field
                label={`${t("contract.fields.salary")} *`}
                value={contract.salary}
              />
              <Field
                label={`${t("contract.fields.signedDate")} *`}
                value={contract.joinDate}
              />
              <Field
                label={t("contract.fields.renewalDate")}
                value={contract.joinDate}
              />
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("contract.sections.employmentInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label={`${t("employee.fields.department")} *`}
                value={contract.department}
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
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            {t("contract.view.editButton")}
          </button>
        </div>
      </div>
    </div>
  );
}