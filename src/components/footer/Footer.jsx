import { useTranslation } from "react-i18next";
import FooterColumn from "./FooterColumn";
import localeKeys from "../../utils/localeKeys.js";
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
} from "react-icons/ri";

const Footer = () => {
  const { t } = useTranslation();

  const companyLinks = [
    { label: t(localeKeys.aboutUs), url: "#" },
    { label: t(localeKeys.ourFleet), url: "#" },
    { label: t(localeKeys.services), url: "#" },
    { label: t(localeKeys.privacyPolicy), url: "#" },
  ];

  const quickLinks = [
    { label: t(localeKeys.howItWorks), url: "#how-it-works" },
    { label: t(localeKeys.whyChooseUs), url: "#choose" },
    { label: t(localeKeys.rentACar), url: "#cars" },
    { label: t(localeKeys.contact), url: "#contact" },
  ];

  const contactInfo = [
    { icon: RiMapPinLine, text: "123 Business Bay, Dubai, UAE" },
    { icon: RiPhoneLine, text: "+971 50 123 4567" },
    { icon: RiMailLine, text: "support@carrental.com" },
  ];

  return (
    <footer className="bg-authentic-white dark:bg-mirage border-t border-soft-gray dark:border-dark-border transition-colors duration-300">
      <div className="footer__container">
        {/* First column: Brand and description */}
        <div className="space-y-6">
          <div className="text-2xl font-black text-premium-orange font-heading">
            {t(localeKeys.appName)}
          </div>
          <p className="footer__link leading-relaxed">
            {t(localeKeys.footerDescription)}
          </p>
          <div className="flex gap-4">
            <a href="#" className="footer__social-icon" aria-label="Facebook">
              <RiFacebookCircleLine size={20} />
            </a>
            <a href="#" className="footer__social-icon" aria-label="Instagram">
              <RiInstagramLine size={20} />
            </a>
            <a href="#" className="footer__social-icon" aria-label="Twitter">
              <RiTwitterXLine size={20} />
            </a>
          </div>
        </div>

        {/* Second column: Company links */}
        <FooterColumn title={t(localeKeys.company)} links={companyLinks} />

        {/* Third column: Quick links */}
        <FooterColumn title={t(localeKeys.quickLinks)} links={quickLinks} />

        {/* Fourth column: Contact */}
        <div>
          <h4 className="footer__title">{t(localeKeys.getInTouch)}</h4>
          <ul className="space-y-4">
            {contactInfo.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-deep-gray dark:text-dark-text-muted"
              >
                <item.icon className="text-premium-orange" size={20} />
                <span className="text-sm font-body">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="border-t border-soft-gray dark:border-dark-border py-8 text-center">
        <p className="text-sm text-light-text-subtle dark:text-dark-text-muted">
          © {new Date().getFullYear()} {t(localeKeys.appName)}.{" "}
          {t(localeKeys.allRightsReserved)}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
