import FooterColumn from "./FooterColumn";
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
  const companyLinks = [
    { label: "About Us", url: "#" },
    { label: "Our Fleet", url: "#" },
    { label: "Services", url: "#" },
    { label: "Privacy Policy", url: "#" },
  ];

  const contactInfo = [
    { icon: RiMapPinLine, text: "123 Business Bay, Dubai, UAE" },
    { icon: RiPhoneLine, text: "+971 50 123 4567" },
    { icon: RiMailLine, text: "support@carrental.com" },
  ];

  return (
    <footer className="bg-authentic-white dark:bg-mirage border-t border-soft-gray dark:border-dark-border transition-colors duration-300">
      <div className="footer__container">
        {/* العمود الأول: الهوية والوصف */}
        <div className="space-y-6">
          <div className="text-2xl font-black text-premium-orange font-heading">
            Rento
          </div>
          <p className="footer__link leading-relaxed">
            Experience the ultimate freedom on the road with our premium car
            rental services. Quality vehicles, 24/7 support.
          </p>
          <div className="flex gap-4">
            <a href="#" className="footer__social-icon">
              <RiFacebookCircleLine size={20} />
            </a>
            <a href="#" className="footer__social-icon">
              <RiInstagramLine size={20} />
            </a>
            <a href="#" className="footer__social-icon">
              <RiTwitterXLine size={20} />
            </a>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <FooterColumn title="Company" links={companyLinks} />

        {/* العمود الثالث: أوقات العمل أو روابط إضافية */}
        <FooterColumn
          title="Quick Links"
          links={[
            { label: "How it works", url: "#how-it-works" },
            { label: "Why choose us", url: "#choose" },
            { label: "Rent a car", url: "#cars" },
            { label: "Contact", url: "#contact" },
          ]}
        />

        {/* العمود الرابع: الاتصال */}
        <div>
          <h4 className="footer__title">Get In Touch</h4>
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

      {/* الجزء السفلي: الحقوق */}
      <div className="border-t border-soft-gray dark:border-dark-border py-8 text-center">
        <p className="text-sm text-light-text-subtle dark:text-dark-text-muted">
          © {new Date().getFullYear()} CarRental. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
