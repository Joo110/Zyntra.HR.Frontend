import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordForm } from "../hooks/useResetPassword";
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
export default function ResetPasswordForm() {
  const {
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
  } = useResetPasswordForm();

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

        {/* ── New Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Enter your new password"
              autoComplete="new-password"
              className={`${getInputClass(passwordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.password}
            </p>
          )}
        </div>

        {/* ── Confirm New Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              className={`${getInputClass(confirmPasswordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.confirmPassword}
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
          {loading ? "Updating..." : "Submit"}
        </button>

      </div>
    </form>
  );
}