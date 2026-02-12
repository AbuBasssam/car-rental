import { sectionStyles } from "../../utils/styles";

const Header = ({ title, description }) => (
  <header className="space-y-4">
    <h2 className={sectionStyles.header + " section__header"}>{title}</h2>
    <p className={sectionStyles.description + " section__description"}>
      {description}
    </p>
  </header>
);
export default Header;
