import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const documents = [
  { id: 1, titleKey: "nationalId",             uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 2, titleKey: "educationalCertificates", uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 3, titleKey: "nationalId",             uploaded: "Jan 10, 2022", expires: "Mar 15, 2028" },
  { id: 4, titleKey: "medicalCertificate",     uploaded: "Jan 14, 2022", expires: null },
  { id: 5, titleKey: "bankDetails",            uploaded: "Jan 14, 2022", expires: null },
  { id: 6, titleKey: "employmentContract",     uploaded: "Jan 14, 2022", expires: null },
];

export default function DocumentsTab() {
  const { t } = useTranslation("employees");

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">
          {t("documents.title")}
        </h2>
        <button className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <ArrowDownTrayIcon className="w-4 h-4 rotate-180" />
          {t("documents.uploadButton")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-100 rounded-xl p-4 flex flex-col gap-1"
          >
            <p className="text-sm font-semibold text-gray-800">
              {t(`documents.types.${doc.titleKey}`)}
            </p>
            <p className="text-xs text-gray-400">
              {t("documents.uploaded", { date: doc.uploaded })}
            </p>
            <p className="text-xs text-gray-400">
              {t("documents.expires", {
                date: doc.expires ?? t("documents.noExpiry"),
              })}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-50 transition">
                <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                {t("documents.actions.download")}
              </button>
              <button className="text-xs border border-gray-200 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-50 transition">
                {t("documents.actions.preview")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}