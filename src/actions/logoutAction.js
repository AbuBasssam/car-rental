import { redirect } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import { resetAuthCache } from "../loaders/Rootloader";
/**
 * Logout Action for React Router
 * Handles the complete logout flow
 */
export const logoutAction = async () => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    if (response.data?.succeeded) {
      resetAuthCache();
      return redirect(ROUTES.HOME, { replace: true });
    }
  } catch {
    resetAuthCache();
  }

  return redirect(ROUTES.HOME, { replace: true });
};
