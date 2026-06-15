import React from "react";
import { ChevronDown } from "lucide-react";
import {
  EmployeeFormState,
  FormErrors,
  Department,
  Position,
  Branch,
  Manager,
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
  CONTRACT_TYPE_LABELS,
  Gender,
  MaritalStatus,
  ContractType,
} from "../types/employee";

// ─── Nationalities (static list) ─────────────────────────────────────────────

export const NATIONALITIES = [
  "Afghan","Albanian","Algerian","American","Argentinian","Australian",
  "Austrian","Bangladeshi","Belgian","Brazilian","British","Bulgarian",
  "Canadian","Chilean","Chinese","Colombian","Croatian","Czech","Danish",
  "Dutch","Egyptian","Emirati","Ethiopian","Filipino","Finnish","French",
  "German","Greek","Hungarian","Indian","Indonesian","Iranian","Iraqi",
  "Irish","Israeli","Italian","Japanese","Jordanian","Kenyan","Korean",
  "Kuwaiti","Lebanese","Libyan","Malaysian","Moroccan","Mexican",
  "New Zealander","Nigerian","Norwegian","Omani","Pakistani","Peruvian",
  "Polish","Portuguese","Qatari","Romanian","Russian","Saudi","Serbian",
  "Singaporean","South African","Spanish","Sri Lankan","Sudanese",
  "Swedish","Swiss","Syrian","Thai","Tunisian","Turkish","Ukrainian",
  "Venezuelan","Vietnamese","Yemeni",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface EmployeeFormFieldsProps {
  data: EmployeeFormState;
  onChange: (field: keyof EmployeeFormState, value: string) => void;
  errors?: FormErrors;
  isEdit?: boolean;
  // Lookup data loaded from API
  departments?: Department[];
  positions?: Position[];
  branches?: Branch[];
  managers?: Manager[];
  lookupsLoading?: boolean;
}

// ─── Reusable field components ────────────────────────────────────────────────

function FieldWrapper({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

function inputCls(error?: string) {
  return `border ${
    error ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
  } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 text-gray-700 placeholder-gray-400 w-full`;
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required,
  error,
  disabled,
}: {
  label: string;
  name: keyof EmployeeFormState;
  value: string;
  options: { value: string; label: string }[];
  onChange: (field: keyof EmployeeFormState, value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${inputCls(error)} appearance-none pr-8 bg-white disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer`}
        >
          <option value=""></option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </FieldWrapper>
  );
}

function TextField({
  label,
  name,
  value,
  placeholder,
  onChange,
  required,
  error,
  type = "text",
}: {
  label: string;
  name: keyof EmployeeFormState;
  value: string;
  placeholder?: string;
  onChange: (field: keyof EmployeeFormState, value: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
}) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputCls(error)}
      />
    </FieldWrapper>
  );
}

function DateField({
  label,
  name,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  name: keyof EmployeeFormState;
  value: string;
  onChange: (field: keyof EmployeeFormState, value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputCls(error)}
      />
    </FieldWrapper>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-gray-900 mt-5 mb-3 pb-2 border-b border-gray-100">
      {children}
    </h3>
  );
}

// ─── Gender / MaritalStatus / ContractType options ────────────────────────────

const genderOptions = Object.values(Gender)
  .filter((v) => typeof v === "number")
  .map((v) => ({
    value: GENDER_LABELS[v as Gender],
    label: GENDER_LABELS[v as Gender],
  }));

const maritalOptions = Object.values(MaritalStatus)
  .filter((v) => typeof v === "number")
  .map((v) => ({
    value: MARITAL_STATUS_LABELS[v as MaritalStatus],
    label: MARITAL_STATUS_LABELS[v as MaritalStatus],
  }));

const contractOptions = Object.values(ContractType)
  .filter((v) => typeof v === "number")
  .map((v) => ({
    value: CONTRACT_TYPE_LABELS[v as ContractType],
    label: CONTRACT_TYPE_LABELS[v as ContractType],
  }));

// ─── Main export ──────────────────────────────────────────────────────────────

export default function EmployeeFormFields({
  data,
  onChange,
  errors = {},
  departments = [],
  positions = [],
  branches = [],
  managers = [],
  lookupsLoading = false,
}: EmployeeFormFieldsProps) {
  // Filter positions by selected department
  const filteredPositions = data.departmentId
    ? positions.filter(
        (p) => !p.departmentId || p.departmentId === data.departmentId
      )
    : positions;

  const deptOptions = departments.map((d) => ({ value: d.id, label: d.name }));
  const posOptions = filteredPositions.map((p) => ({ value: p.id, label: p.name }));
  const branchOptions = branches.map((b) => ({ value: b.id, label: b.name }));
  const managerOptions = managers.map((m) => ({
    value: m.id,
    label: m.fullName,
  }));

  return (
    <div>
      {/* ── Personal Information ─────────────────────────────────────────── */}
      <SectionTitle>Personal Information</SectionTitle>

      <div className="grid grid-cols-3 gap-3">
        <TextField
          label="First Name"
          name="firstName"
          value={data.firstName}
          placeholder="Sarah"
          onChange={onChange}
          required
          error={errors.firstName}
        />
        <TextField
          label="Middle Name"
          name="middleName"
          value={data.middleName}
          placeholder="Ali"
          onChange={onChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={data.lastName}
          placeholder="Mansour"
          onChange={onChange}
          required
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <DateField
          label="Date of Birth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={onChange}
          required
          error={errors.dateOfBirth}
        />
        <SelectField
          label="Gender"
          name="gender"
          value={data.gender}
          options={genderOptions}
          onChange={onChange}
          required
          error={errors.gender}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <SelectField
          label="Nationality"
          name="nationality"
          value={data.nationality}
          options={NATIONALITIES.map((n) => ({ value: n, label: n }))}
          onChange={onChange}
          required
          error={errors.nationality}
        />
        <TextField
          label="National ID"
          name="nationalId"
          value={data.nationalId}
          placeholder="784-1990-1234567-8"
          onChange={onChange}
          required
          error={errors.nationalId}
        />
      </div>

      <div className="mt-3">
        <SelectField
          label="Marital Status"
          name="maritalStatus"
          value={data.maritalStatus}
          options={maritalOptions}
          onChange={onChange}
        />
      </div>

      {/* ── Contact Information ──────────────────────────────────────────── */}
      <SectionTitle>Contact Information</SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Email Address"
          name="email"
          value={data.email}
          placeholder="ahmed@company.com"
          onChange={onChange}
          required
          type="email"
          error={errors.email}
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={data.phone}
          placeholder="+971 50 123 4567"
          onChange={onChange}
          required
          error={errors.phone}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <TextField
          label="Mobile"
          name="mobile"
          value={data.mobile}
          placeholder="+971 50 987 6543"
          onChange={onChange}
        />
        <TextField
          label="City"
          name="city"
          value={data.city}
          placeholder="Dubai"
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <TextField
          label="Country"
          name="country"
          value={data.country}
          placeholder="UAE"
          onChange={onChange}
        />
        <div /> {/* spacer */}
      </div>

      <div className="mt-3">
        <TextField
          label="Address"
          name="address"
          value={data.address}
          placeholder="Villa 42, Al Wasi District, Dubai, UAE"
          onChange={onChange}
        />
      </div>

      {/* ── Employment Details ───────────────────────────────────────────── */}
      <SectionTitle>Employment Details</SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Department"
          name="departmentId"
          value={data.departmentId}
          options={deptOptions}
          onChange={(field, value) => {
            onChange(field, value);
            // reset position when dept changes
            onChange("positionId", "");
          }}
          required
          error={errors.departmentId}
          disabled={lookupsLoading}
        />
        <SelectField
          label="Job Title / Position"
          name="positionId"
          value={data.positionId}
          options={posOptions}
          onChange={onChange}
          required
          error={errors.positionId}
          disabled={lookupsLoading || !data.departmentId}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <SelectField
          label="Branch"
          name="branchId"
          value={data.branchId}
          options={branchOptions}
          onChange={onChange}
          required
          error={errors.branchId}
          disabled={lookupsLoading}
        />
        <SelectField
          label="Contract Type"
          name="contractType"
          value={data.contractType}
          options={contractOptions}
          onChange={onChange}
          required
          error={errors.contractType}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <DateField
          label="Hire Date"
          name="hireDate"
          value={data.hireDate}
          onChange={onChange}
          required
          error={errors.hireDate}
        />
        <TextField
          label="Basic Salary (AED)"
          name="basicSalary"
          value={data.basicSalary}
          placeholder="15000"
          onChange={onChange}
          type="number"
          error={errors.basicSalary}
        />
      </div>

      <div className="mt-3">
        <SelectField
          label="Manager"
          name="managerId"
          value={data.managerId}
          options={managerOptions}
          onChange={onChange}
          disabled={lookupsLoading}
        />
      </div>

      {/* ── Emergency Contact ────────────────────────────────────────────── */}
      <SectionTitle>Emergency Contact</SectionTitle>

      <div className="grid grid-cols-3 gap-3">
        <TextField
          label="Contact Name"
          name="emergencyContactName"
          value={data.emergencyContactName}
          placeholder="Sarah Al-Mansouri"
          onChange={onChange}
        />
        <SelectField
          label="Relationship"
          name="emergencyContactRelationship"
          value={data.emergencyContactRelationship}
          options={[
            "Spouse", "Parent", "Sibling", "Child", "Friend", "Other",
          ].map((r) => ({ value: r, label: r }))}
          onChange={onChange}
        />
        <TextField
          label="Phone Number"
          name="emergencyContactPhone"
          value={data.emergencyContactPhone}
          placeholder="+971 50 765 4321"
          onChange={onChange}
        />
      </div>
    </div>
  );
}