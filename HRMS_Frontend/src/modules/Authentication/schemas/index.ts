export { default as LoginPage } from "../pages/LoginPage";
export { default as RegisterPage } from "../pages/RegisterPage";
export { default as LoginForm } from "../components/LoginForm";
export { default as RegisterForm } from "../components/Registerform";
export { useLoginForm } from "../hooks/useLogin";
export { useRegisterForm } from "../hooks/useRegister";
export { validateEmail, validatePassword, getPasswordStrength, REGEX } from "../schemas/loginSchema";
export { loginService, forgotPasswordService,registerService  } from "../services/authentication.service";
export type {
  LoginFormValues,
  LoginFormErrors,
  LoginFormTouched,
  RegisterFormValues,
  RegisterFormErrors,
  RegisterFormTouched,
  FieldStatus,
  PasswordStrength,
  LoginResponse,
  RegisterResponse,
} from "../types/auth.types";