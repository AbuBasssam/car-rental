import { branchesPageStyles as s } from "../../utils/styles";
import { branchStatsKeys as tk } from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import StatsCard from "./StatsCard";
import { CheckCircle2, XCircle } from "lucide-react";

const _col = "flex flex-col";
const _colHeader = "flex items-center gap-1.5 mb-1";

/**
 * Displays three summary stat cards: Total, Active, and Inactive branch counts.
 * @param {{ stats: { total: number, active: number, inactive: number } }} props
 */
const StatsSection = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <section className={s.stats.grid}>
      <StatsCard>
        <p className={s.stats.label}>{t(tk.total)}</p>
        <strong className={s.stats.value}>{stats.total}</strong>
      </StatsCard>

      <StatsCard>
        <div className={_col}>
          <div className={_colHeader}>
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className={s.stats.label}>{t(tk.active)}</span>
          </div>
          <strong className={s.stats.valueActive}>{stats.active}</strong>
        </div>
      </StatsCard>

      <StatsCard>
        <div className={_col}>
          <div className={_colHeader}>
            <XCircle className="w-3 h-3 text-red-500" />
            <span className={s.stats.label}>{t(tk.inactive)}</span>
          </div>
          <strong className={s.stats.valueInactive}>{stats.inactive}</strong>
        </div>
      </StatsCard>
    </section>
  );
};

export default StatsSection;
