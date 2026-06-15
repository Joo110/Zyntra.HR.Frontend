import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FieldStatus, PasswordStrength, RegisterFormErrors, RegisterFormValues } from "../types/auth.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function getInputClass(status: FieldStatus): string {
  const base =
    "w-full border-2 rounded-lg px-4 py-3 outline-none transition-all duration-200 text-sm";
  if (status === "error")
    return `${base} border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100`;
  if (status === "success")
    return `${base} border-green-400 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-100`;
  return `${base} border-gray-200 bg-gray-50 focus:border-[#07122D] focus:ring-2 focus:ring-[#07122D]/10 focus:bg-white`;
}

function ErrorMsg({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <span>⚠️</span> {message}
    </p>
  );
}

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

export default function RegisterForm({
  values, errors, touched, loading, showPassword, showConfirmPassword, apiError,
  nameStatus, emailStatus, passwordStatus, confirmPasswordStatus, passwordStrength,
  onNameChange, onEmailChange, onPasswordChange, onConfirmPasswordChange,
  onNameBlur, onEmailBlur, onPasswordBlur, onConfirmPasswordBlur,
  onTogglePassword, onToggleConfirmPassword, onSubmit, onLoginClick,
}: RegisterFormProps) {
  const { t } = useTranslation("authentication");

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
            {t("register.form.name.label")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            placeholder={t("register.form.name.placeholder")}
            autoComplete="name"
            className={getInputClass(nameStatus)}
          />
          {touched.name && <ErrorMsg message={errors.name} />}
        </div>

        {/* ── Email ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            {t("register.form.email.label")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            placeholder={t("register.form.email.placeholder")}
            autoComplete="email"
            className={getInputClass(emailStatus)}
          />
          {touched.email && <ErrorMsg message={errors.email} />}
        </div>

        {/* ── Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            {t("register.form.password.label")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              placeholder={t("register.form.password.placeholder")}
              autoComplete="new-password"
              className={`${getInputClass(passwordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showPassword ? t("register.accessibility.hidePassword") : t("register.accessibility.showPassword")}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {values.password.length > 0 && passwordStrength && (
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}
                />
              </div>
              <p className="text-xs mt-1 font-semibold" style={{ color: passwordStrength.color }}>
                {t("register.form.password.strength")}: {passwordStrength.label}
              </p>
            </div>
          )}

          {touched.password && <ErrorMsg message={errors.password} />}
        </div>

        {/* ── Confirm Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            {t("register.form.confirmPassword.label")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={onConfirmPasswordChange}
              onBlur={onConfirmPasswordBlur}
              placeholder={t("register.form.confirmPassword.placeholder")}
              autoComplete="new-password"
              className={`${getInputClass(confirmPasswordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showConfirmPassword ? t("register.accessibility.hidePassword") : t("register.accessibility.showPassword")}
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
          className="w-full bg-[#07122D] text-white rounded-lg py-3 font-bold text-sm hover:bg-[#0f1f4a] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide"
        >
          {loading ? t("register.form.submit.loading") : t("register.form.submit.register")}
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-gray-400 text-sm">{t("register.divider")}</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* ── Social Buttons ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button type="button" className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all">
          <FcGoogle size={20} /> {t("register.social.google")}
        </button>
        <button type="button" className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all">
          <FaApple size={20} /> {t("register.social.apple")}
        </button>
      </div>

      {/* ── Login Link ── */}
      <p className="text-center text-gray-500 text-sm">
        {t("register.footer.hasAccount")}{" "}
        <Link to="/login" className="font-bold text-[#07122D] hover:underline">
          {t("register.footer.login")}
        </Link>
      </p>
    </form>
  );
}