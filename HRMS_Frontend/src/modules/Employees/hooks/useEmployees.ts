import { useState, useCallback, useRef } from "react";
import { employeeService } from "../services/employeeService";
import {
  EmployeeDTO,
  EmployeeFormState,
  CreateEmployeePayload,
  UpdateEmployeePayload,
  Gender,
  MaritalStatus,
  ContractType,
  EmployeeStatus,
} from "../types/employee";

function toGender(v: string): Gender {
  return v === "Female" ? Gender.Female : Gender.Male;
}

function toMaritalStatus(v: string): MaritalStatus {
  const map: Record<string, MaritalStatus> = {
    Single: MaritalStatus.Single,
    Married: MaritalStatus.Married,
    Divorced: MaritalStatus.Divorced,
    Widowed: MaritalStatus.Widowed,
  };
  return map[v] ?? MaritalStatus.Single;
}

function toContractType(v: string): ContractType {
  const map: Record<string, ContractType> = {
    "Full Time": ContractType.FullTime,
    "Part Time": ContractType.PartTime,
    Contract: ContractType.Contract,
  };
  return map[v] ?? ContractType.FullTime;
}

/** ISO date string without time (YYYY-MM-DD) → full ISO for API */
function toISODateTime(date: string): string {
  if (!date) return new Date().toISOString();
  return new Date(date).toISOString();
}

export function buildCreatePayload(form: EmployeeFormState): CreateEmployeePayload {
  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    middleName: form.middleName.trim() || undefined,
    email: form.email.trim(),
    phone: form.phone.trim(),
    mobile: form.mobile.trim() || undefined,
    dateOfBirth: toISODateTime(form.dateOfBirth),
    gender: toGender(form.gender),
    maritalStatus: toMaritalStatus(form.maritalStatus),
    nationalId: form.nationalId.trim(),
    nationality: form.nationality.trim(),
    address: form.address.trim(),
    city: form.city.trim() || undefined,
    country: form.country.trim() || undefined,
    hireDate: toISODateTime(form.hireDate),
    contractType: toContractType(form.contractType),
    departmentId: form.departmentId,
    positionId: form.positionId,
    branchId: form.branchId,
    managerId: form.managerId || "",
    basicSalary: Number(form.basicSalary) || 0,
  };
}

export function buildUpdatePayload(
  id: string,
  form: EmployeeFormState,
  currentStatus: EmployeeStatus
): UpdateEmployeePayload {
  return {
    id,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    middleName: form.middleName.trim() || undefined,
    email: form.email.trim(),
    phone: form.phone.trim(),
    mobile: form.mobile.trim() || undefined,
    dateOfBirth: toISODateTime(form.dateOfBirth),
    gender: toGender(form.gender),
    maritalStatus: toMaritalStatus(form.maritalStatus),
    address: form.address.trim(),
    city: form.city.trim() || undefined,
    country: form.country.trim() || undefined,
    status: currentStatus,
    departmentId: form.departmentId,
    positionId: form.positionId,
    branchId: form.branchId,
    managerId: form.managerId || "",
    basicSalary: Number(form.basicSalary) || 0,
  };
}

interface UseEmployeesOptions {
  pageSize?: number;
}

export function useEmployees({ pageSize = 20 }: UseEmployeesOptions = {}) {
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestId = useRef(0);

  const fetchEmployees = useCallback(
    async (page = 1, search = "") => {
      const id = ++requestId.current;
      setLoading(true);
      setError(null);

      try {
        const data = await employeeService.getAll({
          pageNumber: page,
          pageSize,
          searchTerm: search,
        });

        if (id !== requestId.current) return;

        setEmployees(data.items ?? []);
        setTotalCount(data.totalCount ?? 0);
        setPageNumber(page);
      } catch (err) {
        if (id !== requestId.current) return;
        setError(err instanceof Error ? err.message : "Failed to load employees.");
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [pageSize]
  );

  const addEmployee = useCallback(
    async (form: EmployeeFormState): Promise<EmployeeDTO> => {
      const payload = buildCreatePayload(form);
      const created = await employeeService.create(payload);
      await fetchEmployees(pageNumber, searchTerm);
      return created;
    },
    [fetchEmployees, pageNumber, searchTerm]
  );

  const updateEmployee = useCallback(
    async (
      id: string,
      form: EmployeeFormState,
      currentStatus: EmployeeStatus
    ): Promise<EmployeeDTO> => {
      const payload = buildUpdatePayload(id, form, currentStatus);
      const updated = await employeeService.update(id, payload);

      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
      );

      return updated;
    },
    []
  );

  const deleteEmployee = useCallback(
    async (id: string): Promise<void> => {
      await employeeService.delete(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setTotalCount((c) => Math.max(0, c - 1));
    },
    []
  );

  const search = useCallback(
    (term: string) => {
      setSearchTerm(term);
      fetchEmployees(1, term);
    },
    [fetchEmployees]
  );

  const goToPage = useCallback(
    (page: number) => {
      fetchEmployees(page, searchTerm);
    },
    [fetchEmployees, searchTerm]
  );

  return {
    employees,
    totalCount,
    pageNumber,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    search,
    goToPage,
  };
}