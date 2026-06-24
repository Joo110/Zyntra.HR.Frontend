import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginForm } from "../hooks/useLogin";
import { FieldStatus } from "../types/auth.types";
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

export default function LoginForm() {
  const { t } = useTranslation("authentication");
  const {
    values, errors, touched, loading, showPassword, apiError,
    emailStatus, passwordStatus,
    handleEmailChange, handleEmailBlur, handlePasswordChange,
    handlePasswordBlur, handleRememberChange, toggleShowPassword,
    handleForgotPassword, handleSubmit,
  } = useLoginForm(t);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">

        {/* ── API Error ── */}
        {apiError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
            {t("login.errors.apiErrorPrefix")} {apiError}
          </div>
        )}

        {/* ── Email ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            {t("login.form.email.label")} <span className="text-red-500">{t("login.form.email.required")}</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder={t("login.form.email.placeholder")}
            autoComplete="email"
            className={getInputClass(emailStatus)}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.email}
            </p>
          )}
        </div>

        {/* ── Password ── */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-[#07122D]">
            {t("login.form.password.label")} <span className="text-red-500">{t("login.form.email.required")}</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder={t("login.form.password.placeholder")}
              autoComplete="current-password"
              className={`${getInputClass(passwordStatus)} pr-12`}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={showPassword ? t("login.accessibility.hidePassword") : t("login.accessibility.showPassword")}
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

        {/* ── Remember + Forgot ── */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={handleRememberChange}
              className="accent-[#07122D] w-4 h-4"
            />
            {t("login.form.rememberMe")}
          </label>
          <Link to="/forgot-password" className="font-semibold text-[#07122D] hover:underline transition-all">
            {t("login.form.forgotPassword")}
          </Link>
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#07122D] text-white rounded-lg py-3 font-bold text-sm hover:bg-[#0f1f4a] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide"
        >
          {loading ? t("login.form.submit.loading") : t("login.form.submit.login")}
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-gray-400 text-sm">{t("login.divider")}</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* ── Social Buttons ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button type="button" className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all">
          <FcGoogle size={20} /> {t("login.social.google")}
        </button>
        <button type="button" className="border-2 border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-sm hover:border-[#07122D] hover:bg-gray-50 transition-all">
          <FaApple size={20} /> {t("login.social.apple")}
        </button>
      </div>

      {/* ── Sign Up ── */}
      <p className="text-center text-gray-500 text-sm">
        {t("login.footer.noAccount")}{" "}
        <Link to="/register" className="font-bold text-[#07122D] hover:underline">
          {t("login.footer.createAccount")}
        </Link>
      </p>
    </form>
  );
}