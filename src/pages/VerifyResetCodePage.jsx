import { Form, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPasswordKeys, verifyKeys } from "../utils/localeKeys";
import { verifyStyles } from "../utils/styles";
import useOtpVerification from "../hooks/useOtpVerification";
import FullWidthButton from "../layouts/FullWidthButton";
import VerifyHeader from "../components/Verify/VerifyHeader";
import OTPInput from "../components/Verify/OTPInput";
import ResendSection from "../components/Verify/ResendSection";
import { getValidResetEmail } from "../utils/authUtils";
import resendResetCode from "../actions/ResendResetCodeAction";
import useActionToast from "../hooks/useActionToast";
import { errorsKeys } from "../utils/localeKeys";
import { ROUTES } from "../routes/paths";

/**
 * VerifyResetCode Page Component
 *
 * Second step in password reset flow - User enters verification code
 *
 * Features:
 * - 6-digit OTP input
 * - Auto-submit on complete
 * - Resend code functionality with 60s timer
 * - Paste support
 * - Keyboard navigation
 * - Loading states
 * - Error handling
 * - RTL/LTR support
 *
 * @component
 */
function VerifyResetCodePage() {
  const { t } = useTranslation();

  // ============================================
  // 🎯 USE OTP VERIFICATION HOOK
  // ============================================
  const {
    email,
    otp,
    timer,
    canResend,
    isResending,
    isSubmitting,
    isOtpComplete,
    formRef,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    formatTimer,
  } = useOtpVerification(
    60, // 60 seconds timer for password reset
    getValidResetEmail, // Function to get email from sessionStorage
    resendResetCode, // Function to resend reset code
    ROUTES.FORGOT_PASSWORD,
    errorsKeys.registerSessionExpired,
  );
  const actionData = useActionData();

  useActionToast(actionData);

  // ============================================
  // 🌐 TRANSLATIONS
  // ============================================
  const headerTranslations = {
    title: t(resetPasswordKeys.verifyResetTitle),
    description: t(resetPasswordKeys.verifyResetDescription),
  };

  const otpInputTranslations = {
    hint: t(verifyKeys.enterSixDigitCode),
    ariaLabel: t(verifyKeys.digitLabel),
  };

  const resendSectionTranslations = {
    canResendAfter: t(verifyKeys.canResendAfter),
    didntReceiveCode: t(verifyKeys.didntReceiveCode),
    resendingCode: t(verifyKeys.resendingCode),
    resendCode: t(verifyKeys.resendCode),
  };

  // ============================================
  // 🎨 RENDER
  // ============================================
  return (
    <main className={verifyStyles.pageContainer}>
      <section className={verifyStyles.wrapper}>
        {/* Header Section */}
        <VerifyHeader email={email} translations={headerTranslations} />

        {/* OTP Form */}
        <Form
          method="post"
          ref={formRef}
          className={verifyStyles.form.container}
          aria-label={t(resetPasswordKeys.verifyResetTitle)}
          noValidate
        >
          {/* Hidden Inputs */}
          <input type="hidden" name="code" value={otp.join("")} />

          {/* OTP Input Component */}
          <OTPInput
            otp={otp}
            inputRefs={inputRefs}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            handlePaste={handlePaste}
            isSubmitting={isSubmitting}
            translations={otpInputTranslations}
          />

          {/* Submit Button */}
          <footer className="mt-10">
            <FullWidthButton
              type="submit"
              disabled={isSubmitting || !isOtpComplete}
              aria-label={
                isSubmitting
                  ? t(resetPasswordKeys.verifyingCode)
                  : t(resetPasswordKeys.verifyCodeButton)
              }
            >
              {isSubmitting
                ? t(resetPasswordKeys.verifyingCode)
                : t(resetPasswordKeys.verifyCodeButton)}
            </FullWidthButton>
          </footer>
        </Form>

        {/* Resend Section */}
        <ResendSection
          canResend={canResend}
          isResending={isResending}
          timer={timer}
          formatTimer={formatTimer}
          handleResend={handleResend}
          translations={resendSectionTranslations}
        />
      </section>
    </main>
  );
}

export default VerifyResetCodePage;
