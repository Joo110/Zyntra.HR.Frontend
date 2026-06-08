import { Link } from "react-router-dom";
import { useForgotPasswordForm } from "../hooks/useForgotPassword";
import { FieldStatus } from "../types/auth.types";

// ─── Input Class Helper ───────────────────────────────────────────────────────
function getInputClass(status: FieldStatus): string {
  const base =
    "w-full border-2 rounded-lg px-4 py-3 outline-none transition-all duration-200 text-sm";
  if (status === "error")
    return `${base} border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100`;
  if (status === "success")
    return `${base} border-green-400 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-100`;
  return `${base} border-gray-200 bg-gray-50 focus:border-[#07122D] focus:ring-2 focus:ring-[#07122D]/10 focus:bg-white`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ForgotPasswordForm() {
  const {
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
  } = useForgotPasswordForm();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">

        {/* ── API Error ── */}
        {apiError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
            ⚠️ {apiError}
          </div>
        )}

        {/* ── Success Message ── */}
        {successMessage && (
          <div className="bg-green-50 border border-green-300 text-green-700 text-sm rounded-lg px-4 py-3">
            ✅ {successMessage}
          </div>
        )}

        {/* ── Email ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Registered Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="Enter your registered email"
            autoComplete="email"
            className={getInputClass(emailStatus)}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.email}
            </p>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full bg-[#07122D] text-white
            rounded-lg py-3 font-bold text-sm
            hover:bg-[#0f1f4a] active:scale-[0.99]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 tracking-wide
          "
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* ── Back to Login ── */}
        <Link
          to="/login"
          className="
            w-full border-2 border-gray-200 text-[#07122D]
            rounded-lg py-3 font-bold text-sm
            hover:border-[#07122D] hover:bg-gray-50
            transition-all duration-200 tracking-wide
            flex items-center justify-center
          "
        >
          Back
        </Link>

      </div>
    </form>
  );
}