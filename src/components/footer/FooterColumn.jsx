import { footerStyles } from "../../utils/styles";

const FooterColumn = ({ title, links }) => (
  <div className={footerStyles.column.wrapper}>
    <h4 className={footerStyles.column.title}>{title}</h4>
    <ul className={footerStyles.column.linksList}>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} className={footerStyles.column.link}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;
