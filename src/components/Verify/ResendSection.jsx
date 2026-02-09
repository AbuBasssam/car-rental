import { useTranslation } from "react-i18next";
import { verifyStyles } from "../../utils/styles";
import { keys } from "../../utils/constants";
import React from "react";

/**
 * Resend Section Component
 *
 * @param {Object} props
 * @param {boolean} props.canResend - Whether resend is allowed
 * @param {boolean} props.isResending - Resend request state
 * @param {boolean} props.isLocked - Lock state (prevents resend)
 * @param {number} props.timer - Remaining seconds
 * @param {Function} props.formatTimer - Timer formatting function
 * @param {Function} props.handleResend - Resend button handler
 * @param {Object} props.translations - Translation object
 */
function ResendSection({
  canResend,
  isResending,
  isLocked = false,
  timer,
  formatTimer,
  handleResend,
  translations,
}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === keys.kAR;

  return (
    <aside className={verifyStyles.resend.container} aria-live="polite">
      {!canResend ? (
        <ResendSection.Timer
          timer={timer}
          formatTimer={formatTimer}
          text={translations.canResendAfter}
        />
      ) : (
        <ResendSection.Content isArabic={isArabic}>
          <ResendSection.Action>
            <ResendButton
              isResending={isResending}
              isLocked={isLocked}
              onResend={handleResend}
              label={translations.resendCode}
              loadingLabel={translations.resendingCode}
            />
          </ResendSection.Action>

          <ResendSection.Hint>
            <ResendPrompt text={translations.didntReceiveCode} />
          </ResendSection.Hint>
        </ResendSection.Content>
      )}
    </aside>
  );
}

export default ResendSection;

/* -------------------------------------------------------------------------- */
/*                                   Slots                                    */
/* -------------------------------------------------------------------------- */

ResendSection.Content = function Content({ isArabic, children }) {
  const slots = React.Children.toArray(children).reduce((acc, child) => {
    if (React.isValidElement(child) && child.type.slotName) {
      acc[child.type.slotName] = child;
    }
    return acc;
  }, {});

  if (import.meta.env.MODE === "development") {
    if (!slots.action || !slots.hint) {
      console.warn(
        "ResendSection.Content expects <ResendSection.Action /> and <ResendSection.Hint /> slots.",
      );
    }
  }

  return (
    <nav className={verifyStyles.resend.content}>
      {isArabic ? (
        <>
          {slots.action}
          {slots.hint}
        </>
      ) : (
        <>
          {slots.hint}
          {slots.action}
        </>
      )}
    </nav>
  );
};

ResendSection.Action = function Action({ children }) {
  return children;
};
ResendSection.Action.slotName = "action";

ResendSection.Hint = function Hint({ children }) {
  return children;
};
ResendSection.Hint.slotName = "hint";

/* -------------------------------------------------------------------------- */
/*                              Atomic Components                              */
/* -------------------------------------------------------------------------- */

ResendSection.Timer = function Timer({ timer, formatTimer, text }) {
  return (
    <p className={verifyStyles.resend.timerText}>
      {text}
      <time className={verifyStyles.resend.timerValue} dateTime={`PT${timer}S`}>
        {formatTimer(timer)}
      </time>
    </p>
  );
};

/**
 * Resend Button Component
 *
 */
function ResendButton({
  isResending,
  isLocked,
  onResend,
  label,
  loadingLabel,
}) {
  return (
    <button
      type="button"
      onClick={onResend}
      disabled={isResending || isLocked} // Disable when locked
      className={`${verifyStyles.resend.button} ${
        isResending || isLocked ? verifyStyles.resend.buttonDisabled : ""
      }`}
      aria-busy={isResending}
    >
      {isResending ? loadingLabel : label}
    </button>
  );
}

function ResendPrompt({ text }) {
  return <p className={verifyStyles.resend.prompt}>{text}</p>;
}
