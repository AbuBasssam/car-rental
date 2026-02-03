import { useTranslation } from "react-i18next";
import { LogOut, User, Settings } from "lucide-react";
import NavLinks from "./navLinks";
import AuthButtons from "./AuthButtons";
import localeKeys from "../../utils/localeKeys.js";
import { useAuth } from "../../hooks/useAuth";
import { useLogout as logout } from "../../hooks/useLogout";
import { navbarStyles } from "../../utils/styles.js";
import useClickOutside from "../../hooks/useClickOutside.js";

const MobileMenu = ({ isOpen, onClose, onLogin }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const menuRef = useClickOutside(onClose, isOpen);

  if (!isOpen) return null;

  /**
   * Handle Logout - Uses useLogout hook
   *
   * Flow:
   * 1. Call logout() from useLogout hook
   * 2. logout() clears user state (optimistic update)
   * 3. logout() submits to logoutAction
   * 4. logoutAction communicates with server
   * 5. logoutAction redirects to HOME
   * 6. Close mobile menu
   */
  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleLogin = () => {
    onLogin();
    onClose();
  };
  return (
    <div className={navbarStyles.mobileMenu.container}>
      <div ref={menuRef} className={navbarStyles.mobileMenu.wrapper}>
        {/* قسم المستخدم */}
        {isAuthenticated && (
          <div className={navbarStyles.mobileMenu.userSection}>
            <div className={navbarStyles.mobileMenu.userAvatar}>
              <User size={24} />
            </div>
            <span className={navbarStyles.mobileMenu.userName}>
              {user?.fullName}
            </span>
          </div>
        )}

        {/* 1. تمرير onClose لروابط التنقل */}
        <NavLinks isMobile onLinkClick={onClose} />

        <div className="flex flex-col gap-5 pt-2">
          {!isAuthenticated ? (
            <AuthButtons isMobile={true} onLogin={handleLogin} />
          ) : (
            <>
              <button
                className={navbarStyles.mobileMenu.link}
                onClick={onClose} // Will be Change later
              >
                <div className="flex items-center gap-2">
                  <Settings size={20} />
                  {t(localeKeys.accountSettings)}
                </div>
              </button>

              <button
                className={navbarStyles.mobileMenu.logoutBtn}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                {t(localeKeys.logout)}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
