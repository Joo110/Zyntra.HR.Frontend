import { useState } from "react";
import {
  LoginFormValues,
  LoginFormErrors,
  LoginFormTouched,
  FieldStatus,
} from "../types/auth.types";
import { validateEmail, validatePassword, getPasswordStrength, REGEX } from "../schemas/loginSchema";
import { loginService, forgotPasswordService } from "../services/authentication.service";
import { useNavigate } from "react-router-dom";
// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    remember: false,
    
  });
const navigate = useNavigate();
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<LoginFormTouched>({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Derived ───────────────────────────────────────────────────────────────
  const emailStatus: FieldStatus =
    !touched.email ? "idle" : errors.email ? "error" : "success";

  const passwordStatus: FieldStatus =
    !touched.password ? "idle" : errors.password ? "error" : "success";

  const passwordStrength =
    values.password.length > 0 ? getPasswordStrength(values.password) : null;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(values.email) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, password: val }));
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({ ...prev, password: validatePassword(values.password) }));
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, remember: e.target.checked }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleForgotPassword = async () => {
    if (!values.email.trim()) {
      alert("Enter your email first, then click Forgot Password.");
      return;
    }
    if (!REGEX.email.test(values.email.trim())) {
      alert("Please enter a valid email to reset your password.");
      return;
    }
    try {
      await forgotPasswordService(values.email);
      alert(`Reset link sent to: ${values.email.trim()}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    setLoading(true);
    try {
      const response = await loginService({
        email: values.email,
        password: values.password,
      });

console.log("Login success:", response);

// مثال: لو عندك token
// localStorage.setItem("token", response.token);

navigate("/dashboard");      // TODO: save token, redirect
    } catch (err: any) {
      setApiError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    touched,
    loading,
    showPassword,
    apiError,
    emailStatus,
    passwordStatus,
    passwordStrength,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleRememberChange,
    toggleShowPassword,
    handleForgotPassword,
    handleSubmit,
  };
}