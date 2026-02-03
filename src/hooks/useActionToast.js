import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { showErrorToast } from "../config/toastConfig";
import { useActionError } from "./useActionError";
import { getErrorMessage } from "../utils/helpers";

/**
 * The primary Hook for displaying errors.
 * Combines validation errors and action errors into a single flow.
 */
export const useActionToast = (actionData, options = {}) => {
  const { t } = useTranslation();
  const { maxToasts = 1 } = options;
  const errorState = useActionError(actionData);

  useEffect(() => {
    if (!errorState || !errorState.hasError) return;

    const toastOptions = { rtl: errorState.isRtl };

    // 1. Check for Validation Errors first (Parametric errors)
    const vErrors = Object.values(errorState.validationErrors);
    if (vErrors.length > 0) {
      vErrors.slice(0, maxToasts).forEach((err) => {
        showErrorToast(getErrorMessage(err, t), toastOptions);
      });
      return;
    }

    // 2. Check for General Error Array
    if (errorState.errors.length > 0) {
      errorState.errors.slice(0, maxToasts).forEach((err) => {
        showErrorToast(err, toastOptions);
      });
      return;
    }

    // 3. Final Fallback: Single Message (Key or String)
    if (errorState.message) {
      const finalMsg = errorState.isMessageKey
        ? t(errorState.message)
        : errorState.message;
      showErrorToast(finalMsg, toastOptions);
    }
  }, [errorState, t, maxToasts]);
};
