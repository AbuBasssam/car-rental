const NavLinks = ({ isMobile = false, onLinkClick }) => {
  const links = ["Fleet", "Locations", "About", "Contact"];
  const containerClass = isMobile
    ? "flex flex-col gap-2 dark:bg-transparent"
    : "hidden md:flex items-center gap-10";

  const linkClass = isMobile
    ? "py-2 block interactive-text"
    : "font-heading text-base font-medium interactive-text";

  return (
    <>
      <div className={containerClass}>
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={linkClass}
            onClick={onLinkClick}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
};

export default NavLinks;
