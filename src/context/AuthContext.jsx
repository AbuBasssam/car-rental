import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State: user object or null
  const [user, setUser] = useState(null);

  // State: loading state for async operations
  const [isLoading, setIsLoading] = useState(false);

  // Derived state: is user authenticated?
  const isAuthenticated = !!user;

  // Function to set user data (when logging in or registering)
  const setUserData = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (when logging out)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setUser: setUserData,
        clearUser,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
