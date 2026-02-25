import { branchesPageStyles as s } from "../../utils/styles";
import {
  branchHeaderKeys as tk,
  localeKeys as ltk,
} from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";

const EmptyState = ({ onClear }) => {
  const { t } = useTranslation();
  return (
    <div className={s.empty.wrapper}>
      <div className={s.empty.iconWrapper}>
        <Building2 className="w-10 h-10" />
      </div>
      <p className={s.empty.title}>{t(tk.pageTitle)}</p>
      <p className={s.empty.desc}>{t(tk.pageSubtitle)}</p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 text-sm text-premium-orange hover:underline"
        >
          {t(ltk.clear)}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
