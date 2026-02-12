import { useTranslation } from "react-i18next";
import FooterColumn from "./FooterColumn";
import { footerStyles } from "../../utils/styles";
import localeKeys, { footerKeys } from "../../utils/localeKeys";

import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
} from "react-icons/ri";

const Footer = () => {
  const { t } = useTranslation();

  const companyLinks = [
    { label: t(footerKeys.aboutUs), url: "#" },
    { label: t(footerKeys.ourFleet), url: "#" },
    { label: t(footerKeys.services), url: "#" },
    { label: t(footerKeys.privacyPolicy), url: "#" },
  ];

  const quickLinks = [
    { label: t(footerKeys.title), url: "#how-it-works" },
    { label: t(footerKeys.title), url: "#choose" },
    { label: t(footerKeys.rentACar), url: "#cars" },
    { label: t(localeKeys.contact), url: "#contact" },
  ];

  const contactInfo = [
    { icon: RiMapPinLine, text: "123 Business Bay, Dubai, UAE" },
    { icon: RiPhoneLine, text: "+971 50 123 4567" },
    { icon: RiMailLine, text: "support@carrental.com" },
  ];

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        {/* First column: Brand and description */}
        <div className={footerStyles.brand.wrapper}>
          <div className={footerStyles.brand.logo}>{t(localeKeys.appName)}</div>
          <p className={footerStyles.brand.description}>
            {t(footerKeys.description)}
          </p>
          <div className={footerStyles.brand.socialWrapper}>
            <a
              href="#"
              className={footerStyles.socialIcon}
              aria-label="Facebook"
            >
              <RiFacebookCircleLine size={20} />
            </a>
            <a
              href="#"
              className={footerStyles.socialIcon}
              aria-label="Instagram"
            >
              <RiInstagramLine size={20} />
            </a>
            <a
              href="#"
              className={footerStyles.socialIcon}
              aria-label="Twitter"
            >
              <RiTwitterXLine size={20} />
            </a>
          </div>
        </div>

        {/* Second column: Company links */}
        <FooterColumn title={t(footerKeys.company)} links={companyLinks} />

        {/* Third column: Quick links */}
        <FooterColumn title={t(footerKeys.quickLinks)} links={quickLinks} />

        {/* Fourth column: Contact */}
        <div className={footerStyles.contact.wrapper}>
          <h4 className={footerStyles.contact.title}>
            {t(footerKeys.getInTouch)}
          </h4>
          <ul className={footerStyles.contact.list}>
            {contactInfo.map((item, index) => (
              <li key={index} className={footerStyles.contact.item}>
                <item.icon className={footerStyles.contact.icon} size={20} />
                <span className={footerStyles.contact.text}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className={footerStyles.copyright.wrapper}>
        <p className={footerStyles.copyright.text}>
          © {new Date().getFullYear()} {t(localeKeys.appName)}.{" "}
          {t(footerKeys.allRightsReserved)}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
