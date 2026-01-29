import { redirect } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import { clearSession } from "../utils/authUtils";

/**
 * Logout Action for React Router
 * Handles the complete logout flow
 */
export const logoutAction = async () => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.LOGOUT)
    .then((response) => {
      if (response.data?.succeeded) {
        return Promise.resolve(response).then(() => {
          clearSession();
          return redirect(ROUTES.HOME, { replace: true });
        });
      }
    })
    .catch(() => {
      clearSession();

      return redirect(ROUTES.HOME, { replace: true });
    });
};
