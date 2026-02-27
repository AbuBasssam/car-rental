import { verifyStyles } from "../../utils/styles";

/**
 * OTP Input Component
 *
 * @param {Object} props
 * @param {string[]} props.otp - Array of OTP digits
 * @param {Object} props.inputRefs - Refs for input elements
 * @param {Function} props.handleChange - Input change handler
 * @param {Function} props.handleKeyDown - Keyboard event handler
 * @param {Function} props.handlePaste - Paste event handler
 * @param {boolean} props.isSubmitting - Form submission state
 * @param {boolean} props.isLocked - Lock state (prevents input)
 * @param {Object} props.translations - Translation object
 */
function OTPInput({
  otp,
  inputRefs,
  handleChange,
  handleKeyDown,
  handlePaste,
  isSubmitting,
  isLocked = false,
  translations,
}) {
  return (
    <fieldset className={verifyStyles.otp.wrapper}>
      <legend className="sr-only">{translations.hint}</legend>

      <div
        className={verifyStyles.otp.inputsContainer}
        dir="ltr"
        role="group"
        aria-label="One-time password input"
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={isSubmitting || isLocked} // Disable when locked
            className={`${verifyStyles.otp.input} ${
              digit ? verifyStyles.otp.inputFilled : verifyStyles.otp.inputEmpty
            } ${isLocked ? verifyStyles.otp.inputLocked : ""}`} // Add locked style
            autoFocus={index === 0 && !isLocked} // Don't autofocus when locked
            aria-label={`${translations.ariaLabel} ${index + 1}`}
            autoComplete={index === 0 ? "one-time-code" : "off"}
          />
        ))}
      </div>

      <p className={verifyStyles.otp.hint} id="otp-hint" role="status">
        {translations.hint}
      </p>
    </fieldset>
  );
}
export default OTPInput;
