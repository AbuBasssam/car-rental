import { branchesPageStyles as s } from "../../utils/styles.js";
import PrimaryButton from "../../layouts/primaryButton.jsx";
import { Plus } from "lucide-react";
import { Children } from "react";
const Header = ({ title, subtitle, addAction }) => {
  return (
    <header className={s.header.wrapper}>
      <hgroup className={s.header.titleGroup}>
        <p className={s.header.eyebrow}>Fleet Management</p>
        <h1 className={s.header.title}>{title}</h1>
        {subtitle && <p className={s.header.subtitle}>{subtitle}</p>}
      </hgroup>

      <div className={s.header.actions}>
        <PrimaryButton onClick={addAction}>
          <Plus className="w-4 h-4" />
          <span> Add Branch</span>
        </PrimaryButton>
      </div>
    </header>
  );
};
export default Header;
