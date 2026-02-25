import { branchesPageStyles as s } from "../../utils/styles";
import BranchSkeletonGrid from "./BranchSkeletonGrid";

// ─── Skeleton Sub-Sections ────────────────────────────────────────────────────
/**
 * Skeleton placeholder for the PageHeader (title group + action button).
 */
const PageHeaderSkeleton = () => (
  <header className={s.header.wrapper} aria-hidden="true">
    <div className={s.header.titleGroup}>
      <div className={s.skeleton.line("w-24 h-3")} />
      <div className={s.skeleton.line("w-48 h-6 mt-1")} />
      <div className={s.skeleton.line("w-72 h-3 mt-2")} />
    </div>
    <div className={s.header.actions}>
      <div className={s.skeleton.line("w-32 h-9 rounded-lg")} />
    </div>
  </header>
);

/**
 * Skeleton placeholder for the three StatsSection cards.
 */
const StatsSectionSkeleton = () => (
  <section className={s.stats.grid} aria-hidden="true">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className={s.skeleton.card}>
        <div className={s.skeleton.body}>
          <div className={s.skeleton.line("w-1/2")} />
          <div className={s.skeleton.line("w-1/4 h-6 mt-1")} />
        </div>
      </div>
    ))}
  </section>
);

/**
 * Skeleton placeholder for the FilterBar (search + two selects + button).
 */
const FilterBarSkeleton = () => (
  <section className={s.filterBar.wrapper} aria-hidden="true">
    <div className="flex flex-wrap items-center gap-4 w-full">
      {/* City search input */}
      <div className={s.skeleton.line("w-48 h-9")} />
      {/* Status select */}
      <div className={s.skeleton.line("w-36 h-9")} />
      {/* Page size select */}
      <div className={s.skeleton.line("w-28 h-9")} />
    </div>
  </section>
);

/**
 * Full-page skeleton shown while the branches page data is loading.
 * Mirrors the layout of StatsSection + FilterBar + BranchGrid
 * using the same skeleton primitives from `branchesPageStyles`.
 *
 * @param {{ count: number }} props - Number of skeleton branch cards to render.
 */
const SkeletonPage = ({ count = 6 }) => (
  <>
    <PageHeaderSkeleton />
    <StatsSectionSkeleton />
    <FilterBarSkeleton />
    <BranchSkeletonGrid count={count} />
  </>
);

export default SkeletonPage;
