export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

export interface LoginFormTouched {
  email: boolean;
  password: boolean;
}

export type FieldStatus = "idle" | "error" | "success";

export interface PasswordStrength {
  label: string;
  color: string;
  width: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// ─── Register ─────────────────────────────────────────────────────────────────
export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormTouched {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}

export interface ForgotPasswordFormValues {
  email: string;
}
 
export interface ForgotPasswordFormErrors {
  email: string;
}
 
export interface ForgotPasswordFormTouched {
  email: boolean;
}
 
export interface ForgotPasswordResponse {
  message: string;
}
 
// ─── Reset Password ───────────────────────────────────────────────────────────
export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}
 
export interface ResetPasswordFormErrors {
  password: string;
  confirmPassword: string;
}
 
export interface ResetPasswordFormTouched {
  password: boolean;
  confirmPassword: boolean;
}
 
export interface ResetPasswordResponse {
  message: string;
};
 
