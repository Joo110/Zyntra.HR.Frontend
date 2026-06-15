// ─── Enums (matching API integers) ───────────────────────────────────────────

export enum Gender {
  Male = 0,
  Female = 1,
}

export enum MaritalStatus {
  Single = 0,
  Married = 1,
  Divorced = 2,
  Widowed = 3,
}

export enum ContractType {
  FullTime = 0,
  PartTime = 1,
  Contract = 2,
}

export enum EmployeeStatus {
  Active = 0,
  Inactive = 1,
  OnLeave = 2,
}

// ─── Label maps (for display) ─────────────────────────────────────────────────

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.Male]: "Male",
  [Gender.Female]: "Female",
};

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  [MaritalStatus.Single]: "Single",
  [MaritalStatus.Married]: "Married",
  [MaritalStatus.Divorced]: "Divorced",
  [MaritalStatus.Widowed]: "Widowed",
};

export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  [ContractType.FullTime]: "Full Time",
  [ContractType.PartTime]: "Part Time",
  [ContractType.Contract]: "Contract",
};

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  [EmployeeStatus.Active]: "Active",
  [EmployeeStatus.Inactive]: "Inactive",
  [EmployeeStatus.OnLeave]: "On Leave",
};

// ─── Lookup types (for dropdowns loaded from API) ─────────────────────────────

export interface Department {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
  departmentId?: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

// ─── API response shape (GET /Employees & GET /Employees/{id}) ────────────────

export interface EmployeeDTO {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  mobile?: string;
  dateOfBirth: string;          // ISO date string
  gender: Gender;
  maritalStatus: MaritalStatus;
  nationalId: string;
  nationality: string;
  address: string;
  city?: string;
  country?: string;
  hireDate: string;             // ISO date string
  contractType: ContractType;
  status: EmployeeStatus;
  departmentId: string;
  departmentName?: string;
  positionId: string;
  positionName?: string;
  branchId: string;
  branchName?: string;
  managerId?: string;
  managerName?: string;
  basicSalary: number;

  // Emergency contact — may or may not be in API response; kept for UI
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
}

// ─── Paginated list response ──────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// ─── Create payload (POST /Employees) ────────────────────────────────────────

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  mobile?: string;
  dateOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  nationalId: string;
  nationality: string;
  address: string;
  city?: string;
  country?: string;
  hireDate: string;
  contractType: ContractType;
  departmentId: string;
  positionId: string;
  branchId: string;
  managerId?: string;
  basicSalary: number;
}

// ─── Update payload (PUT /Employees/{id}) ────────────────────────────────────

export interface UpdateEmployeePayload {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  mobile?: string;
  dateOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  address: string;
  city?: string;
  country?: string;
  status: EmployeeStatus;
  departmentId: string;
  positionId: string;
  branchId: string;
  managerId?: string;
  basicSalary: number;
}

// ─── Form state used inside the UI ───────────────────────────────────────────

export interface EmployeeFormState {
  // Personal
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;           // string so <select> stays controlled; convert on submit
  nationality: string;
  nationalId: string;
  maritalStatus: string;

  // Contact
  email: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  country: string;

  // Employment
  hireDate: string;
  contractType: string;
  departmentId: string;
  positionId: string;
  branchId: string;
  managerId: string;
  basicSalary: string;

  // Emergency (local-only for now)
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
}

export const EMPTY_FORM: EmployeeFormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  nationalId: "",
  maritalStatus: "",
  email: "",
  phone: "",
  mobile: "",
  address: "",
  city: "",
  country: "",
  hireDate: "",
  contractType: "",
  departmentId: "",
  positionId: "",
  branchId: "",
  managerId: "",
  basicSalary: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
};

// ─── Validation errors ────────────────────────────────────────────────────────

export type FormErrors = Partial<Record<keyof EmployeeFormState, string>>;