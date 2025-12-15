import { useState } from "react";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import DropdownMenu from "../../layouts/dropDownMenu";

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutItem = {
    label: "Logout",
    icon: LogOut,
    onClick: () => {
      setIsOpen(false);
      onLogout();
    },
  };
  const settingsItem = {
    label: "Account Settings",
    icon: Settings,
    onClick: () => {
      setIsOpen(false);
      // Handle settings navigation
    },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-authentic-white dark:bg-big-stone dark:hover:bg-fiord text-deep-gray   hover:bg-soft-gray dark:text-premium-orange transition "
      >
        <CircleUserRound size={24} />
      </button>
      <DropdownMenu isOpen={isOpen} items={[settingsItem, logoutItem]} />
    </div>
  );
};

export default UserMenu;
