import { useState, useEffect, useRef } from "react";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../config/toastConfig";
import { useTranslation } from "react-i18next";
import { flashMessageType } from "../utils/constants";
import { setFlashMessage } from "../utils/flashService";

/**
 * useOtpVerification Hook (Production-Ready)
 *
 * A robust, time-based OTP verification hook with:
 * - 410 Gone handling for max attempts lockout
 * - Fully derived cooldown state (no useState for countdown)
 * - Time-based calculation for accuracy
 * - Zero cascading renders
 * - Auto-advance & Auto-submit
 * - Resend logic with cooldown
 *
 * @param {number} initialTimer - Resend countdown in seconds (default: 120)
 * @param {Function} getEmailFn - Function to retrieve email from storage
 * @param {Function} resendCodeFn - Async function to trigger OTP resend
 * @param {string} redirectPath - Route to navigate on session expiry
 * @param {string} expiryMessageKey - Translation key for expiry message
 *
 * @returns {Object} Hook API
 */
const useOtpVerification = (
  initialTimer = 120,
  getEmailFn,
  resendCodeFn,
  redirectPath,
  expiryMessageKey,
) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const { t } = useTranslation();

  // ======================================================
  // 📌 SESSION
  // ======================================================
  const email = getEmailFn ? getEmailFn() : null;

  // ======================================================
  // 📊 OTP STATE
  // ======================================================
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const formRef = useRef(null);
  const hasAutoSubmitted = useRef(false);

  // ======================================================
  // ⏱️ RESEND TIMER
  // ======================================================
  const [timer, setTimer] = useState(initialTimer);
  const [isResending, setIsResending] = useState(false);
  const resendRequestRef = useRef(false);

  // ======================================================
  // 🔒 LOCK STATE (FULLY DERIVED - NO useState!)
  // ======================================================
  // Extract cooldown from actionData (410 Gone response)
  const cooldownSecondsFromAction = actionData?.meta?.cooldownSeconds ?? 0;

  // Track when lock started (for time-based calculation)
  const cooldownStartedAtRef = useRef(null);

  // Force re-render ticker (visual updates only)
  const [, forceTick] = useState(0);

  // ======================================================
  // 🔒 INITIALIZE LOCK ON 410 GONE
  // ======================================================
  useEffect(() => {
    if (cooldownSecondsFromAction <= 0) return;

    // Save lock start time (only once per lock)
    if (!cooldownStartedAtRef.current) {
      cooldownStartedAtRef.current = Date.now();

      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      hasAutoSubmitted.current = false;
    }
  }, [cooldownSecondsFromAction]);

  // ======================================================
  // ⏱️ COOLDOWN REMAINING (COMPUTED - NOT STORED!)
  // ======================================================
  const cooldownRemaining =
    cooldownSecondsFromAction > 0 && cooldownStartedAtRef.current
      ? Math.max(
          0,
          cooldownSecondsFromAction -
            Math.floor((Date.now() - cooldownStartedAtRef.current) / 1000),
        )
      : 0;

  // 🆕 IMPORTANT: isLocked depends on cooldownRemaining, not actionData!
  const isLocked = cooldownRemaining > 0;

  // Reset lock ref when cooldown expires
  useEffect(() => {
    if (cooldownRemaining === 0 && cooldownStartedAtRef.current) {
      cooldownStartedAtRef.current = null;
    }
  }, [cooldownRemaining]);

  // Tick every second for visual updates (doesn't change state logic!)
  useEffect(() => {
    if (cooldownRemaining <= 0) return;

    const intervalId = setInterval(() => {
      forceTick((v) => v + 1); // Just trigger re-render
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownRemaining]);

  // ======================================================
  // ⏱️ RESEND TIMER COUNTDOWN
  // ======================================================
  useEffect(() => {
    if (timer <= 0) {
      resendRequestRef.current = false;
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const canResend = timer === 0 && !isLocked;

  // ======================================================
  // 🛡️ SESSION WATCHDOG
  // ======================================================
  useEffect(() => {
    const checkAuthSession = () => {
      const currentEmail = getEmailFn ? getEmailFn() : null;
      if (!currentEmail) {
        setFlashMessage(expiryMessageKey, flashMessageType.info);
        navigate(redirectPath, { replace: true });
        return false;
      }
      return true;
    };

    checkAuthSession();
    const heartbeat = setInterval(checkAuthSession, 10000);

    return () => clearInterval(heartbeat);
  }, [navigate, getEmailFn, redirectPath, expiryMessageKey]);

  // ======================================================
  // 🔓 OTP INPUT HANDLERS
  // ======================================================

  /**
   * Handle OTP input change
   */
  const handleChange = (index, value) => {
    if (isLocked) return;

    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-advance
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit
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
   */
  const handleKeyDown = (index, e) => {
    if (isLocked) return;

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle paste event
   */
  const handlePaste = (e) => {
    if (isLocked) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    if (!digits.length) return;

    const newOtp = ["", "", "", "", "", ""];
    digits.forEach((digit, idx) => {
      if (idx < 6) newOtp[idx] = digit;
    });
    setOtp(newOtp);

    // Focus next empty or last input
    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (digits.length === 6 && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 300);
    }
  };

  // ======================================================
  // 🔄 RESEND CODE HANDLER
  // ======================================================

  /**
   * Handle resend verification code
   */
  const handleResend = async () => {
    if (!canResend || resendRequestRef.current || !email) return;

    resendRequestRef.current = true;
    setIsResending(true);

    try {
      const result = await resendCodeFn(email);

      if (result.success) {
        showSuccessToast(t(result.message));
        setTimer(initialTimer);
        setOtp(["", "", "", "", "", ""]);
        hasAutoSubmitted.current = false;

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        showErrorToast(t(result.message));
      }
    } catch (error) {
      console.error("Resend error:", error);
      showErrorToast(t("errors.network_error"));
    } finally {
      resendRequestRef.current = false;
      setIsResending(false);
    }
  };

  // ======================================================
  // 🛠️ UTILITY FUNCTIONS
  // ======================================================

  /**
   * Format seconds to MM:SS
   */
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  /**
   * Check if OTP is complete
   */
  const isOtpComplete = otp.every((digit) => digit !== "");

  // ======================================================
  // 📤 PUBLIC API
  // ======================================================
  return {
    email,
    otp,
    timer,
    canResend,
    isResending,
    isSubmitting: navigation.state === "submitting",
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
  };
};

export default useOtpVerification;
