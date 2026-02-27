import { verifyStyles } from "../../utils/styles";

/**
 * Cooldown Alert Component
 *
 * Displays a warning message when user is locked out due to max attempts exceeded.
 * Shows a countdown timer until they can request a new code.
 *
 * @param {Object} props
 * @param {number} props.cooldownRemaining - Remaining seconds in cooldown
 * @param {Function} props.formatTimer - Timer formatting function
 * @param {Object} props.translations - Translation object
 */
function CooldownAlert({ cooldownRemaining, formatTimer, translations }) {
  return (
    <div
      className={verifyStyles.cooldownAlert.container}
      role="alert"
      aria-live="assertive"
    >
      <div className={verifyStyles.cooldownAlert.content}>
        <div className={verifyStyles.cooldownAlert.iconWrapper}>
          <svg
            className={verifyStyles.cooldownAlert.icon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <div className={verifyStyles.cooldownAlert.textContent}>
          <h3 className={verifyStyles.cooldownAlert.title}>
            {translations.title}
          </h3>
          <p className={verifyStyles.cooldownAlert.message}>
            {translations.message}
          </p>

          <div className={verifyStyles.cooldownAlert.timerWrapper}>
            <span className={verifyStyles.cooldownAlert.timerLabel}>
              {translations.remainingLabel}
            </span>
            <time
              className={verifyStyles.cooldownAlert.timerValue}
              dateTime={`PT${cooldownRemaining}S`}
            >
              {formatTimer(cooldownRemaining)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CooldownAlert;
