import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";
import { ROUTES } from "../../routes/paths.js";

const NavLinks = ({ isMobile = false, onLinkClick }) => {
  const { t } = useTranslation();

  const links = [
    { key: localeKeys.fleet, href: ROUTES.FLEET },
    { key: localeKeys.locations, href: ROUTES.LOCATIONS },
    { key: localeKeys.about, href: ROUTES.ABOUT },
    { key: localeKeys.contact, href: ROUTES.CONTACT },
  ];

  const containerClass = isMobile
    ? "flex flex-col gap-2 dark:bg-transparent"
    : "hidden md:flex items-center gap-10";

  const linkClass = isMobile
    ? "py-2 block interactive-text"
    : "font-heading text-base font-medium interactive-text";

  return (
    <div className={containerClass}>
      {links.map((item) => (
        <a
          key={item.key}
          href={`#${item.href}`}
          className={linkClass}
          onClick={onLinkClick}
        >
          {t(item.key)}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
