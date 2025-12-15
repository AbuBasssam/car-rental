import { useEffect, useState } from "react";

const THEME_KEY = "theme";

const useTheme = () => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme ? storedTheme === "dark" : false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};

export default useTheme;
