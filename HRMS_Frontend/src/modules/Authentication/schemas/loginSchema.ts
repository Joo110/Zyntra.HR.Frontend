import { PasswordStrength } from "../types/auth.types";

// ─── Regex Patterns ───────────────────────────────────────────────────────────
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

// ─── Email Validation ─────────────────────────────────────────────────────────
export function validateEmail(value: string): string {
  if (!value.trim()) return "Email is required.";
  if (!REGEX.email.test(value.trim()))
    return "Please enter a valid email address (e.g. name@example.com).";
  return "";
}

// ─── Password Validation ──────────────────────────────────────────────────────
export function validatePassword(value: string): string {
  if (!value) return "Password is required.";
  if (!REGEX.password.minLength.test(value))
    return "Password must be at least 8 characters.";
  if (!REGEX.password.hasUpper.test(value))
    return "Password must contain at least one uppercase letter (A-Z).";
  if (!REGEX.password.hasLower.test(value))
    return "Password must contain at least one lowercase letter (a-z).";
  if (!REGEX.password.hasNumber.test(value))
    return "Password must contain at least one number (0-9).";
  if (!REGEX.password.hasSpecial.test(value))
    return "Password must contain at least one special character (!@#$%...).";
  return "";
}

// ─── Password Strength ────────────────────────────────────────────────────────
export function getPasswordStrength(value: string): PasswordStrength {
  let score = 0;
  if (REGEX.password.minLength.test(value)) score++;
  if (REGEX.password.hasUpper.test(value)) score++;
  if (REGEX.password.hasLower.test(value)) score++;
  if (REGEX.password.hasNumber.test(value)) score++;
  if (REGEX.password.hasSpecial.test(value)) score++;
  if (value.length >= 12) score++;

  if (score <= 2) return { label: "Weak",      color: "#ef4444", width: "25%"  };
  if (score <= 3) return { label: "Fair",      color: "#f97316", width: "50%"  };
  if (score <= 4) return { label: "Good",      color: "#eab308", width: "75%"  };
  return           { label: "Strong 💪",   color: "#22c55e", width: "100%" };
}