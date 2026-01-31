import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

/**
 * Custom hook to handle and display toast notifications from Action Data.
 * This hook centralizes error handling for both local validation (translation keys)
 * and server-side responses (direct strings or complex objects).
 * @param {Object} actionData - The data object returned from useActionData()
 */
export const useActionToast = (actionData) => {
  const { t } = useTranslation();

  useEffect(() => {
    // If no action data is present, do nothing
    if (!actionData) return;

    /**
     * 1. Handle Normalized Error Keys
     * Used for local validation or specific fallback keys (e.g., validationKeys.invalidOrExpiredCode)
     */
    if (actionData.errorKey) {
      toast.error(t(actionData.errorKey));
    }

    /**
     * 2. Handle Direct Error Messages
     * Used for raw strings returned from the server API responses
     */
    if (actionData.error) {
      toast.error(actionData.error);
    }

    /**
     * 3. Handle API Error Arrays
     * Iterates through an array of error messages sent by the backend
     */
    if (actionData.errors && Array.isArray(actionData.errors)) {
      actionData.errors.forEach((err) => toast.error(err));
    }

    /**
     * 4. Handle Complex Field Validation Objects
     * Extracts keys and params for sophisticated multilingual error reporting
     */
    if (actionData.validationErrors) {
      // Extract the first error found in the validation object
      const firstErrorKey = Object.keys(actionData.validationErrors)[0];
      const errorObj = actionData.validationErrors[firstErrorKey];

      if (errorObj) {
        showTranslationError(errorObj);
      }
    }

    /**
     * Helper function to process translation keys with dynamic parameters
     * @param {Object} errorObj - Object containing key and optional params
     */
    function showTranslationError(errorObj) {
      if (errorObj.params) {
        const params = { ...errorObj.params };

        // If the parameter contains a field key, translate the field name first
        if (params.field) {
          params.field = t(params.field);
        }

        // Display translated message with injected parameters
        toast.error(t(errorObj.key, params));
      } else {
        // Simple key translation without parameters
        toast.error(t(errorObj.key));
      }
    }
  }, [actionData, t]);
};
