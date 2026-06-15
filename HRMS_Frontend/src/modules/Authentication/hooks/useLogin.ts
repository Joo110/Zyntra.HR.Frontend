import { useState } from "react";
import {
  LoginFormValues,
  LoginFormErrors,
  LoginFormTouched,
  FieldStatus,
} from "../types/auth.types";

import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  REGEX,
} from "../schemas/loginSchema";

import {
  loginService,
  forgotPasswordService,
} from "../services/authentication.service";

import { useNavigate } from "react-router-dom";

// ─── Hook ─────────────────────────────────────────────────────────
export function useLoginForm(t: any) {
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    remember: false,
  });

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

  // ── Derived ───────────────────────────────────────────────
  const emailStatus: FieldStatus =
    !touched.email ? "idle" : errors.email ? "error" : "success";

  const passwordStatus: FieldStatus =
    !touched.password ? "idle" : errors.password ? "error" : "success";

  const passwordStrength =
    values.password.length > 0
      ? getPasswordStrength(values.password, t)
      : null;

  // ── Handlers ──────────────────────────────────────────────
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setValues((prev) => ({ ...prev, email: val }));

    if (touched.email) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(val, t),
      }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(values.email, t),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setValues((prev) => ({ ...prev, password: val }));

    if (touched.password) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(val, t),
      }));
    }
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(values.password, t),
    }));
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, remember: e.target.checked }));
  };

  const toggleShowPassword = () =>
    setShowPassword((prev) => !prev);

  // ── Forgot Password ───────────────────────────────────────
  const handleForgotPassword = async () => {
    if (!values.email.trim()) {
      setApiError(t("login.errors.enterEmailFirst"));
      return;
    }

    if (!REGEX.email.test(values.email.trim())) {
      setApiError(t("login.errors.invalidEmail"));
      return;
    }

    try {
      await forgotPasswordService(values.email);

      setApiError(
        t("login.success.resetLinkSent", {
          email: values.email.trim(),
        })
      );
    } catch (err: any) {
      setApiError(err.message || t("login.errors.generic"));
    }
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    setTouched({ email: true, password: true });

    const emailError = validateEmail(values.email, t);
    const passwordError = validatePassword(values.password, t);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const response = await loginService(
        {
          email: values.email,
          password: values.password,
        },
        t
      );

      console.log(t("login.logs.success"), response);

      navigate("/dashboard");
    } catch (err: any) {
      setApiError(err.message || t("login.errors.generic"));
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