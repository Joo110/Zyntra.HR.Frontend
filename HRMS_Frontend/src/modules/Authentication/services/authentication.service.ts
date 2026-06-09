import { LoginFormValues, LoginResponse, RegisterFormValues, RegisterResponse , ResetPasswordResponse , ForgotPasswordResponse ,  } from "../types/auth.types";

// ─── Login ────────────────────────────────────────────────────────────────────
export async function loginService(
  credentials: Pick<LoginFormValues, "email" | "password">
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
  });

  const text = await response.text(); // 👈 أهم خطوة

  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = {};
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Login failed. Please try again.");
  }

  return data;
}

// ─── Forgot Password ──────────────────────────────────────────────────────────
export async function forgotPasswordService(email: string): Promise<{ message: string }> {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send reset email.");
  }

  return response.json(); // ← رجّع الـ response بدل ما تتجاهله
}

// ─── Register ─────────────────────────────────────────────────────────────────
export async function registerService(
  data: Omit<RegisterFormValues, "confirmPassword">
): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed. Please try again.");
  }

  return response.json();
}

 
// ─── Reset Password ───────────────────────────────────────────────────────────
export async function resetPasswordService(
  token: string,
  password: string
): Promise<ResetPasswordResponse> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
 
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to reset password. Please try again.");
  }
 
  return response.json();
}