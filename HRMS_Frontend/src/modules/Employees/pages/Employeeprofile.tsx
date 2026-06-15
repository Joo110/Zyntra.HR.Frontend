import React from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import {
  EmployeeDTO,
  EmployeeStatus,
  EMPLOYEE_STATUS_LABELS,
} from "../types/employee";

type EmployeeProfileProps = {
  employee?: EmployeeDTO;
  onBack?: () => void;
  onEdit?: (emp: EmployeeDTO) => void;
};

function makeMockEmployee(id: string): EmployeeDTO {
  return {
    id,
    firstName:      "Mohamed",
    middleName:     "",
    lastName:       "Morsy",
    email:          "m.morsy@company.com",
    phone:          "+971 50 123 4567",
    mobile:         "",
    dateOfBirth:    "1990-03-12",
    gender:         0,
    maritalStatus:  1,
    nationalId:     "N/A",
    nationality:    "Egyptian",
    address:        "Dubai, UAE",
    city:           "Dubai",
    country:        "UAE",
    hireDate:       "2022-01-15",
    contractType:   0,
    status:         EmployeeStatus.Active,
    departmentId:   "",
    departmentName: "Engineering",
    positionId:     "",
    positionName:   "Senior UIUX Designer",
    branchId:       "",
    branchName:     "Dubai HQ",
    managerId:      "",
    managerName:    "Omar Khalil Ibrahim",
    basicSalary:    22000,
  };
}

export default function EmployeeProfile({
  employee,
  onBack,
  onEdit,
}: EmployeeProfileProps) {
  const { t } = useTranslation("employees");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const resolvedEmployee = employee ?? makeMockEmployee(id ?? "");
  const resolvedId = resolvedEmployee.id || id || "";

  const handleBack = onBack ?? (() => navigate("/employees"));
  const handleEdit = onEdit ?? ((_emp: EmployeeDTO) => navigate(`/employees/${resolvedId}/edit`));

  const fullName = [
    resolvedEmployee.firstName,
    resolvedEmployee.middleName,
    resolvedEmployee.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const statusKey = EMPLOYEE_STATUS_LABELS[resolvedEmployee.status]?.toLowerCase().replace(" ", "");

  const tabs = [
    { label: t("employeeProfile.tabs.personal"),    path: "personal-info" },
    { label: t("employeeProfile.tabs.employment"),  path: "employment"    },
    { label: t("employeeProfile.tabs.documents"),   path: "documents"     },
    { label: t("employeeProfile.tabs.attendance"),  path: "attendance"    },
    { label: t("employeeProfile.tabs.payroll"),     path: "payroll"       },
    { label: t("employeeProfile.tabs.performance"), path: "performance"   },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {fullName || t("employeeProfile.fallbackName")}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {t("employeeProfile.idLabel", { id: resolvedEmployee.id })}
              {resolvedEmployee.email ? ` • ${resolvedEmployee.email}` : ""}
              {resolvedEmployee.phone ? ` • ${resolvedEmployee.phone}` : ""}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                {t(`enums.employeeStatus.${statusKey}`)}
              </span>
              {resolvedEmployee.contractType === 0 && (
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                  {t("enums.contractType.fullTime")}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {t("employeeProfile.back")}
            </button>
            <button
              onClick={() => handleEdit(resolvedEmployee)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
            >
              <PencilIcon className="w-4 h-4" />
              {t("employeeProfile.editProfile")}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 px-6">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={`/employees/${resolvedId}/${tab.path}`}
                className={({ isActive }) =>
                  `whitespace-nowrap px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}