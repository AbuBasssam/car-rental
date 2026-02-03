import { useState } from "react";
import { Menu, X, Globe, CircleUserRound } from "lucide-react";
import Logo from "./logo";
import NavLinks from "./navLinks";
import UserMenu from "./userMenu";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./themeToggle";
import LanguageSelector from "./languageSelector";
import AuthButtons from "./AuthButtons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../routes/paths.js";
import { navbarStyles } from "../../utils/styles.js";
import useScrollLock from "../../hooks/useScrollLock";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Scroll Lock Hook
  useScrollLock(mobileOpen);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => navigate(ROUTES.LOGIN);

  return (
    <header className={navbarStyles.header}>
      <nav className={navbarStyles.navContainer}>
        <Logo />
        <NavLinks />

        {/* Desktop Action Buttons section*/}
        <div className={navbarStyles.actionButtons}>
          <LanguageSelector />
          <ThemeToggle />

          {!isAuthenticated ? (
            <AuthButtons onLogin={handleLogin} />
          ) : (
            <UserMenu />
          )}
        </div>

        {/* Mobile Action Buttons section */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />

          <button
            className={navbarStyles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={26} className="text-dark-gray dark:text-white" />
            ) : (
              <Menu size={26} className="text-dark-gray dark:text-white" />
            )}
          </button>
        </div>

        {/* End Navbar */}
      </nav>
      <MobileMenu
        isOpen={mobileOpen}
        onLogin={handleLogin}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default Navbar;
