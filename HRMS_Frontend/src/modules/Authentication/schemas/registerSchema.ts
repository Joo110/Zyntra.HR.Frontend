import { PasswordStrength } from "../types/auth.types";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  REGEX,
} from "./loginSchema";

// ─── Re-export shared validators ──────────────────────────────────────────────
export { validateEmail, validatePassword, getPasswordStrength, REGEX };

// ─── Name Validation ───────────────────────────────────────────────
export function validateName(value: string, t: any): string {
  if (!value.trim()) {
    return t("validation.name.required");
  }

  if (value.trim().length < 3) {
    return t("validation.name.min");
  }

  if (value.trim().length > 50) {
    return t("validation.name.max");
  }

  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value.trim())) {
    return t("validation.name.pattern");
  }

  return "";
}

// ─── Confirm Password Validation ──────────────────────────────────
export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
  t: any
): string {
  if (!confirmPassword) {
    return t("validation.confirmPassword.required");
  }

  if (password !== confirmPassword) {
    return t("validation.confirmPassword.match");
  }

  return "";
}