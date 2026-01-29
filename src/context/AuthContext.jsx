import { createContext, useState, useEffect } from "react";
import { authEventType } from "../utils/constants";
import { getUserInfo } from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State: user object or null
  const [user, setUser] = useState(null);

  // State: loading state for async operations
  // const [isLoading, setIsLoading] = useState(false);

  // Derived state: is user authenticated?
  const isAuthenticated = !!user;
  useEffect(() => {
    const loadUser = () => {
      const userInfo = getUserInfo();
      if (userInfo) {
        setUser(userInfo.fullName);
      }
      // setIsLoading(false);
    };

    loadUser();
  }, []);
  // Function to set user data (when logging in or registering)
  const setUserData = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (when logging out)
  const clearUser = () => {
    setUser(null);
  };
  // Listen for auth events (login/logout)
  useEffect(() => {
    const handleAuthChange = (event) => {
      if (event.detail.type === authEventType.login) {
        setUser(event.detail.user);
      } else if (event.detail.type === authEventType.logout) {
        setUser(null);
      }
    };

    // Subscribe to auth events
    window.addEventListener("authChange", handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        // isLoading,
        setUser: setUserData,
        clearUser,
        // setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
