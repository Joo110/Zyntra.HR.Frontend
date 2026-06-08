import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ResetPasswordFormValues,
  ResetPasswordFormErrors,
  ResetPasswordFormTouched,
} from "../types/auth.types";
import {
  validateNewPassword,
  validateConfirmPassword,
} from "../schemas/Forgotpasswordschema";
import { resetPasswordService } from "../services/authentication.service";
import type { FieldStatus } from "../types/auth.types";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const [values, setValues] = useState<ResetPasswordFormValues>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ResetPasswordFormErrors>({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<ResetPasswordFormTouched>({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ── Derived ───────────────────────────────────────────────────────────────
  const passwordStatus: FieldStatus =
    !touched.password ? "idle" : errors.password ? "error" : "success";

  const confirmPasswordStatus: FieldStatus =
    !touched.confirmPassword
      ? "idle"
      : errors.confirmPassword
      ? "error"
      : "success";

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, password: val }));
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateNewPassword(val) }));
    }
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(val, values.confirmPassword),
      }));
    }
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({
      ...prev,
      password: validateNewPassword(values.password),
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, confirmPassword: val }));
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(values.password, val),
      }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(
        values.password,
        values.confirmPassword
      ),
    }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    // Mark all fields as touched
    setTouched({ password: true, confirmPassword: true });

    const passwordError = validateNewPassword(values.password);
    const confirmPasswordError = validateConfirmPassword(
      values.password,
      values.confirmPassword
    );
    setErrors({ password: passwordError, confirmPassword: confirmPasswordError });

    if (passwordError || confirmPasswordError) return;

    if (!token) {
      setApiError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordService(token, values.password);
      setSuccessMessage("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
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
    successMessage,
    passwordStatus,
    confirmPasswordStatus,
    handlePasswordChange,
    handlePasswordBlur,
    handleConfirmPasswordChange,
    handleConfirmPasswordBlur,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  };
}