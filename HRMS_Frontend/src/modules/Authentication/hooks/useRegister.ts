import { useState } from "react";
import {
  RegisterFormValues,
  RegisterFormErrors,
  RegisterFormTouched,
  FieldStatus,
} from "../types/auth.types";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from "../schemas/registerSchema";
import { registerService } from "../services/authentication.service";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useRegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<RegisterFormTouched>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Derived field statuses ─────────────────────────────────────────────────
  const getStatus = (field: keyof RegisterFormTouched): FieldStatus =>
    !touched[field] ? "idle" : errors[field] ? "error" : "success";

  const nameStatus = getStatus("name");
  const emailStatus = getStatus("email");
  const passwordStatus = getStatus("password");
  const confirmPasswordStatus = getStatus("confirmPassword");

  const passwordStrength =
    values.password.length > 0 ? getPasswordStrength(values.password) : null;

  // ── Change Handlers ────────────────────────────────────────────────────────
  const handleChange =
    (field: keyof RegisterFormValues, validator: (val: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValues((prev) => ({ ...prev, [field]: val }));
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validator(val) }));
      }
      // Re-validate confirmPassword live when password changes
      if (field === "password" && touched.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(val, values.confirmPassword),
        }));
      }
    };

  const handleNameChange = handleChange("name", validateName);
  const handleEmailChange = handleChange("email", validateEmail);
  const handlePasswordChange = handleChange("password", validatePassword);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, confirmPassword: val }));
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(values.password, val),
      }));
    }
  };

  // ── Blur Handlers ──────────────────────────────────────────────────────────
  const handleBlur =
    (field: keyof RegisterFormTouched, validator: () => string) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validator() }));
    };

  const handleNameBlur = handleBlur("name", () => validateName(values.name));
  const handleEmailBlur = handleBlur("email", () => validateEmail(values.email));
  const handlePasswordBlur = handleBlur("password", () => validatePassword(values.password));
  const handleConfirmPasswordBlur = handleBlur("confirmPassword", () =>
    validateConfirmPassword(values.password, values.confirmPassword)
  );

  // ── Toggles ────────────────────────────────────────────────────────────────
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // Mark all as touched
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const nameError        = validateName(values.name);
    const emailError       = validateEmail(values.email);
    const passwordError    = validatePassword(values.password);
    const confirmError     = validateConfirmPassword(values.password, values.confirmPassword);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    });

    if (nameError || emailError || passwordError || confirmError) return;

    setLoading(true);
    try {
      const response = await registerService({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("Register success:", response);
      // TODO: save token, redirect
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
    showConfirmPassword,
    apiError,
    nameStatus,
    emailStatus,
    passwordStatus,
    confirmPasswordStatus,
    passwordStrength,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNameBlur,
    handleEmailBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  };
}