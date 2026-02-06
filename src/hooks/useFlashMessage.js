import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showInfoToast } from "../config/toastConfig";

/**
 * useFlashMessage Hook
 * * Monitors the location state to display transient flash messages.
 * * Clears the state after displaying the message to prevent it from reappearing on page refresh.
 */
const useFlashMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if there is a message in the state
    if (location.state?.message) {
      const messageKey = location.state.message;

      showInfoToast(t(messageKey));

      // Immediately clean the state
      // We use replace: true to keep the navigation history clean
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, message: undefined },
      });
    }
  }, [location, navigate, t]);
};

export default useFlashMessage;
