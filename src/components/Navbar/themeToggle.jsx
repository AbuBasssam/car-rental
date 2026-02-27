import { Moon, Sun } from "lucide-react";
import IconButton from "./IconButton";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  return (
    <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? (
        <Sun size={18} className="text-premium-orange" />
      ) : (
        <Moon size={18} className="text-deep-gray" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
