import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import {
  EmployeeFormState,
  EMPTY_FORM,
  FormErrors,
  Department,
  Position,
  Branch,
  Manager,
} from "../types/employee";
import EmployeeFormFields from "./Employeeformfields";
import { validateEmployeeForm, hasErrors } from "../schemas/vaildationemployee";

interface AddEmployeeModalProps {
  onClose: () => void;
  onAdd: (form: EmployeeFormState) => Promise<void>;
  // Lookup lists passed from parent (loaded once)
  departments?: Department[];
  positions?: Position[];
  branches?: Branch[];
  managers?: Manager[];
  lookupsLoading?: boolean;
}

export default function AddEmployeeModal({
  onClose,
  onAdd,
  departments,
  positions,
  branches,
  managers,
  lookupsLoading,
}: AddEmployeeModalProps) {
  const [form, setForm] = useState<EmployeeFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (field: keyof EmployeeFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateEmployeeForm(form, false);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      // scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      document
        .querySelector(`[name="${firstErrorKey}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setApiError(null);
    try {
      await onAdd(form);
      onClose();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-6 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Add New Employee</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the employee details to add them to the system
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
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-[#4F8EF7] text-white rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-70"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            {submitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}