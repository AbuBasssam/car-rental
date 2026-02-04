import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Link, useNavigation, useActionData } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { loginStyles } from "../utils/styles";
import { resetPasswordKeys, localeKeys } from "../utils/localeKeys";
import { ROUTES } from "../routes/paths";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
// import RoundedThemeToggle from "../utils/RoundedThemeToggle";
import FormInput from "../layouts/FormInput";
import FullWidthButton from "../layouts/FullWidthButton";
import { useActionToast } from "../hooks/useActionToast";

/**
 * RequestResetPassword Component
 *
 * First step in password reset flow - User enters their email
 *
 * Features:
 * - Email input with validation
 * - Loading state during submission
 * - Error display
 * - Link back to login
 * - Animated background
 * - Theme toggle
 * - RTL/LTR support
 */
const RequestResetPassword = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const [isActive, setIsActive] = useState(false);

  //============================================
  // 🔒 RACE CONDITION PREVENTION
  // ============================================
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

  useActionToast(actionData);

  const handleSubmit = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
  };

  return (
    <main className={loginStyles.pageContainer}>
      <AnimatedBackground isActive={isActive} />
      <BackButton />
      <article className={loginStyles.loginCard.container}>
        <section className={loginStyles.loginCard.card}>
          {/* Decorative Elements */}
          <div className={loginStyles.loginCard.decor1} aria-hidden="true" />
          <div className={loginStyles.loginCard.decor2} aria-hidden="true" />

          <ResetPasswordHeader />

          <ResetPasswordForm
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />

          <BackToLoginSection />
        </section>
      </article>
    </main>
  );
};

export default RequestResetPassword;

/**
 * ResetPasswordHeader Component
 * Displays logo, title, and description
 */
const ResetPasswordHeader = () => {
  const { t } = useTranslation();

  return (
    <header className={loginStyles.loginCard.headerContainer}>
      {/* Logo */}
      <div className={loginStyles.loginCard.logoContainer}>
        <div className={loginStyles.loginCard.logoText}>
          <span className="header-spacing">{t(localeKeys.premiumDrive)}</span>
          <span className="text-[10px] md:text-xs font-light tracking-[0.2em] text-premium-orange dark:text-orange-300">
            {t(localeKeys.luxuryMobilityExperience)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className={loginStyles.loginCard.title}>
        {t(resetPasswordKeys.forgotPasswordTitle)}
      </h1>

      {/* Description */}
      <p className={loginStyles.loginCard.subtitle}>
        {t(resetPasswordKeys.forgotPasswordDescription)}
      </p>
    </header>
  );
};

/**
 * ResetPasswordForm Component
 * Contains email input and submit button with resend logic
 */

const ResetPasswordForm = ({ isSubmitting, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Form
      method="post"
      className={loginStyles.form.container}
      onSubmit={onSubmit}
    >
      {/* Email Input */}
      <FormInput
        FieldIcon={FaEnvelope}
        name="email"
        placeholder={t(localeKeys.enterYourEmail)}
        disabled={isSubmitting}
        autoComplete="email"
        aria-label={t(localeKeys.email)}
        aria-required="true"
      />

      {/* Submit Button */}
      <FullWidthButton type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t(resetPasswordKeys.sendingCode)
          : t(resetPasswordKeys.sendCode)}
      </FullWidthButton>
    </Form>
  );
};

/**
 * BackToLoginSection Component
 * Link to navigate back to login page
 */
const BackToLoginSection = () => {
  const { t } = useTranslation();

  return (
    <footer className={loginStyles.signupSection}>
      <p className={loginStyles.signupText}>
        {t(resetPasswordKeys.rememberedPassword)}
      </p>
      <Link
        to={ROUTES.LOGIN}
        className={loginStyles.signupButton}
        aria-label={t(resetPasswordKeys.backToLogin)}
      >
        {t(resetPasswordKeys.backToLogin)}
      </Link>
    </footer>
  );
};
