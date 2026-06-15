import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/* ───── Modules ───── */

// Layout
import enLayout from "./layouts/translation/en.json";
import arLayout from "./layouts/translation/ar.json";

// Attendance
import enAttendance from "./modules/Attendance/translations/en.json";
import arAttendance from "./modules/Attendance/translations/ar.json";

// AuditLogs
import enAuditLogs from "./modules/AuditLogs/translations/en.json";
import arAuditLogs from "./modules/AuditLogs/translations/ar.json";

// Authentication
import enAuthentication from "./modules/Authentication/translations/en.json";
import arAuthentication from "./modules/Authentication/translations/ar.json";

// Branches
import enBranches from "./modules/Branches/translations/en.json";
import arBranches from "./modules/Branches/translations/ar.json";

// Dashboard
import enDashboard from "./modules/Dashboard/translations/en.json";
import arDashboard from "./modules/Dashboard/translations/ar.json";

// Departments
import enDepartments from "./modules/Departments/translations/en.json";
import arDepartments from "./modules/Departments/translations/ar.json";

// EmployeeSelfService
import enEmployeeSelfService from "./modules/EmployeeSelfService/translations/en.json";
import arEmployeeSelfService from "./modules/EmployeeSelfService/translations/ar.json";

// Employees
import enEmployees from "./modules/Employees/translations/en.json";
import arEmployees from "./modules/Employees/translations/ar.json";

// Finance
import enFinance from "./modules/Finance/translations/en.json";
import arFinance from "./modules/Finance/translations/ar.json";

// LeaveManagement
import enLeaveManagement from "./modules/LeaveManagement/translations/en.json";
import arLeaveManagement from "./modules/LeaveManagement/translations/ar.json";

// Notifications
import enNotifications from "./modules/Notifications/translations/en.json";
import arNotifications from "./modules/Notifications/translations/ar.json";

// Payroll
import enPayroll from "./modules/Payroll/translations/en.json";
import arPayroll from "./modules/Payroll/translations/ar.json";

// PerformanceManagement
import enPerformanceManagement from "./modules/PerformanceManagement/translations/en.json";
import arPerformanceManagement from "./modules/PerformanceManagement/translations/ar.json";

// Permissions
import enPermissions from "./modules/Permissions/translations/en.json";
import arPermissions from "./modules/Permissions/translations/ar.json";

// Positions
import enPositions from "./modules/Positions/translations/en.json";
import arPositions from "./modules/Positions/translations/ar.json";

// Recruitment
import enRecruitment from "./modules/Recruitment/translations/en.json";
import arRecruitment from "./modules/Recruitment/translations/ar.json";


/* ───── Init ───── */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        layout: enLayout,
        attendance: enAttendance,
        auditLogs: enAuditLogs,
        authentication: enAuthentication,
        branches: enBranches,
        dashboard: enDashboard,
        departments: enDepartments,
        employeeSelfService: enEmployeeSelfService,
        employees: enEmployees,
        finance: enFinance,
        leaveManagement: enLeaveManagement,
        notifications: enNotifications,
        payroll: enPayroll,
        performance: enPerformanceManagement,
        permissions: enPermissions,
        positions: enPositions,
        recruitment: enRecruitment,
      },

      ar: {
        layout: arLayout,
        attendance: arAttendance,
        auditLogs: arAuditLogs,
        authentication: arAuthentication,
        branches: arBranches,
        dashboard: arDashboard,
        departments: arDepartments,
        employeeSelfService: arEmployeeSelfService,
        employees: arEmployees,
        finance: arFinance,
        leaveManagement: arLeaveManagement,
        notifications: arNotifications,
        payroll: arPayroll,
        performance: arPerformanceManagement,
        permissions: arPermissions,
        positions: arPositions,
        recruitment: arRecruitment,
      },
    },
    lng: "ar",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;