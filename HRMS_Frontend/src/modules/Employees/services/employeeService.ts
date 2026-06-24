import Cookies from "js-cookie";
import {
  EmployeeDTO,
  PaginatedResponse,
  CreateEmployeePayload,
  UpdateEmployeePayload,
} from "../types/employee";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://localhost:57334";
const API = `${BASE_URL}/Employees`;

type ApiEnvelope<T> = {
  success: boolean;
  message: string | null;
  data: T;
  errors?: string[];
  traceId?: string | null;
  timestamp?: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  let json: unknown = null;

  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const envelope = json as Partial<ApiEnvelope<unknown>> | null;
    const apiMessage =
      envelope?.message ||
      (Array.isArray(envelope?.errors) && envelope.errors.length > 0
        ? envelope.errors[0]
        : null);

    throw new Error(apiMessage ?? `Request failed: ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const envelope = json as Partial<ApiEnvelope<T>> | T;

  // API shape: { success, message, data, errors, traceId, timestamp }
  // We return only the inner data when present.
  if (
    typeof envelope === "object" &&
    envelope !== null &&
    "data" in envelope
  ) {
    return (envelope as ApiEnvelope<T>).data;
  }

  return envelope as T;
}

function getAuthHeaders(): HeadersInit {
  const token = Cookies.get("token");

  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export const employeeService = {
  /** GET /api/v1/Employees?pageNumber=&pageSize=&searchTerm= */
  getAll(params: {
    pageNumber?: number;
    pageSize?: number;
    searchTerm?: string;
  } = {}): Promise<PaginatedResponse<EmployeeDTO>> {
    const {
      pageNumber = 1,
      pageSize = 20,
      searchTerm = "",
    } = params;

    const query = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
      ...(searchTerm ? { searchTerm } : {}),
    });

    return fetch(`${API}?${query}`, {
      method: "GET",
      headers: getAuthHeaders(),
    }).then(handleResponse<PaginatedResponse<EmployeeDTO>>);
  },

  /** GET /api/v1/Employees/{id} */
  getById(id: string): Promise<EmployeeDTO> {
    return fetch(`${API}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    }).then(handleResponse<EmployeeDTO>);
  },

  /** POST /api/v1/Employees */
  create(payload: CreateEmployeePayload): Promise<EmployeeDTO> {
    return fetch(API, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }).then(handleResponse<EmployeeDTO>);
  },

  /** PUT /api/v1/Employees/{id} */
  update(id: string, payload: UpdateEmployeePayload): Promise<EmployeeDTO> {
    return fetch(`${API}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }).then(handleResponse<EmployeeDTO>);
  },

  /** DELETE /api/v1/Employees/{id} */
  delete(id: string): Promise<void> {
    return fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    }).then(handleResponse<void>);
  },
};