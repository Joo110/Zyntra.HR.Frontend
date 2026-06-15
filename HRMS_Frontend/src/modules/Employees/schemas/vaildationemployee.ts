import { EmployeeFormState, FormErrors } from "../types/employee";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

export function validateEmployeeForm(
  form: EmployeeFormState,
  isEdit = false
): FormErrors {
  const errors: FormErrors = {};

  // ── Personal ──────────────────────────────────────────────────────────────
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  else if (form.firstName.trim().length < 2)
    errors.firstName = "Must be at least 2 characters.";

  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  else if (form.lastName.trim().length < 2)
    errors.lastName = "Must be at least 2 characters.";

  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const dob = new Date(form.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (isNaN(dob.getTime())) errors.dateOfBirth = "Invalid date.";
    else if (age < 18) errors.dateOfBirth = "Employee must be at least 18 years old.";
    else if (age > 70) errors.dateOfBirth = "Please check the date of birth.";
  }

  if (!form.gender) errors.gender = "Gender is required.";
  if (!form.nationality.trim()) errors.nationality = "Nationality is required.";

  if (!form.nationalId.trim()) {
    errors.nationalId = "National ID is required.";
  } else if (form.nationalId.trim().length < 5) {
    errors.nationalId = "National ID seems too short.";
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  // ── Employment ────────────────────────────────────────────────────────────
  if (!form.departmentId) errors.departmentId = "Department is required.";
  if (!form.positionId) errors.positionId = "Job title / position is required.";
  if (!form.branchId) errors.branchId = "Branch is required.";
  if (!form.contractType) errors.contractType = "Contract type is required.";

  if (!form.hireDate) {
    errors.hireDate = "Hire date is required.";
  } else if (isNaN(new Date(form.hireDate).getTime())) {
    errors.hireDate = "Invalid hire date.";
  }

  if (form.basicSalary !== "") {
    const salary = Number(form.basicSalary);
    if (isNaN(salary) || salary < 0)
      errors.basicSalary = "Enter a valid salary amount.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}