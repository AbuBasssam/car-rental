import { redirect } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import { resetAuthCache, setUserLogout } from "../loaders/Rootloader";
import { triggerAuthUpdate } from "../context/AuthBridge";
/**
 * Logout Action for React Router
 * Handles the complete logout flow
 */
export const logoutAction = async () => {
  try {
    await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Logout request failed:", error);
    }
  } finally {
    resetAuthCache();
    setUserLogout();
    triggerAuthUpdate(null, false);
  }
  return redirect(ROUTES.HOME, { replace: true });
};
