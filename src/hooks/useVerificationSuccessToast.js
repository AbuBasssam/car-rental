import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { keys } from "../utils/constants";
import { showSuccessToast } from "../config/toastConfig";
import { authKeys } from "../utils/localeKeys";

export const useVerificationSuccessToast = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const verified = sessionStorage.getItem(keys.kAccountVerified);

    if (verified === "true") {
      showSuccessToast(t(authKeys.verificationSuccess));
      sessionStorage.removeItem(keys.kAccountVerified);
    }
  }, [t]);
};
