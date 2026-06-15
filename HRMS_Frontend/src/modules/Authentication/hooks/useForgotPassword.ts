import { useState } from "react";

import {
  ForgotPasswordFormValues,
  ForgotPasswordFormErrors,
  ForgotPasswordFormTouched,
  FieldStatus,
} from "../types/auth.types";

import { validateEmail } from "../schemas/Forgotpasswordschema";

import { forgotPasswordService } from "../services/authentication.service";

// ─── Hook ───────────────────────────────────────────────
export function useForgotPasswordForm(t: any) {
  const [values, setValues] = useState<ForgotPasswordFormValues>({
    email: "",
  });

  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({
    email: "",
  });

  const [touched, setTouched] = useState<ForgotPasswordFormTouched>({
    email: false,
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ── Derived ─────────────────────────────────────────────
  const emailStatus: FieldStatus =
    !touched.email ? "idle" : errors.email ? "error" : "success";

  // ── Handlers ────────────────────────────────────────────
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

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError("");
    setSuccessMessage("");

    setTouched({ email: true });

    const emailError = validateEmail(values.email, t);

    setErrors({ email: emailError });

    if (emailError) return;

    setLoading(true);

    try {
      const response = await forgotPasswordService(values.email, t);

      setSuccessMessage(
        response.message ||
          t("forgotPassword.success.resetLinkSent", {
            email: values.email.trim(),
          })
      );

      setValues({ email: "" });
      setTouched({ email: false });
    } catch (err: any) {
      setApiError(err.message || t("forgotPassword.errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    touched,
    loading,
    apiError,
    successMessage,
    emailStatus,
    handleEmailChange,
    handleEmailBlur,
    handleSubmit,
  };
}