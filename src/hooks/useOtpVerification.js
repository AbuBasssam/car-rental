import { useState, useEffect, useRef } from "react";
import { useActionData, useNavigation } from "react-router-dom";
import { resendVerificationCode } from "../actions/ResendVerificationCodeAction";
import { showErrorToast, showSuccessToast } from "../config/toastConfig";
import { useTranslation } from "react-i18next";
import { getValidVerificationEmail } from "../utils/authUtils";

/**
 * Custom hook for verify account page logic
 *
 * Handles all business logic for account verification including:
 * - OTP input management
 * - Timer countdown
 * - Resend functionality with race condition prevention
 * - Auto-submit on completion
 *
 * @param {number} initialTimer - Initial timer value in seconds
 * @returns {Object} Hook state and handlers
 */
export const useOtpVerification = (initialTimer) => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const { t } = useTranslation();

  // Get email from location state or sessionStorage
  const email = getValidVerificationEmail();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [timer, setTimer] = useState(initialTimer);

  const resendRequestRef = useRef(null);
  const [isResending, setIsResending] = useState(false);

  const formRef = useRef(null);
  const hasAutoSubmitted = useRef(false);

  const canResend = timer === 0;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData.error);
    }
  }, [actionData]);

  const handleChange = (index, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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

  const handleKeyDown = (index, e) => {
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

      const focusIndex = Math.min(digits.length, 5);
      inputRefs.current[focusIndex]?.focus();

      if (digits.length === 6 && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        setTimeout(() => {
          formRef.current?.requestSubmit();
        }, 300);
      }
    }
  };

  const handleResend = () => {
    if (!canResend || resendRequestRef.current) {
      return;
    }

    resendRequestRef.current = true;
    setIsResending(true);

    resendVerificationCode(email)
      .then((result) => {
        if (result.success) {
          showSuccessToast(t(result.message));
        } else {
          showErrorToast(t(result.message));
        }
      })
      .finally(() => {
        resendRequestRef.current = null;
        setIsResending(false);
      });
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isOtpComplete = () => {
    return otp.every((digit) => digit !== "");
  };

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
