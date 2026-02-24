import { branchesPageStyles as s } from "../../utils/styles.js";
import { branchHeaderKeys as tk } from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../layouts/PrimaryButton";
import { Plus } from "lucide-react";

/**
 * Branches page header with title group and the Add Branch action button.
 * @param {{ addAction: Function }} props
 */
const Header = ({ addAction }) => {
  const { t } = useTranslation();

  return (
    <header className={s.header.wrapper}>
      <hgroup className={s.header.titleGroup}>
        <p className={s.header.title}>{t(tk.title)}</p>
        <h1 className={s.header.subtitle}>{t(tk.subtitle)}</h1>
        <p className={s.header.description}>{t(tk.description)}</p>
      </hgroup>

      <div className={s.header.actions}>
        <PrimaryButton onClick={addAction}>
          <Plus className="w-4 h-4" />
          <span>{t(tk.addBranch)}</span>
        </PrimaryButton>
      </div>
    </header>
  );
};

export default Header;
