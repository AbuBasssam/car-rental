import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logOut as logOutService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/paths";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { isLoggedIn, isLoading, login, logout, setIsLoading } = context;

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // call logout API
      await logOutService();

      // make user unAuth

      logout();

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Logout error:", error);

      logout();
      navigate(ROUTES.HOME);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    login,
    logout: handleLogout,
  };
};
