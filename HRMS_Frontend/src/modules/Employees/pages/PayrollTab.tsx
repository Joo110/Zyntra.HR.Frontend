import React from "react";
import { ArrowDownTrayIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const payslips = [
  { month: "Apr 2026", gross: "AED 28,000", deductions: "AED 2,800", net: "AED 25,200" },
  { month: "Mar 2026", gross: "AED 28,000", deductions: "AED 2,800", net: "AED 25,200" },
  { month: "Feb 2026", gross: "AED 28,000", deductions: "AED 2,600", net: "AED 25,200" },
  { month: "Jan 2026", gross: "AED 28,000", deductions: "AED 2,800", net: "AED 25,200" },
];

export default function PayrollTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Current Month Breakdown */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <p className="text-sm text-gray-400 mb-4 font-medium">
          {t("payrollTab.currentMonthBreakdown")}
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">{t("payrollTab.baseSalary")}</p>
            <p className="text-lg font-bold">AED 22,000</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">{t("payrollTab.allowances")}</p>
            <p className="text-lg font-bold text-green-400">+ AED 6,000</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">{t("payrollTab.deductions")}</p>
            <p className="text-lg font-bold text-red-400">– AED 2,800</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 mb-1">{t("payrollTab.netSalary")}</p>
          <p className="text-2xl font-bold">AED 25,200</p>
        </div>
      </div>

      {/* Payslip History */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          {t("payrollTab.payslipHistory")}
        </h2>
        <div className="space-y-3">
          {payslips.map((slip) => (
            <div
              key={slip.month}
              className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <CurrencyDollarIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{slip.month}</p>
                  <p className="text-xs text-gray-400">
                    {t("payrollTab.gross")}: {slip.gross} • {t("payrollTab.dedt")}: {slip.deductions}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{slip.net}</p>
                  <p className="text-xs text-gray-400">{t("payrollTab.net")}</p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 transition"
                  title={t("payrollTab.download")}
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}