import React from "react";
import { componentStyles } from "./styles";
import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";
export const RoundedThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={componentStyles.roundedToggle}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun size={20} className="text-orange-500" />
      ) : (
        <Moon size={20} className="text-orange-600" />
      )}
    </button>
  );
};
export default RoundedThemeToggle;
