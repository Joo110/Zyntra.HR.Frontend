import React from "react";
import { useTranslation } from "react-i18next";

const employmentHistory = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    period: "Jan 2024 – Present • 1 year",
  },
  {
    id: 2,
    title: "Senior Software Engineer",
    department: "Engineering",
    period: "Jan 2024 – Present • 1 year",
  },
];

export default function EmploymentTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Current Employment */}
      <div className="border border-gray-100 rounded-xl p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          {t("employmentTab.currentEmployment")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employeeProfile.fields.department")}</p>
            <p className="text-sm font-medium text-gray-800">Engineering</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employmentTab.startDate")}</p>
            <p className="text-sm font-medium text-gray-800">January 15, 2022</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employeeProfile.fields.contractType")}</p>
            <p className="text-sm font-medium text-gray-800">Permanent</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employeeProfile.fields.manager")}</p>
            <p className="text-sm font-medium text-gray-800">Omar Khalil Ibrahim</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employeeProfile.fields.branch")}</p>
            <p className="text-sm font-medium text-gray-800">Dubai HQ</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("employmentTab.contractEndDate")}</p>
            <p className="text-sm font-medium text-gray-800">N/A</p>
          </div>
        </div>
      </div>

      {/* Employment History */}
      <div className="border border-gray-100 rounded-xl p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          {t("employmentTab.employmentHistory")}
        </h2>
        <div className="space-y-4">
          {employmentHistory.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-1 w-1 h-10 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.department}</p>
                <p className="text-xs text-gray-400">{item.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}