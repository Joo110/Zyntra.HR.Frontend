import { PasswordStrength } from "../types/auth.types";

// ─── Regex Patterns ───────────────────────────────────────────────
export const REGEX = {
  email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  password: {
    minLength: /.{8,}/,
    hasUpper: /[A-Z]/,
    hasLower: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  },
};

// ─── Email Validation ─────────────────────────────────────────────
export function validateEmail(value: string, t: any): string {
  if (!value.trim()) {
    return t("validation.email.required");
  }

  if (!REGEX.email.test(value.trim())) {
    return t("validation.email.invalid");
  }

  return "";
}

// ─── Password Validation ──────────────────────────────────────────
export function validatePassword(value: string, t: any): string {
  if (!value) {
    return t("validation.password.required");
  }

  if (!REGEX.password.minLength.test(value)) {
    return t("validation.password.minLength");
  }

  if (!REGEX.password.hasUpper.test(value)) {
    return t("validation.password.hasUpper");
  }

  if (!REGEX.password.hasLower.test(value)) {
    return t("validation.password.hasLower");
  }

  if (!REGEX.password.hasNumber.test(value)) {
    return t("validation.password.hasNumber");
  }

  if (!REGEX.password.hasSpecial.test(value)) {
    return t("validation.password.hasSpecial");
  }

  return "";
}

// ─── Name Validation ──────────────────────────────────────────────
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

// ─── Password Strength ───────────────────────────────────────────
export function getPasswordStrength(
  value: string,
  t: any
): PasswordStrength {
  let score = 0;

  if (REGEX.password.minLength.test(value)) score++;
  if (REGEX.password.hasUpper.test(value)) score++;
  if (REGEX.password.hasLower.test(value)) score++;
  if (REGEX.password.hasNumber.test(value)) score++;
  if (REGEX.password.hasSpecial.test(value)) score++;
  if (value.length >= 12) score++;

  if (score <= 2) {
    return {
      label: t("validation.password.strength.weak"),
      color: "#ef4444",
      width: "25%",
    };
  }

  if (score <= 3) {
    return {
      label: t("validation.password.strength.fair"),
      color: "#f97316",
      width: "50%",
    };
  }

  if (score <= 4) {
    return {
      label: t("validation.password.strength.good"),
      color: "#eab308",
      width: "75%",
    };
  }

  return {
    label: t("validation.password.strength.strong"),
    color: "#22c55e",
    width: "100%",
  };
}