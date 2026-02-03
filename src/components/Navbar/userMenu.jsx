import { useTranslation } from "react-i18next";
import {
  CircleUserRound,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import DropdownMenu from "../../layouts/dropDownMenu";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout.js";
import localeKeys from "../../utils/localeKeys.js";
import { navbarStyles } from "../../utils/styles.js";
import useClickOutside from "../../hooks/useClickOutside.js";
import { useState } from "react";
/**
 * UserMenu - Desktop User Menu Component
 *
 * Example component showing how to use useLogout hook
 * This demonstrates the same pattern used in MobileMenu
 */

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const logout = useLogout();
  const menuRef = useClickOutside(() => setIsOpen(false), isOpen);

  /**
   * Handle Logout
   * Uses useLogout hook for proper server communication
   */
  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const menuItems = [
    {
      label: t(localeKeys.accountSettings),
      icon: Settings,
      onClick: () => setIsOpen(false),
    },
    {
      label: t(localeKeys.logout),
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={navbarStyles.userMenu.trigger}
      >
        <div className={navbarStyles.userMenu.avatarWrapper}>
          <CircleUserRound
            size={22}
            className={navbarStyles.userMenu.avatarIcon}
          />
        </div>

        <span className={navbarStyles.userMenu.userName}>{user?.fullName}</span>

        <ChevronDown
          size={14}
          className={`${navbarStyles.userMenu.chevron} ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <DropdownMenu isOpen={isOpen} items={menuItems} />
    </div>
  );
};

export default UserMenu;
