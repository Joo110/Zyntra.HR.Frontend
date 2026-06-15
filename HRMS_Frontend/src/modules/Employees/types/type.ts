export type EmployeeStatus = "Active" | "Inactive" | "On Leave";
export type ContractType = "Full Time" | "Part Time" | "Contract";
export type Gender = "Male" | "Female";
export type MaritalStatus = "Single" | "Married" | "Divorced" | "Widowed";

export interface Employee {
  id: string;
  empId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  nationalId: string;
  maritalStatus: MaritalStatus;
  email: string;
  phone: string;
  address: string;
  department: string;
  jobTitle: string;
  branch: string;
  joinDate: string;
  startDate: string;
  contractType: ContractType;
  manager: string;
  monthlySalary: string;
  status: EmployeeStatus;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  avatar?: string;
}

export const DEPARTMENTS = [
  "IT Technology",
  "Engineering",
  "Sales",
  "Marketing",
  "HR",
  "Finance",
  "Operations",
];

export const BRANCHES = ["Cairo", "Dubai", "Riyadh", "London", "New York"];

export const NATIONALITIES = [
  "Egyptian",
  "Saudi",
  "Emirati",
  "Jordanian",
  "Lebanese",
  "British",
  "American",
];

export const MANAGERS = [
  "Ahmed Al-Rashid",
  "Fatima Al-Qahtani",
  "Khalid Al-Harbi",
  "Noura Al-Dosari",
];

export const mockEmployees: Employee[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  empId: `EMP-2025-${117 + i}`,
  firstName: "Mohamed",
  middleName: "Hassan",
  lastName: "Morsy",
  dateOfBirth: "1990-03-15",
  gender: "Male" as Gender,
  nationality: "Egyptian",
  nationalId: "784-1990-1234567-8",
  maritalStatus: "Married" as MaritalStatus,
  email: "ahmed.almansouri@arabianmeem.com",
  phone: "+971 50 123 4567",
  address: "Villa 42, Al Wasi District, Dubai, UAE",
  department: "IT Technology",
  jobTitle: "Senior UIUX Designer",
  branch: "Cairo",
  joinDate: "24/5/2026",
  startDate: "2026-05-24",
  contractType: "Full Time" as ContractType,
  manager: "Ahmed Al-Rashid",
  monthlySalary: "15000",
  status: "Active" as EmployeeStatus,
  emergencyContactName: "Sarah Al-Mansouri",
  emergencyContactRelationship: "Spouse",
  emergencyContactPhone: "+971 50 765 4321",
}));