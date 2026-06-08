import { PasswordStrength } from "../types/auth.types";
import { validateEmail, validatePassword, getPasswordStrength, REGEX } from "./loginSchema";

// ─── Re-export shared validators ──────────────────────────────────────────────
export { validateEmail, validatePassword, getPasswordStrength, REGEX };

// ─── Name Validation ──────────────────────────────────────────────────────────
export function validateName(value: string): string {
  if (!value.trim()) return "Full name is required.";
  if (value.trim().length < 3) return "Name must be at least 3 characters.";
  if (value.trim().length > 50) return "Name must be less than 50 characters.";
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value.trim()))
    return "Name can only contain letters and spaces.";
  return "";
}

// ─── Confirm Password Validation ──────────────────────────────────────────────
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}