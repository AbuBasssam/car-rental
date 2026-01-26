import { useTranslation } from "react-i18next";
import NavLinks from "./navLinks";
import AuthButtons from "./AuthButtons";
import localeKeys from "../../utils/localeKeys.js";

const MobileMenu = ({ isOpen, onLogin, isLoggedIn, onClose, onLogout }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="md:hidden bg-white dark:bg-transparent
    border-soft-gray border-t dark:border-eerie-black shadow-sm animate-slideDown"
    >
      <div className="flex flex-col px-6 py-4 gap-4 font-heading text-lg">
        <NavLinks isMobile onLinkClick={onClose} />
        <div className="flex flex-col gap-4 mt-2">
          {!isLoggedIn ? (
            <AuthButtons isMobile={true} onLogin={onLogin} />
          ) : (
            <div className="flex flex-col gap-2">
              <a
                href="#AccountSettings"
                className="font-heading interactive-text"
                onClick={onLogin}
              >
                {t(localeKeys.accountSettings)}
              </a>
              <a
                href="#Logout"
                className="font-heading interactive-text"
                onClick={onLogout}
              >
                {t(localeKeys.logout)}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
