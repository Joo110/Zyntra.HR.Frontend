import React, { useEffect, useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeDTO, EmployeeFormState } from "../types/employee";
import EmployeesPage from "./EmployeesPage";
import EmployeeProfile from "./Employeeprofile";
import AddEmployeeModal from "./Addemployeemodal";
import EditEmployeeModal from "./Editemployeemodal";

type View = "list" | "profile";

export default function EmployeesContainer() {
  const {
    employees,
    totalCount,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    search,
    goToPage,
  } = useEmployees({ pageSize: 20 });

  const [view, setView] = useState<View>("list");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDTO | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<EmployeeDTO | null>(null);

  useEffect(() => {
    fetchEmployees(1, "");
  }, [fetchEmployees]);

  const handleView = (emp: EmployeeDTO) => {
    setSelectedEmployee(emp);
    setView("profile");
  };

  const handleBack = () => {
    setSelectedEmployee(null);
    setView("list");
  };

  const handleAdd = async (form: EmployeeFormState) => {
    await addEmployee(form);
    setShowAdd(false);
  };

  const handleUpdate = async (form: EmployeeFormState) => {
    if (!editTarget) return;

    await updateEmployee(editTarget.id, form, editTarget.status);

    if (selectedEmployee?.id === editTarget.id) {
      setSelectedEmployee((prev) =>
        prev
          ? {
              ...prev,
              firstName: form.firstName,
              middleName: form.middleName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
            }
          : prev
      );
    }

    setEditTarget(null);
  };

  const handleDelete = async (id: string) => {
    await deleteEmployee(id);
    if (selectedEmployee?.id === id) handleBack();
  };

  return (
    <>
      {view === "list" && (
        <EmployeesPage
          employees={employees}
          totalCount={totalCount}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalPages={totalPages}
          loading={loading}
          error={error}
          onView={(emp: EmployeeDTO) => handleView(emp)}
          onEdit={(emp: EmployeeDTO) => setEditTarget(emp)}
          onAdd={() => setShowAdd(true)}
          onDelete={handleDelete}
          onSearch={search}
          onPageChange={goToPage}
        />
      )}

      {view === "profile" && selectedEmployee && (
        <EmployeeProfile
          employee={selectedEmployee}
          onBack={handleBack}
          onEdit={(emp: EmployeeDTO) => setEditTarget(emp)}
        />
      )}

      {showAdd && (
        <AddEmployeeModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAdd}
        />
      )}

      {editTarget && (
        <EditEmployeeModal
          employee={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}