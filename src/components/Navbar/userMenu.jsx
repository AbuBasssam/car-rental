import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import DropdownMenu from "../../layouts/dropDownMenu";
import useClickOutside from "../../hooks/useClickOutside.js";
import localeKeys from "../../utils/localeKeys.js";

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const menuRef = useClickOutside(() => setIsOpen(false), isOpen);

  const logoutItem = {
    label: t(localeKeys.logout),
    icon: LogOut,
    onClick: () => {
      setIsOpen(false);
      onLogout();
    },
  };

  const settingsItem = {
    label: t(localeKeys.accountSettings),
    icon: Settings,
    onClick: () => {
      setIsOpen(false);
      // Handle settings navigation
    },
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-authentic-white dark:bg-big-stone dark:hover:bg-fiord text-deep-gray hover:bg-soft-gray dark:text-premium-orange transition"
      >
        <CircleUserRound size={24} />
      </button>
      <DropdownMenu isOpen={isOpen} items={[settingsItem, logoutItem]} />
    </div>
  );
};

export default UserMenu;
