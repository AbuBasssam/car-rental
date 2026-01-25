import { createContext, useState } from "react";
import { getUserInfo } from "../utils/authUtils";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = getUserInfo();
    return savedUser || null;
  });
  const isLoggedIn = !!user;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const syncWithStorage = () => {
      const savedUser = getUserInfo();
      if (savedUser && !user) {
        setUser(savedUser);
      } else if (!savedUser && user) {
        setUser(null);
      }
    };

    syncWithStorage();

    const interval = setInterval(syncWithStorage, 500);

    return () => clearInterval(interval);
  }, [user]);
  const login = (userInfo) => {
    setUser(userInfo);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading,
        login,
        logout,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
