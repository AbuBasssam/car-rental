import { verifyStyles } from "../../utils/styles";

/**
 * Resend Section Component
 *
 * @param {Object} props
 * @param {boolean} props.canResend - Whether resend is allowed
 * @param {boolean} props.isResending - Resend request state
 * @param {number} props.timer - Remaining seconds
 * @param {Function} props.formatTimer - Timer formatting function
 * @param {Function} props.handleResend - Resend button handler
 * @param {Object} props.translations - Translation object
 */
function ResendSection({
  canResend,
  isResending,
  timer,
  formatTimer,
  handleResend,
  translations,
}) {
  return (
    <aside className={verifyStyles.resend.container} aria-live="polite">
      {!canResend ? (
        <p className={verifyStyles.resend.timerText}>
          {translations.canResendAfter}{" "}
          <time className={verifyStyles.resend.timerValue}>
            {formatTimer(timer)}
          </time>
        </p>
      ) : (
        <nav className={verifyStyles.resend.content}>
          <p className={verifyStyles.resend.prompt}>
            {translations.didntReceiveCode}
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className={verifyStyles.resend.button}
            aria-busy={isResending}
          >
            {isResending ? translations.resendingCode : translations.resendCode}
          </button>
        </nav>
      )}
    </aside>
  );
}
export default ResendSection;
