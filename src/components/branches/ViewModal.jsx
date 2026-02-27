import React from "react";
import { X, Building2, MapPin, Navigation, Car, Pencil } from "lucide-react";
import { buttonStyles, branchesPageStyles as s } from "../../utils/styles.js";
import {
  branchCardKeys,
  branchViewKeys as tk,
  localeKeys as ltk,
} from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../layouts/PrimaryButton";
import { keys } from "../../utils/constants";

// ─── Sub-Components ───────────────────────────────────────────────────────────

/**
 * A single info row: icon + label + value.
 * @param {{ icon: React.ElementType|string, label: string, value: string|number, dir?: string, code?: boolean }} props
 */
const DetailRow = ({ icon: Icon, label, value, dir = "ltr", code = false }) => (
  <div className={s.detailModal.row}>
    <div className={s.detailModal.rowIcon}>
      {typeof Icon === "string" ? (
        <span className="text-xs font-bold">{Icon}</span>
      ) : (
        <Icon className="w-4 h-4" />
      )}
    </div>
    <div>
      <p className={s.detailModal.rowLabel}>{label}</p>
      {code ? (
        <code className="text-sm text-gray-700 dark:text-gray-300">
          {value}
        </code>
      ) : (
        <p className={s.detailModal.rowValue} dir={dir}>
          {value}
        </p>
      )}
    </div>
  </div>
);

/**
 * Status badge row shown at the top of the modal body.
 * @param {{ isActive: boolean, label: string }} props
 */
const StatusRow = ({ isActive, label }) => {
  const { t } = useTranslation();

  return (
    <section className={s.detailModal.statusRow} aria-label="Current Status">
      <div className={s.card.iconWrapper}>
        <Building2 className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className={s.detailModal.rowLabel}>{label}</p>
        <span className={s.card.statusBadge(isActive)}>
          <span className={s.card.statusDot(isActive)} />
          {isActive
            ? t(branchCardKeys.statusActive)
            : t(branchCardKeys.statusInactive)}
        </span>
      </div>
    </section>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────

/**
 * Read-only modal displaying full branch details.
 * Layout uses a single unified grid — no multi-language section splitting.
 * Language is determined at runtime by the active i18n locale.
 *
 * @param {{
 *   branch: object|null,
 *   onClose: Function,
 *   onEdit: Function
 * }} props
 */
const ViewModal = ({ branch, onClose, onEdit }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === keys.kAR;
  if (!branch) return null;

  return (
    <aside
      className={s.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-modal-title"
    >
      <div
        className={s.detailModal.wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className={s.detailModal.header}>
          <h2 id="view-modal-title" className={s.detailModal.title}>
            {t(tk.title)}
          </h2>
          <button
            className={s.detailModal.closeBtn}
            onClick={onClose}
            aria-label={t(ltk.close)}
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Body */}
        <main className={s.detailModal.body}>
          {/* Status */}
          <StatusRow isActive={branch.isActive} label={t(tk.status)} />

          <hr className="border-gray-100 dark:border-gray-800 my-2" />

          {/* Info Grid — single grid, language-agnostic */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailRow
              icon={Building2}
              label={isArabic ? t(tk.nameAr) : t(tk.nameEn)}
              value={branch.name}
              dir={isArabic ? "rtl" : "ltr"}
            />

            <DetailRow
              icon={MapPin}
              label={isArabic ? t(tk.cityAr) : t(tk.cityEn)}
              value={branch.city}
              dir={isArabic ? "rtl" : "ltr"}
            />

            {/* <div className="sm:col-span-2">
              <DetailRow
                icon={Car}
                label={t(tk.fleet)}
                value={t(tk.fleetSummary, {
                  cars: branch.carsCount ?? 0,
                  categories: branch.categoriesCount,
                })}
              />
            </div> */}
          </dl>
        </main>

        {/* Footer */}
        <footer className={s.detailModal.footer}>
          <button
            className={s.detailModal.closeFooterBtn}
            onClick={onClose}
            type="button"
          >
            {t(ltk.close)}
          </button>
          <PrimaryButton
            type="button"
            className={buttonStyles.rounded}
            onClick={() => {
              onClose();
              onEdit(branch);
            }}
          >
            <Pencil className="w-4 h-4  mx-2" />
            {t(ltk.edit)}
          </PrimaryButton>
        </footer>
      </div>
    </aside>
  );
};

export default ViewModal;
