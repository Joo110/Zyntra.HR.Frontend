import RegisterForm from "../components/Registerform";
import { useRegisterForm } from "../hooks/useRegister";
import { useTranslation } from "react-i18next";

interface RegisterPageProps {
  onLoginClick?: () => void;
}

export default function RegisterPage({ onLoginClick }: RegisterPageProps) {
  const { t } = useTranslation("authentication");
  const {
    values, errors, touched, loading, showPassword, showConfirmPassword,
    apiError, nameStatus, emailStatus, passwordStatus, confirmPasswordStatus,
    passwordStrength, handleNameChange, handleEmailChange, handlePasswordChange,
    handleConfirmPasswordChange, handleNameBlur, handleEmailBlur, handlePasswordBlur,
    handleConfirmPasswordBlur, toggleShowPassword, toggleShowConfirmPassword, handleSubmit,
  } = useRegisterForm(t);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07122D] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[400px] overflow-hidden pointer-events-none z-0">
        <svg viewBox="0 0 2387 1141" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.010101" d="M373 80.3406C276.766 987.569 549.579 786.108 800.008 421.751C893.241 286.104 1105.22 292.609 1174.85 441.754L1293.85 696.647C1360.86 840.165 1560.17 852.555 1644.43 718.439L1738.79 568.249C1820.55 438.117 2012.42 444.989 2084.66 580.635L2380.84 1136.78" stroke="#FAFAFA"/>
          <path opacity="0.333333" d="M257.188 54.1277C164.593 881.707 425.12 703.539 666.305 372.845C760.96 243.061 965.868 249.291 1036.83 393.4L1144.59 612.222C1212.78 750.692 1405.47 763.009 1490.73 634.348L1575.52 506.403C1658.13 381.733 1843.36 388.537 1916.6 518.932L2199.86 1023.19" stroke="#FAFAFA"/>
          <path opacity="0.666667" d="M137.757 27.0956C48.8194 773.91 297.333 617.74 529.171 320.737C625.108 197.834 821.722 203.732 894.103 341.827L991.015 526.726C1060.44 659.19 1245.39 671.372 1331.59 549.158L1407.75 441.182C1491.14 322.955 1668.6 329.652 1742.84 453.827L2013.23 906.048" stroke="#FAFAFA"/>
          <path d="M18.3259 0.0634766C-67.0811 667.632 170.269 531.268 393.026 266.801C489.912 151.773 677.039 157.272 750.828 288.318L837.931 443.007C908.574 568.466 1084.65 580.424 1171.61 465.669L1240.8 374.362C1324.75 263.564 1493.35 270.1 1568.48 387.064L1826.59 788.909" stroke="#FAFAFA"/>
        </svg>
      </div>

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-10 z-10 my-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#07122D]">
          {t("register.title")}
        </h1>

        <RegisterForm
          values={values}
          errors={errors}
          touched={touched}
          loading={loading}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          apiError={apiError}
          nameStatus={nameStatus}
          emailStatus={emailStatus}
          passwordStatus={passwordStatus}
          confirmPasswordStatus={confirmPasswordStatus}
          passwordStrength={passwordStrength}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onNameBlur={handleNameBlur}
          onEmailBlur={handleEmailBlur}
          onPasswordBlur={handlePasswordBlur}
          onConfirmPasswordBlur={handleConfirmPasswordBlur}
          onTogglePassword={toggleShowPassword}
          onToggleConfirmPassword={toggleShowConfirmPassword}
          onSubmit={handleSubmit}
          onLoginClick={onLoginClick ?? (() => console.log("Navigate to login"))}
        />
      </div>
    </div>
  );
}