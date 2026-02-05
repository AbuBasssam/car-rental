import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigation, useActionData } from "react-router-dom";
import { arabicTextAdjustment, loginStyles } from "../utils/styles";
import { resetPasswordKeys, localeKeys } from "../utils/localeKeys";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import PasswordInput from "../layouts/PasswordInput";
import FullWidthButton from "../layouts/FullWidthButton";
import PasswordRequirements from "../components/signUp/PasswordRequirements";
import { useActionToast } from "../hooks/useActionToast";
import { keys } from "../utils/constants";

/**
 * ResetPassword Component
 *
 * Final step in password reset flow - User enters new password
 *
 * Features:
 * - New password input with strength indicator
 * - Confirm password input
 * - Password requirements display
 * - Real-time validation
 * - Loading state during submission
 * - Error handling
 * - Success redirect to login
 * - Animated background
 * - RTL/LTR support
 *
 * @component
 */
const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === keys.kAR;
  const navigation = useNavigation();
  const actionData = useActionData();

  // ============================================
  // 📊 STATE MANAGEMENT
  // ============================================
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if form is submitting
  const isSubmitting = navigation.state === "submitting";

  // ============================================
  // 🎬 COMPONENT MOUNT ANIMATION
  // ============================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ============================================
  // 🍞 HANDLE ERROR TOASTS
  // ============================================
  useActionToast(actionData);

  // ============================================
  // 👁️ PASSWORD VISIBILITY TOGGLES
  // ============================================
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
  };

  // ============================================
  // 🎨 RENDER
  // ============================================
  return (
    <main className={loginStyles.pageContainer}>
      {/* Animated Background */}
      <AnimatedBackground isActive={isActive} />

      {/* Back Button */}
      <BackButton />

      {/* Main Card */}
      <article className={loginStyles.loginCard.container}>
        <section className={loginStyles.loginCard.card}>
          {/* Decorative Elements */}
          <div className={loginStyles.loginCard.decor1} aria-hidden="true" />
          <div className={loginStyles.loginCard.decor2} aria-hidden="true" />

          {/* Header */}
          <header className={loginStyles.loginCard.headerContainer}>
            {/* Logo */}
            <div className={loginStyles.loginCard.logoContainer}>
              <div className={loginStyles.loginCard.logoText}>
                <span className="header-spacing">
                  {t(localeKeys.premiumDrive)}
                </span>
                <span className="text-[10px] md:text-xs font-light tracking-[0.2em] text-premium-orange dark:text-orange-300">
                  {t(localeKeys.luxuryMobilityExperience)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className={loginStyles.loginCard.title}
              style={isArabic ? arabicTextAdjustment : {}}
            >
              {t(resetPasswordKeys.resetPasswordTitle)}
            </h1>

            {/* Subtitle */}
            <p
              className={loginStyles.loginCard.subtitle}
              style={isArabic ? arabicTextAdjustment : {}}
            >
              {t(resetPasswordKeys.resetPasswordDescription)}
            </p>
          </header>

          {/* Form */}
          <Form
            method="post"
            className={loginStyles.form.container}
            noValidate
            onSubmit={handleSubmit}
          >
            {/* New Password Input */}
            <>
              <PasswordInput
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onTogglePassword={togglePasswordVisibility}
                placeholder={t(resetPasswordKeys.enterNewPassword)}
                disabled={isSubmitting}
                autoComplete="new-password"
                aria-label={t(resetPasswordKeys.newPassword)}
              />

              {/* Confirm Password Input */}

              <PasswordInput
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showPassword={showConfirmPassword}
                onTogglePassword={toggleConfirmPasswordVisibility}
                placeholder={t(resetPasswordKeys.confirmNewPasswordPlaceholder)}
                disabled={isSubmitting}
                autoComplete="new-password"
                aria-label={t(localeKeys.confirmPassword)}
              />
              {/* Password Requirements */}
              <PasswordRequirements password={password} />

              {/* Submit Button */}
              <FullWidthButton
                type="submit"
                disabled={isSubmitting}
                aria-label={
                  isSubmitting
                    ? t(resetPasswordKeys.changingPassword)
                    : t(resetPasswordKeys.changePassword)
                }
              >
                {isSubmitting
                  ? t(resetPasswordKeys.changingPassword)
                  : t(resetPasswordKeys.changePassword)}
              </FullWidthButton>
            </>
          </Form>
        </section>
      </article>
    </main>
  );
};

export default ResetPassword;
