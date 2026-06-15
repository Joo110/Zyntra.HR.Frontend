import Cookies from "js-cookie";
import {
  LoginFormValues,
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
  ResetPasswordResponse,
  ForgotPasswordResponse,
} from "../types/auth.types";

// ─── Base URL ────────────────────────────────────────────────────────────────
const BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://localhost:57334/api/v1";

// ─── Login ────────────────────────────────────────────────────────────────────
export async function loginService(
  credentials: Pick<LoginFormValues, "email" | "password">
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json?.message || "Login failed. Please try again.");
  }

  // ✅ IMPORTANT: backend returns data.accessToken
  const token = json?.data?.accessToken;
  const role = json?.data?.roles?.[0];

  if (token) {
    Cookies.set("token", token, {
      expires: 7,
      secure: false, // ⚠️ مهم للـ localhost
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

// ─── Forgot Password ──────────────────────────────────────────────────────────
export async function forgotPasswordService(
  email: string
): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${BASE_URL}/Auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json?.message || "Failed to send reset email.");
  }

  return json;
}

// ─── Register ─────────────────────────────────────────────────────────────────
export async function registerService(
  data: Omit<RegisterFormValues, "confirmPassword">
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

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json?.message || "Registration failed. Please try again.");
  }

  return json;
}

// ─── Reset Password ───────────────────────────────────────────────────────────
export async function resetPasswordService(
  token: string,
  password: string
): Promise<ResetPasswordResponse> {
  const response = await fetch(`${BASE_URL}/Auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json?.message || "Failed to reset password. Please try again.");
  }

  return json;
}