import { branchesPageStyles as s } from "../../utils/styles";
import StatsCard from "./statsCard";
import { CheckCircle2, XCircle } from "lucide-react";

const StatsSection = ({ stats }) => {
  return (
    <section className={s.stats.grid}>
      {/* Total Branches Card */}
      <StatsCard>
        <p className={s.stats.label}>Total Branches</p>

        <strong className={s.stats.value}>{stats.total}</strong>
      </StatsCard>

      {/* Active Branches */}
      <StatsCard>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className={s.stats.label}>Active</span>
          </div>
          <strong className={s.stats.valueActive}>{stats.active}</strong>
        </div>
      </StatsCard>

      {/* Deactivated Branches */}
      <StatsCard>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <XCircle className="w-3 h-3 text-red-500" />
            <span className={s.stats.label}>Inactive</span>
          </div>
          <strong className={s.stats.valueInactive}>{stats.inactive}</strong>
        </div>
      </StatsCard>
    </section>
  );
};
export default StatsSection;
