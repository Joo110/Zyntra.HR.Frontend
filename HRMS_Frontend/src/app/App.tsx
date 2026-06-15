import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../modules/Authentication/pages/LoginPage";
import { RegisterPage } from "../modules/Authentication/schemas";
import ForgotPasswordPage from "../modules/Authentication/pages/ForgotPasswordPage";

import DashboardLayout from "../layouts/Dashboardlayout";
import DashboardHomePage from "../layouts/DashboardPage";
import EmployeesModule from "../modules/Employees/pages/EmployeesModule";

// Employee Profile + Tabs
import EmployeeProfile from "../modules/Employees/pages/Employeeprofile";
//import PersonalInfoTab from "../modules/Employees/pages/PersonalInfoTab";
import EmploymentTab from "../modules/Employees/pages/EmploymentTab";
import DocumentsTab from "../modules/Employees/pages/DocumentsTab";
import AttendanceTab from "../modules/Employees/pages/AttendanceTab";
import PayrollTab from "../modules/Employees/pages/PayrollTab";
import PerformanceTab from "../modules/Employees/pages/PerformanceTab";

// Standalone HR pages
import EmployeeContractsPage from "../modules/Employees/pages/EmployeeContractsPage";
import EmployeeDocumentsPage from "../modules/Employees/pages/EmployeeDocumentsPage";
import EmployeeQualificationsPage from "../modules/Employees/pages/EmployeeQualificationsPage";
import EmergencyContactsPage from "../modules/Employees/pages/EmergencyContactsPage";

function PlaceholderPage({ page }: { page: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-4xl mb-3">🚧</p>
        <h2 className="text-lg font-semibold text-gray-700 capitalize">{page}</h2>
        <p className="text-sm text-gray-400 mt-1">This page is under construction.</p>
      </div>
    </div>
  );
}



export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Dashboard shell */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHomePage />} />

        {/* Employees list */}
        <Route path="/employees" element={<EmployeesModule />} />

        {/* Employee profile nested tabs */}
        <Route path="/employees/:id" element={<EmployeeProfile />}>
          <Route index element={<Navigate to="personal-info" replace />} />
          <Route path="employment"    element={<EmploymentTab />} />
          <Route path="documents"     element={<DocumentsTab />} />
          <Route path="attendance"    element={<AttendanceTab />} />
          <Route path="payroll"       element={<PayrollTab />} />
          <Route path="performance"   element={<PerformanceTab />} />
        </Route>

        {/* HR standalone pages */}
        <Route path="/employee-contracts"    element={<EmployeeContractsPage />} />
        <Route path="/employee-documents"    element={<EmployeeDocumentsPage />} />
        <Route path="/employee-qualifications" element={<EmployeeQualificationsPage />} />
        <Route path="/emergency-contacts"    element={<EmergencyContactsPage />} />

        {/* Placeholder pages */}
        <Route path="/departments"       element={<PlaceholderPage page="departments" />} />
        <Route path="/attendance"        element={<PlaceholderPage page="attendance" />} />
        <Route path="/leave-management"  element={<PlaceholderPage page="leave management" />} />
        <Route path="/payroll"           element={<PlaceholderPage page="payroll" />} />
        <Route path="/recruitment"       element={<PlaceholderPage page="recruitment" />} />
        <Route path="/performance"       element={<PlaceholderPage page="performance" />} />
        <Route path="/self-service"      element={<PlaceholderPage page="self service" />} />
        <Route path="/finance"           element={<PlaceholderPage page="finance" />} />
        <Route path="/reports"           element={<PlaceholderPage page="reports" />} />
        <Route path="/branches"          element={<PlaceholderPage page="branches" />} />
        <Route path="/roles-permissions" element={<PlaceholderPage page="roles & permissions" />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}