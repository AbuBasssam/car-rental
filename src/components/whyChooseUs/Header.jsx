const Header = ({ title, description }) => (
  <header className="space-y-4">
    <h2 className="section__header">{title}</h2>
    <p className="section__description">{description}</p>
  </header>
);
export default Header;
