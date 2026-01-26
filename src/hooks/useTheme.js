import { useEffect, useState } from "react";
import { keys } from "../utils/constants";

const useTheme = () => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(keys.kTheme);
    return storedTheme ? storedTheme === "dark" : false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem(keys.kTheme, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(keys.kTheme, "light");
    }
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};

export default useTheme;
