import React from "react";
import { X, Building2, MapPin, Navigation, Car, Pencil } from "lucide-react";
import { branchesPageStyles as s } from "../../utils/styles.js";

const ViewModal = ({ branch, onClose, onEdit }) => {
  if (!branch) return null;

  return (
    <aside
      className={s.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={s.detailModal.wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className={s.detailModal.header}>
          <h2 id="modal-title" className={s.detailModal.title}>
            Branch Details
          </h2>
          <button
            className={s.detailModal.closeBtn}
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Body */}
        <main className={s.detailModal.body}>
          {/* Status */}
          <section
            className={s.detailModal.statusRow}
            aria-label="Current Status"
          >
            <div className={s.card.iconWrapper}>
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={s.detailModal.rowLabel}>Status</p>
              <span className={s.card.statusBadge(branch.isActive)}>
                <span className={s.card.statusDot(branch.isActive)} />
                {branch.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800 my-2" />

          <div className="space-y-6">
            {/* Names */}
            <section
              className={s.detailModal.bilingualRow}
              aria-label="Branch Names"
            >
              <DetailRow
                icon="EN"
                label="Name (English)"
                value={branch.nameEN}
              />
              <DetailRow
                icon="AR"
                label="الاسم (بالعربي)"
                value={branch.nameAR}
                dir="rtl"
              />
            </section>

            {/* Cities */}
            <section
              className={s.detailModal.bilingualRow}
              aria-label="Location Details"
            >
              <DetailRow
                icon={MapPin}
                label="City (EN)"
                value={branch.cityEN}
              />
              <DetailRow
                icon={MapPin}
                label="المدينة (AR)"
                value={branch.cityAR}
                dir="rtl"
              />
            </section>

            {/* Coordinates */}
            <section
              className={s.detailModal.bilingualRow}
              aria-label="Geographical Coordinates"
            >
              <DetailRow
                icon={Navigation}
                label="Latitude"
                value={branch.latitude}
                code
              />
              <DetailRow
                icon={Navigation}
                label="Longitude"
                value={branch.longitude}
                code
              />
            </section>

            {/* Fleet */}
            <section
              className={s.detailModal.bilingualRow}
              aria-label="Fleet Statistics"
            >
              <DetailRow
                icon={Car}
                label="Fleet Information"
                value={`${branch.carsCount} cars across ${branch.categoriesCount} categories`}
              />
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className={s.detailModal.footer}>
          <button
            className={s.detailModal.closeFooterBtn}
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className={s.detailModal.editBtn}
            type="button"
            onClick={() => {
              onClose();
              onEdit(branch);
            }}
          >
            <Pencil className="w-4 h-4 inline-block mr-2" />
            Edit Branch
          </button>
        </footer>
      </div>
    </aside>
  );
};

export default ViewModal;

const DetailRow = ({ icon: Icon, label, value, dir = "ltr", code = false }) => {
  return (
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
};
