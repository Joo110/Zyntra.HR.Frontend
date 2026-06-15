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

// ─── Hook ───────────────────────────────────────────────
export function useRegisterForm(t: any) {
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

  // ── Status Helper ───────────────────────────────────────
  const getStatus = (field: keyof RegisterFormTouched): FieldStatus =>
    !touched[field] ? "idle" : errors[field] ? "error" : "success";

  const nameStatus = getStatus("name");
  const emailStatus = getStatus("email");
  const passwordStatus = getStatus("password");
  const confirmPasswordStatus = getStatus("confirmPassword");

  const passwordStrength =
    values.password.length > 0
      ? getPasswordStrength(values.password, t)
      : null;

  // ── Change Handler Factory ─────────────────────────────
  const handleChange =
    (field: keyof RegisterFormValues, validator: (val: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      setValues((prev) => ({ ...prev, [field]: val }));

      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validator(val),
        }));
      }

      // live confirm password validation
      if (field === "password" && touched.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(
            val,
            values.confirmPassword,
            t
          ),
        }));
      }
    };

  const handleNameChange = handleChange("name", (v) =>
    validateName(v, t)
  );

  const handleEmailChange = handleChange("email", (v) =>
    validateEmail(v, t)
  );

  const handlePasswordChange = handleChange("password", (v) =>
    validatePassword(v, t)
  );

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setValues((prev) => ({ ...prev, confirmPassword: val }));

    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(
          values.password,
          val,
          t
        ),
      }));
    }
  };

  // ── Blur Handler ───────────────────────────────────────
  const handleBlur =
    (field: keyof RegisterFormTouched, validator: () => string) =>
    () => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      setErrors((prev) => ({
        ...prev,
        [field]: validator(),
      }));
    };

  const handleNameBlur = handleBlur("name", () =>
    validateName(values.name, t)
  );

  const handleEmailBlur = handleBlur("email", () =>
    validateEmail(values.email, t)
  );

  const handlePasswordBlur = handleBlur("password", () =>
    validatePassword(values.password, t)
  );

  const handleConfirmPasswordBlur = handleBlur(
    "confirmPassword",
    () =>
      validateConfirmPassword(
        values.password,
        values.confirmPassword,
        t
      )
  );

  // ── Toggles ────────────────────────────────────────────
  const toggleShowPassword = () =>
    setShowPassword((prev) => !prev);

  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const nameError = validateName(values.name, t);
    const emailError = validateEmail(values.email, t);
    const passwordError = validatePassword(values.password, t);
    const confirmError = validateConfirmPassword(
      values.password,
      values.confirmPassword,
      t
    );

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    });

    if (nameError || emailError || passwordError || confirmError)
      return;

    setLoading(true);

    try {
      const response = await registerService(
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        t
      );

      console.log(t("register.logs.success"), response);
    } catch (err: any) {
      setApiError(err.message || t("register.errors.generic"));
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