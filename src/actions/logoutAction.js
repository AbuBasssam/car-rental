import { redirect } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import { resetAuthCache, setUserLogout } from "../loaders/Rootloader";
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
  }
  return redirect(ROUTES.HOME, { replace: true });
};
