import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { verifyKeys, localeKeys, errorsKeys } from "../utils/localeKeys";
import { verifyStyles } from "../utils/styles";
import useOtpVerification from "../hooks/useOtpVerification";
import FullWidthButton from "../layouts/FullWidthButton";
import VerifyHeader from "../components/Verify/VerifyHeader";
import OTPInput from "../components/Verify/OTPInput";
import ResendSection from "../components/Verify/ResendSection";
import CooldownAlert from "../components/Verify/CooldownAlert";
import { useActionData } from "react-router-dom";
import useActionToast from "../hooks/useActionToast";
import { getValidVerificationEmail } from "../utils/authUtils";
import { resendVerificationCode } from "../actions/ResendVerificationCodeAction";
import { ROUTES } from "../routes/paths";

/**
 * Verify Account Page Component
 *
 * @component
 */
function VerifyAccountPage() {
  const { t } = useTranslation();

  const {
    email,
    otp,
    timer,
    canResend,
    isResending,
    isSubmitting,
    isOtpComplete,
    isLocked,
    cooldownRemaining,
    formRef,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    formatTimer,
  } = useOtpVerification(
    120,
    getValidVerificationEmail,
    resendVerificationCode,
    ROUTES.SIGNUP,
    errorsKeys.registerSessionExpired,
  );

  const actionData = useActionData();

  useActionToast(actionData);

  const headerTranslations = {
    title: t(localeKeys.verifyAccountTitle),
    description: t(verifyKeys.codeSentTo),
  };

  const otpInputTranslations = {
    hint: t(verifyKeys.enterSixDigitCode),
    ariaLabel: t(verifyKeys.digitLabel),
  };

  const ResendSectionTranslations = {
    canResendAfter: t(verifyKeys.canResendAfter),
    didntReceiveCode: t(verifyKeys.didntReceiveCode),
    resendingCode: t(verifyKeys.resendingCode),
    resendCode: t(verifyKeys.resendCode),
  };

  const cooldownAlertTranslations = {
    title: t(verifyKeys.verificationLocked),
    message: t(verifyKeys.cooldownMessage),
    remainingLabel: t(verifyKeys.canResendAfter),
  };

  return (
    <main className={verifyStyles.pageContainer}>
      <section className={verifyStyles.wrapper}>
        <VerifyHeader email={email} translations={headerTranslations} />

        {/* 🆕 NEW: Cooldown Alert */}
        {isLocked && (
          <CooldownAlert
            cooldownRemaining={cooldownRemaining}
            formatTimer={formatTimer}
            translations={cooldownAlertTranslations}
          />
        )}

        <Form
          method="post"
          ref={formRef}
          className={verifyStyles.form.container}
          aria-label={t(localeKeys.verifyAccountTitle)}
        >
          <input type="hidden" name="code" value={otp.join("")} />

          <OTPInput
            otp={otp}
            inputRefs={inputRefs}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            handlePaste={handlePaste}
            isSubmitting={isSubmitting}
            isLocked={isLocked}
            translations={otpInputTranslations}
          />

          <footer className="mt-10">
            <FullWidthButton
              type="submit"
              disabled={isSubmitting || !isOtpComplete || isLocked}
            >
              {isSubmitting
                ? t(verifyKeys.verifyingButton)
                : t(verifyKeys.verifyButton)}
            </FullWidthButton>
          </footer>
        </Form>

        {/* 🆕 Conditional Rendering: Show message when locked, otherwise show ResendSection */}
        {isLocked ? (
          <aside className="mt-6 text-center space-y-2" aria-live="polite">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              🔒 {t(verifyKeys.verificationDisabled)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t(verifyKeys.requestNewCodeAfterCountdown)}
            </p>
          </aside>
        ) : (
          <ResendSection
            canResend={canResend}
            isResending={isResending}
            isLocked={isLocked}
            timer={timer}
            formatTimer={formatTimer}
            handleResend={handleResend}
            translations={ResendSectionTranslations}
          />
        )}
      </section>
    </main>
  );
}

export default VerifyAccountPage;
