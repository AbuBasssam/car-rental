import { branchesPageStyles as s } from "../../utils/styles.js";

const SkeletonCard = () => (
  <div className={s.skeleton.card}>
    <div className={s.skeleton.header} />
    <div className={s.skeleton.body}>
      <div className={s.skeleton.line("w-2/3")} />
      <div className={s.skeleton.line("w-1/2")} />
      <div className="h-px bg-soft-gray dark:bg-fiord my-2" />
      <div className="flex gap-2">
        <div className={s.skeleton.line("flex-1 h-8")} />
        <div className={s.skeleton.line("flex-1 h-8")} />
        <div className={s.skeleton.line("w-8 h-8")} />
      </div>
    </div>
  </div>
);
export default SkeletonCard;
