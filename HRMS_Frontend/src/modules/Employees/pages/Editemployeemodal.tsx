import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  EmployeeDTO,
  EmployeeFormState,
  FormErrors,
  Department,
  Position,
  Branch,
  Manager,
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
  CONTRACT_TYPE_LABELS,
} from "../types/employee";
import EmployeeFormFields from "./Employeeformfields";
import { validateEmployeeForm, hasErrors } from "../schemas/vaildationemployee";

function dtoToForm(emp: EmployeeDTO): EmployeeFormState {
  return {
    firstName: emp.firstName ?? "",
    middleName: emp.middleName ?? "",
    lastName: emp.lastName ?? "",
    dateOfBirth: emp.dateOfBirth?.slice(0, 10) ?? "",
    gender: GENDER_LABELS[emp.gender] ?? "",
    nationality: emp.nationality ?? "",
    nationalId: emp.nationalId ?? "",
    maritalStatus: MARITAL_STATUS_LABELS[emp.maritalStatus] ?? "",
    email: emp.email ?? "",
    phone: emp.phone ?? "",
    mobile: emp.mobile ?? "",
    address: emp.address ?? "",
    city: emp.city ?? "",
    country: emp.country ?? "",
    hireDate: emp.hireDate?.slice(0, 10) ?? "",
    contractType: CONTRACT_TYPE_LABELS[emp.contractType] ?? "",
    departmentId: emp.departmentId ?? "",
    positionId: emp.positionId ?? "",
    branchId: emp.branchId ?? "",
    managerId: emp.managerId ?? "",
    basicSalary: emp.basicSalary != null ? String(emp.basicSalary) : "",
    emergencyContactName: emp.emergencyContactName ?? "",
    emergencyContactRelationship: emp.emergencyContactRelationship ?? "",
    emergencyContactPhone: emp.emergencyContactPhone ?? "",
  };
}

interface EditEmployeeModalProps {
  employee: EmployeeDTO;
  onClose: () => void;
  onSave: (form: EmployeeFormState) => Promise<void>;
  departments?: Department[];
  positions?: Position[];
  branches?: Branch[];
  managers?: Manager[];
  lookupsLoading?: boolean;
}

export default function EditEmployeeModal({
  employee,
  onClose,
  onSave,
  departments,
  positions,
  branches,
  managers,
  lookupsLoading,
}: EditEmployeeModalProps) {
  const { t } = useTranslation("employees");
  const [form, setForm] = useState<EmployeeFormState>(() => dtoToForm(employee));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setForm(dtoToForm(employee));
    setErrors({});
    setApiError(null);
  }, [employee]);

  const handleChange = (field: keyof EmployeeFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    const validationErrors = validateEmployeeForm(form, true);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setApiError(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : t("employee.genericError")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fullName = `${employee.firstName} ${employee.middleName ?? ""} ${employee.lastName}`.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-6 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {t("employee.editProfile")}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {t("employee.updateProfile", { name: fullName })}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-4 overflow-y-auto max-h-[70vh]">
          {apiError && (
            <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {apiError}
            </div>
          )}

          <EmployeeFormFields
            data={form}
            onChange={handleChange}
            errors={errors}
            isEdit
            departments={departments}
            positions={positions}
            branches={branches}
            managers={managers}
            lookupsLoading={lookupsLoading}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium disabled:opacity-50"
          >
            {t("employee.cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-[#4F8EF7] text-white rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-70"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            {submitting ? t("employee.saving") : t("employee.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}