import React from "react";

export const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="footer__title">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} className="footer__link">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
export default FooterColumn;
