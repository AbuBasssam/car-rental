import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  getUserInfo,
  signOut as signOutService,
} from "../services/authService";
import { setupTokenRefreshTimer } from "../utils/authUtils";
import { ROUTES } from "../routes/paths";

/**
 * useAuth Hook
 * Manages user authentication state.
 *
 * @returns {Object} - { user, isAuthenticated, isLoading, logout }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // check authentication status on mount
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userInfo = getUserInfo();
        setUser(userInfo);

        // setup auto-refresh for token
        const timerId = setupTokenRefreshTimer();

        // ✅ تنظيف المؤقت عند unmount
        return () => {
          if (timerId) clearTimeout(timerId);
        };
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * دالة تسجيل الخروج
   */
  const logout = async () => {
    try {
      setIsLoading(true);
      await signOutService();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
      navigate(ROUTES.LOGIN);
    }
  };

  /**
   * تحديث معلومات المستخدم
   */
  const updateUser = (newUserInfo) => {
    setUser(newUserInfo);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    updateUser,
  };
};
