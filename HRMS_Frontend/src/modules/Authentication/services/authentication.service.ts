import Cookies from "js-cookie";
import {
  LoginFormValues,
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
  ResetPasswordResponse,
  ForgotPasswordResponse,
} from "../types/auth.types";

// ─── Base URL ───────────────────────────────────────────────
const BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://hrsysapi.runasp.net/api/v1";

// ─── Helper: Safe JSON parsing ──────────────────────────────
async function safeJson(response: Response) {
  return response.json().catch(() => ({}));
}

// ─── Login Service ───────────────────────────────────────────
export async function loginService(
  credentials: Pick<LoginFormValues, "email" | "password">,
  t?: any
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
  });

  const json = await safeJson(response);

  if (!response.ok) {
    throw new Error(
       "Login failed."
    );
  }

  const token = json?.data?.accessToken;
  const role = json?.data?.roles?.[0];

  if (token) {
    Cookies.set("token", token, {
      expires: 7,
      secure: false,
      sameSite: "lax",
    });
  }

  if (role) {
    Cookies.set("role", role, {
      expires: 7,
      secure: false,
      sameSite: "lax",
    });
  }

  return json;
}

// ─── Forgot Password Service ────────────────────────────────
export async function forgotPasswordService(
  email: string,
  t?: any
): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${BASE_URL}/Auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  const json = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      json?.message ||
        "Failed to send reset email."
    );
  }

  return json;
}

// ─── Register Service ───────────────────────────────────────
export async function registerService(
  data: Omit<RegisterFormValues, "confirmPassword">,
  t?: any
): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    }),
  });

  const json = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      json?.message ||
        "Registration failed."
    );
  }

  return json;
}

// ─── Reset Password Service ────────────────────────────────
export async function resetPasswordService(
  token: string,
  password: string,
  t?: any
): Promise<ResetPasswordResponse> {
  const response = await fetch(`${BASE_URL}/Auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const json = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      json?.message ||
        "Failed to reset password."
    );
  }

  return json;
}