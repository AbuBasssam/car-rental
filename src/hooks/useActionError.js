import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { keys } from "../utils/constants";

export const useActionError = (actionData) => {
  const { i18n } = useTranslation();

  return useMemo(() => {
    if (!actionData) return null;

    const isRtl = i18n.language === keys.kAR;

    return {
      hasError:
        actionData.succeeded === false ||
        !!actionData.error ||
        !!actionData.errors,
      isMessageKey: actionData.isMessageKey,
      message: actionData.message || actionData.error || actionData.errorKey,
      errors: actionData.errors || [],
      validationErrors: actionData.validationErrors || {},
      isRtl,
    };
  }, [actionData, i18n.language]);
};
