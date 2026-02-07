import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAndClearFlashMessage } from "../utils/flashService";
import {
  showSuccessToast,
  showInfoToast,
  showErrorToast,
} from "../config/toastConfig";
import { flashMessageType } from "../utils/constants";

/**
 *
 */

const useFlashMessage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const flash = getAndClearFlashMessage();

    if (flash) {
      const { messageKey, type } = flash;
      const translatedMessage = t(messageKey);

      switch (type) {
        case flashMessageType.success:
          showSuccessToast(translatedMessage);
          break;
        case flashMessageType.error:
          showErrorToast(translatedMessage);
          break;
        default:
          showInfoToast(translatedMessage);
      }
    }
  }, [t]);
};

export default useFlashMessage;
