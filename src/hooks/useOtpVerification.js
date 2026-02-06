import { useState, useEffect, useRef } from "react";
import { Navigate, useActionData, useNavigation } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../config/toastConfig";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../routes/paths";
import { errorsKeys } from "../utils/localeKeys";

/**
 * useOtpVerification Hook
 *
 * Reusable hook for OTP verification with resend functionality
 *
 * @param {number} initialTimer - Initial countdown timer in seconds (default: 120)
 * @param {Function} getEmailFn - Function to get email from storage
 * @param {Function} resendCodeFn - Function to resend verification code
 * @returns {Object} OTP verification state and handlers
 *
 * @example
 * // For Account Verification
 * const verification = useOtpVerification(
 *   120,
 *   getValidVerificationEmail,
 *   resendVerificationCode
 * );
 *
 * @example
 * // For Password Reset Verification
 * const verification = useOtpVerification(
 *   60,
 *   getValidResetEmail,
 *   resendResetCode
 * );
 */
const useOtpVerification = (initialTimer = 120, getEmailFn, resendCodeFn) => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const { t } = useTranslation();

  // ============================================
  // 📧 GET EMAIL FROM STORAGE
  // ============================================
  const email = getEmailFn ? getEmailFn() : null;

  // ============================================
  // 📊 STATE MANAGEMENT
  // ============================================
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [timer, setTimer] = useState(initialTimer);
  const [isResending, setIsResending] = useState(false);

  // ============================================
  // 🔒 RACE CONDITION PREVENTION
  // ============================================
  const resendRequestRef = useRef(false);
  const hasAutoSubmitted = useRef(false);
  const formRef = useRef(null);

  // Computed value: Can resend when timer reaches 0
  const canResend = timer === 0;

  // ============================================
  // ⏱️Session expired Handler
  // ============================================
  useEffect(() => {
    if (!email) {
      // Session expired - redirect to forgot password with message
      return Navigate(ROUTES.FORGOT_PASSWORD, {
        state: { message: errorsKeys.resetSessionExpired },
        replace: true,
      });
    }
  });

  // ============================================
  // ⏱️ COUNTDOWN TIMER EFFECT
  // ============================================
  useEffect(() => {
    if (timer <= 0) {
      resendRequestRef.current = false;
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          resendRequestRef.current = false;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, email]);

  // ============================================
  // 🍞 ERROR TOAST HANDLING
  // ============================================
  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData.error);
    }
  }, [actionData]);

  // ============================================
  // 📝 OTP INPUT HANDLERS
  // ============================================

  /**
   * Handle OTP input change
   * - Only accepts numeric values
   * - Auto-advances to next input
   * - Auto-submits when complete
   */
  const handleChange = (index, value) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, "");

    // Prevent multiple digits in single input
    if (numericValue.length > 1) return;

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-advance to next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when last digit is entered
    if (index === 5 && numericValue && !hasAutoSubmitted.current) {
      const isComplete = newOtp.every((digit) => digit !== "");
      if (isComplete) {
        hasAutoSubmitted.current = true;
        setTimeout(() => {
          formRef.current?.requestSubmit();
        }, 300);
      }
    }
  };

  /**
   * Handle keyboard navigation
   * - Backspace: Delete current or move to previous
   * - Arrow keys: Navigate between inputs
   */
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Arrow key navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle paste event
   * - Extracts numeric digits from pasted content
   * - Fills OTP inputs automatically
   * - Auto-submits if complete
   */
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData
      .replace(/[^0-9]/g, "")
      .split("")
      .slice(0, 6);

    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < 6) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);

      // Focus on next empty input or last input
      const focusIndex = Math.min(digits.length, 5);
      inputRefs.current[focusIndex]?.focus();

      // Auto-submit if complete
      if (digits.length === 6 && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        setTimeout(() => {
          formRef.current?.requestSubmit();
        }, 300);
      }
    }
  };

  // ============================================
  // 🔁 RESEND CODE HANDLER
  // ============================================

  /**
   * Handle resend verification code
   * - Prevents race conditions
   * - Shows loading state
   * - Displays toast notifications
   * - Resets timer on success
   */
  const handleResend = () => {
    // Guard clause 1: Check if resend is allowed
    if (!canResend) {
      return;
    }

    // Guard clause 2: Check if request already in progress
    if (resendRequestRef.current) {
      return;
    }

    // Guard clause 3: Double-check timer
    if (timer > 0) {
      return;
    }

    // Guard clause 4: Check if resend function is provided
    if (!resendCodeFn || !email) {
      console.error("Resend function or email not provided");
      return;
    }

    // Mark request as in-progress
    resendRequestRef.current = true;
    setIsResending(true);

    // Call resend function
    resendCodeFn(email)
      .then((result) => {
        if (result.success) {
          showSuccessToast(t(result.message));
          // Reset timer on success
          setTimer(initialTimer);
        } else {
          showErrorToast(t(result.message));
        }
      })
      .catch((error) => {
        console.error("Resend error:", error);
        showErrorToast(
          t(error.message || "Failed to resend code. Please try again."),
        );
      })
      .finally(() => {
        resendRequestRef.current = false;
        setIsResending(false);
      });
  };

  // ============================================
  // 🛠️ UTILITY FUNCTIONS
  // ============================================

  /**
   * Format timer in MM:SS format
   * @param {number} seconds - Seconds to format
   * @returns {string} Formatted time string
   */
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /**
   * Check if OTP is complete (all 6 digits filled)
   * @returns {boolean} True if all digits are filled
   */
  const isOtpComplete = () => {
    return otp.every((digit) => digit !== "");
  };

  // ============================================
  // 📤 RETURN VALUES
  // ============================================
  return {
    email,
    otp,
    timer,
    canResend,
    isResending,
    isSubmitting: navigation.state === "submitting",
    isOtpComplete: isOtpComplete(),
    formRef,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    formatTimer,
  };
};

export default useOtpVerification;
