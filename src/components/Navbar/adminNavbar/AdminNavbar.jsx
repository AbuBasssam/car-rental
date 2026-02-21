// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PlusCircle, CalendarCheck, Car, Store } from "lucide-react";
import logo from "../../../assets/logo.svg";
import { adminNavbarStyles as s } from "../../../utils/styles.js";
import Logo from "../logo";
import { useTranslation } from "react-i18next";
import { localeKeys, adminNavbarKeys } from "../../../utils/localeKeys";
import { ADMIN_ROUTES } from "../../../routes/paths.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { t } = useTranslation();
  const navLinks = [
    {
      path: ADMIN_ROUTES.ADD_CAR,
      icon: PlusCircle,
      label: t(adminNavbarKeys.addCar),
    },
    {
      path: ADMIN_ROUTES.MANAGE_CARS,
      icon: Car,
      label: t(adminNavbarKeys.manageCars),
    },
    {
      path: ADMIN_ROUTES.BOOKINGS,
      icon: CalendarCheck,
      label: t(adminNavbarKeys.bookings),
    },
    {
      path: ADMIN_ROUTES.BRANCHES,
      icon: Store,
      label: t(adminNavbarKeys.branches),
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen]);

  return (
    <nav className={s.navbar(scrolled)}>
      <div className={s.navbarInner}>
        <div className={s.navbarCenter}>
          <div className={s.navbarBackground(scrolled)}>
            <div className={s.contentContainer}>
              <Link to="/" className={s.logoLink}>
                <div className={s.logoContainer}>
                  <img
                    src={logo}
                    alt={t(localeKeys.rentoLogo)}
                    className={s.logoImage}
                  />

                  <span className={s.logoText}>{t(localeKeys.appName)}</span>
                </div>
              </Link>

              <div className={s.desktopNav}>
                <div className={s.navLinksContainer}>
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <React.Fragment key={link.path}>
                        <Link to={link.path} className={s.navLink}>
                          <Icon className="w-4 h-4" />
                          <span>{link.label}</span>
                        </Link>
                        {i < navLinks.length - 1 && (
                          <div className={s.navDivider} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className={s.mobileMenuButton}>
                <button
                  ref={buttonRef}
                  onClick={() => setIsOpen((v) => !v)}
                  className={s.menuButton}
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div ref={menuRef} className={s.mobileMenu}>
          <div className={s.mobileMenuContainer}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={s.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
