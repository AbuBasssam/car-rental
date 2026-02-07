import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { verifyKeys, localeKeys, errorsKeys } from "../utils/localeKeys";
import { verifyStyles } from "../utils/styles";
import { useOtpVerification } from "../hooks/useOtpVerification";
import FullWidthButton from "../layouts/FullWidthButton";
import VerifyHeader from "../components/Verify/VerifyHeader";
import OTPInput from "../components/Verify/OTPInput";
import ResendSection from "../components/Verify/ResendSection";
import { useActionData } from "react-router-dom";
import useActionToast from "../hooks/useActionToast";
import { getValidVerificationEmail } from "../utils/authUtils";
import { resendVerificationCode } from "../api/endpoints/auth";
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

  return (
    <main className={verifyStyles.pageContainer}>
      <section className={verifyStyles.wrapper}>
        <VerifyHeader email={email} translations={headerTranslations} />

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
            translations={otpInputTranslations}
          />
          <footer className="mt-10">
            <FullWidthButton
              type="submit"
              disabled={isSubmitting || !isOtpComplete}
            >
              {isSubmitting
                ? t(verifyKeys.verifyingButton)
                : t(verifyKeys.verifyButton)}
            </FullWidthButton>
          </footer>
        </Form>

        <ResendSection
          canResend={canResend}
          isResending={isResending}
          timer={timer}
          formatTimer={formatTimer}
          handleResend={handleResend}
          translations={ResendSectionTranslations}
        />
      </section>
    </main>
  );
}

export default VerifyAccountPage;
