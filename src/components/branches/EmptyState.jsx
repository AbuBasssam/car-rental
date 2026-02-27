import { branchesPageStyles as s } from "../../utils/styles";
import { branchEmptyStateKeys as tk } from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";

const EmptyState = ({ isFiltering }) => {
  const { t } = useTranslation();
  return (
    <div className={s.empty.wrapper}>
      <div className={s.empty.iconWrapper}>
        <Building2 className="w-10 h-10" />
      </div>
      <p className={s.empty.title}>
        {isFiltering ? t(tk.noResultsTitle) : t(tk.emptyStateTitle)}
      </p>

      <p className={s.empty.desc}>
        {isFiltering ? t(tk.noResultsSubtitle) : t(tk.emptyStateSubtitle)}
      </p>
    </div>
  );
};
export default EmptyState;
