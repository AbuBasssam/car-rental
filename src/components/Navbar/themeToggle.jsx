import { Moon, Sun } from "lucide-react";
import IconButton from "./IconButton";

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <IconButton onClick={onToggle}>
      {isDarkMode ? (
        <Sun size={18} className="text-premium-orange" />
      ) : (
        <Moon size={18} className="text-deep-gray" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
