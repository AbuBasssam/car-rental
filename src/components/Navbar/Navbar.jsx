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
import { ROUTES } from "../../routes/paths.js";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-pickled-bluewood border-b shadow-sm z-50  border-eerie-black">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <NavLinks />

        {/* Desktop Action Buttons section*/}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />

          {!isLoggedIn ? (
            <AuthButtons onLogin={handleLogin} />
          ) : (
            <UserMenu onLogout={handleLogout} />
          )}
        </div>

        {/* Mobile Action Buttons section */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />

          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
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
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
