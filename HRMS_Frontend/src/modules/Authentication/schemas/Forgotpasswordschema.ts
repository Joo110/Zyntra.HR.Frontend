import { validateEmail } from "./loginSchema";

// ─── Re-export shared validator ───────────────────────────────────────────────
export { validateEmail };

// ─── Password Regex ───────────────────────────────────────────────
const PASSWORD_REGEX = {
  minLength: /.{8,}/,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

// ─── New Password Validation ───────────────────────────────────────
export function validateNewPassword(value: string, t: any): string {
  if (!value) {
    return t("validation.password.required");
  }

  if (!PASSWORD_REGEX.minLength.test(value)) {
    return t("validation.password.minLength");
  }

  if (!PASSWORD_REGEX.hasUpper.test(value)) {
    return t("validation.password.hasUpper");
  }

  if (!PASSWORD_REGEX.hasLower.test(value)) {
    return t("validation.password.hasLower");
  }

  if (!PASSWORD_REGEX.hasNumber.test(value)) {
    return t("validation.password.hasNumber");
  }

  if (!PASSWORD_REGEX.hasSpecial.test(value)) {
    return t("validation.password.hasSpecial");
  }

  return "";
}

// ─── Confirm Password Validation ───────────────────────────────────
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