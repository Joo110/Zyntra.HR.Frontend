import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FieldStatus, PasswordStrength, RegisterFormErrors, RegisterFormValues } from "../types/auth.types";
import { Link } from "react-router-dom";

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

// ─── Error Message ────────────────────────────────────────────────────────────
function ErrorMsg({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <span>⚠️</span> {message}
    </p>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface RegisterFormProps {
  values: RegisterFormValues;
  errors: RegisterFormErrors;
  touched: Record<keyof RegisterFormValues, boolean>;
  loading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  apiError: string;
  nameStatus: FieldStatus;
  emailStatus: FieldStatus;
  passwordStatus: FieldStatus;
  confirmPasswordStatus: FieldStatus;
  passwordStrength: PasswordStrength | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onConfirmPasswordBlur: () => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLoginClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RegisterForm({
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
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onNameBlur,
  onEmailBlur,
  onPasswordBlur,
  onConfirmPasswordBlur,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  onLoginClick,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-5">

        {/* ── API Error ── */}
        {apiError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
            ⚠️ {apiError}
          </div>
        )}

        {/* ── Full Name ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            placeholder="Enter your full name"
            autoComplete="name"
            className={getInputClass(nameStatus)}
          />
          {touched.name && <ErrorMsg message={errors.name} />}
        </div>

        {/* ── Email ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            placeholder="Enter your email address"
            autoComplete="email"
            className={getInputClass(emailStatus)}
          />
          {touched.email && <ErrorMsg message={errors.email} />}
        </div>

        {/* ── Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className={`${getInputClass(passwordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Strength Bar */}
          {values.password.length > 0 && passwordStrength && (
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <p className="text-xs mt-1 font-semibold" style={{ color: passwordStrength.color }}>
                Strength: {passwordStrength.label}
              </p>
            </div>
          )}

          {touched.password && <ErrorMsg message={errors.password} />}
        </div>

        {/* ── Confirm Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={onConfirmPasswordChange}
              onBlur={onConfirmPasswordBlur}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className={`${getInputClass(confirmPasswordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {touched.confirmPassword && <ErrorMsg message={errors.confirmPassword} />}
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-gray-400 text-sm">Or sign up with</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* ── Social Buttons ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={20} />
          Google
        </button>
        <button
          type="button"
          className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all"
        >
          <FaApple size={20} />
          Apple
        </button>
      </div>

      {/* ── Login Link ── */}
      <p className="text-center text-gray-500 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[#07122D] hover:underline">
            Login
        </Link>
      </p>
    </form>
  );
}