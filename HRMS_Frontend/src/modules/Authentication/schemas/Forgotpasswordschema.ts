import { validateEmail } from "./loginSchema";

// ─── Re-export shared validator ───────────────────────────────────────────────
export { validateEmail };

// ─── Password Validation (for Reset Password) ─────────────────────────────────
const PASSWORD_REGEX = {
  minLength: /.{8,}/,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

export function validateNewPassword(value: string): string {
  if (!value) return "Password is required.";
  if (!PASSWORD_REGEX.minLength.test(value))
    return "Password must be at least 8 characters.";
  if (!PASSWORD_REGEX.hasUpper.test(value))
    return "Password must contain at least one uppercase letter (A-Z).";
  if (!PASSWORD_REGEX.hasLower.test(value))
    return "Password must contain at least one lowercase letter (a-z).";
  if (!PASSWORD_REGEX.hasNumber.test(value))
    return "Password must contain at least one number (0-9).";
  if (!PASSWORD_REGEX.hasSpecial.test(value))
    return "Password must contain at least one special character (!@#$%...).";
  return "";
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}