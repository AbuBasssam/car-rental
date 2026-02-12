import { sectionStyles } from "../../utils/styles";

const Header = ({ title, description }) => (
  <header className="space-y-4">
    <h2 className={`${sectionStyles.header} ${sectionStyles.revealHeader}`}>
      {title}
    </h2>
    <p
      className={`${sectionStyles.description} ${sectionStyles.revealDescription}`}
    >
      {description}
    </p>
  </header>
);
export default Header;
