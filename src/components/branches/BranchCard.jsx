import { createContext, useContext } from "react";
import { branchesPageStyles as s } from "../../utils/styles.js";
import {
  branchCardKeys as tk,
  localeKeys as ltk,
} from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import {
  Building2,
  MapPin,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

// ─── Internal Context ─────────────────────────────────────────────────────────

const BranchContext = createContext(null);

/**
 * Returns the nearest BranchCard context value.
 * @throws {Error} When used outside a BranchCard root
 * @returns {{ branch: object }}
 */
const useBranchContext = () => {
  const ctx = useContext(BranchContext);
  if (!ctx)
    throw new Error(
      "BranchCard sub-components must be used inside <BranchCard>",
    );
  return ctx;
};

/**
 * Displays the card top bar with the branch icon and active/inactive status badge.
 */
const CardHeader = () => {
  const { branch } = useBranchContext();
  const { t } = useTranslation();

  return (
    <header className={s.card.header}>
      <div className={s.card.iconWrapper}>
        <Building2 className="w-5 h-5" />
      </div>
      <span className={s.card.statusBadge(branch.isActive)}>
        <span className={s.card.statusDot(branch.isActive)} />
        {branch.isActive ? t(tk.statusActive) : t(tk.statusInactive)}
      </span>
    </header>
  );
};

/**
 * Displays the branch name and city.
 */
const CardBody = () => {
  const { branch } = useBranchContext();

  return (
    <section className={s.card.body}>
      <h3 className={s.card.name}>{branch.name}</h3>
      <p className={s.card.city}>
        <MapPin className={s.card.cityIcon} />
        {branch.city}
      </p>
      <div className={s.card.divider} />
      <div className={s.card.metaRow}>
        {/*
        // TODO: Uncomment when carsCount is reliable
        <div className={s.card.metaItem}>
          <Car className="w-3.5 h-3.5 text-premium-orange" />
          <span className={s.card.metaValue}>{branch.carsCount ?? 0}</span>
          <span className={s.card.metaLabel}>{t(branchKeys.cardCarsCount)}</span>
        </div> */}
      </div>
    </section>
  );
};

/**
 * Renders the View, Edit, Toggle, and Delete action buttons.
 * Callbacks are owned here — not passed through the root.
 *
 * @param {{
 *   onView:   (branch: object) => void,
 *   onEdit:   (branch: object) => void,
 *   onDelete: (branch: object) => void,
 *   onToggle: (branch: object) => void
 * }} props
 */
const CardActions = ({ onView, onEdit, onDelete, onToggle }) => {
  const { branch } = useBranchContext();
  const { t } = useTranslation();

  return (
    <footer className={s.card.actions}>
      <button
        className={s.card.actionBtn("view")}
        onClick={() => onView(branch)}
      >
        {t(tk.actionView)}
      </button>

      <button
        className={s.card.actionBtn("edit")}
        onClick={() => onEdit(branch)}
      >
        {t(ltk.edit)}
      </button>

      <button
        className={s.card.actionBtn("toggle")}
        onClick={() => onToggle(branch)}
        title={t(tk.cardActionToggle)}
      >
        {branch.isActive ? (
          <ToggleRight className="w-4 h-4" />
        ) : (
          <ToggleLeft className="w-4 h-4" />
        )}
      </button>

      <button
        className={s.card.actionBtn("delete")}
        onClick={() => onDelete(branch)}
        title={t(ltk.delete)}
        disabled={branch.carsCount > 0}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </footer>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────

/**
 * Branch card compound component.
 * Injects `branch` into an internal Context so sub-components
 * can read it directly — no prop drilling.
 *
 * @example
 * <BranchCard branch={branch}>
 *   <BranchCard.Header />
 *   <BranchCard.Body />
 *   <BranchCard.Actions
 *     onView={handleView}
 *     onEdit={handleEdit}
 *     onDelete={handleDelete}
 *     onToggle={handleToggle}
 *   />
 * </BranchCard>
 *
 * @param {{ branch: object, children: React.ReactNode }} props
 */
export const BranchCard = ({ branch, children }) => (
  <BranchContext.Provider value={{ branch }}>
    <article className={s.card.wrapper}>{children}</article>
  </BranchContext.Provider>
);

BranchCard.Header = CardHeader;
BranchCard.Body = CardBody;
BranchCard.Actions = CardActions;

export default BranchCard;
