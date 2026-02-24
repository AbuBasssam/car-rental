import { Children } from "react";
import { branchesPageStyles as s } from "../../utils/styles.js";
import {
  Building2,
  MapPin,
  Car,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

const BranchCard = ({ branch, onView, onEdit, onDelete, onToggle }) => (
  <article className={s.card.wrapper} key={branch.id}>
    <CardHeader isActive={branch.isActive} />
    <MainSection branch={branch} />
    <ActionButtons
      branch={branch}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  </article>
);

export default BranchCard;

const CardHeader = ({ isActive }) => {
  return (
    <header className={s.card.header}>
      <div className={s.card.iconWrapper}>
        <Building2 className="w-5 h-5" />
      </div>

      <span className={s.card.statusBadge(isActive)}>
        <span className={s.card.statusDot(isActive)} />
        {isActive ? "Active" : "Inactive"}
      </span>
    </header>
  );
};
const MainSection = ({ branch }) => {
  return (
    <section className={s.card.body}>
      <h3 className={s.card.name}>{branch.name}</h3>
      <p className={s.card.city}>
        <MapPin className={s.card.cityIcon} />
        {branch.city}
      </p>
      <div className={s.card.divider} />
      <div className={s.card.metaRow}>
        <div className={s.card.metaItem}>
          {/*
          //TODO: Handle null/undefined carsCount or delete whole section will handle later
          <Car className="w-3.5 h-3.5 text-premium-orange" />
          <span className={s.card.metaValue}>{branch.carsCount ?? 0}</span>
          
          <span className={s.card.metaLabel}>Cars</span>*/}
        </div>
      </div>
    </section>
  );
};

const ActionButtons = ({ branch, onView, onEdit, onDelete, onToggle }) => {
  return (
    <footer className={s.card.actions}>
      <button
        className={s.card.actionBtn("view")}
        onClick={() => onView(branch)}
      >
        View
      </button>
      <button
        className={s.card.actionBtn("edit")}
        onClick={() => onEdit(branch)}
      >
        Edit
      </button>
      <button
        className={s.card.actionBtn("toggle")}
        onClick={() => onToggle(branch)}
        title="Toggle status"
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
        title="Delete"
        disabled={branch.carsCount > 0}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </footer>
  );
};
