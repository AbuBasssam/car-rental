import React from "react";
import { buttonStyles, branchesPageStyles as s } from "../../utils/styles";
import { X, Loader2 } from "lucide-react";
import { formModes } from "../../utils/constants";
import {
  branchFormKeys as branchKeys,
  localeKeys as ltk,
  branchActionsKeys,
} from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../layouts/PrimaryButton";
import useFormModal from "../../hooks/branches/UseBranchFormModal";

// ─── Field Definitions ────────────────────────────────────────────────────────

/**
 * Returns the ordered list of form field descriptors.
 * Each descriptor maps a form key to its label/placeholder keys and input config.
 * @param {Function} t - i18next translation function
 * @returns {Array<{ key: string, label: string, placeholder: string, dir: string, type: string, section: string }>}
 */
const getFieldDescriptors = (t) => [
  // Identity
  {
    key: "nameEN",
    section: "identity",
    label: t(branchKeys.fieldNameEn),
    placeholder: t(branchKeys.placeholderNameEn),
    dir: "ltr",
    type: "text",
  },
  {
    key: "nameAR",
    section: "identity",
    label: t(branchKeys.fieldNameAr),
    placeholder: t(branchKeys.placeholderNameAr),
    dir: "rtl",
    type: "text",
  },
  // Location
  {
    key: "cityEN",
    section: "location",
    label: t(branchKeys.fieldCityEn),
    placeholder: t(branchKeys.placeholderCityEn),
    dir: "ltr",
    type: "text",
  },
  {
    key: "cityAR",
    section: "location",
    label: t(branchKeys.fieldCityAr),
    placeholder: t(branchKeys.placeholderCityAr),
    dir: "rtl",
    type: "text",
  },
  // GPS
  {
    key: "latitude",
    section: "gps",
    label: t(branchKeys.formFieldLatitude),
    placeholder: "24.7136",
    dir: "ltr",
    type: "number",
  },
  {
    key: "longitude",
    section: "gps",
    label: t(branchKeys.formFieldLongitude),
    placeholder: "46.6753",
    dir: "ltr",
    type: "number",
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

/**
 * Single labeled input with inline error display.
 * @param {{ descriptor: object, value: string, error: string, onChange: Function }} props
 */
const FormField = ({ descriptor, value, error, onChange }) => {
  const fieldId = `field-${descriptor.key}`;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className={s.formModal.fieldLabel}>
        {descriptor.label} <span className="text-red-500">*</span>
      </label>
      <input
        id={fieldId}
        type={descriptor.type}
        value={value}
        onChange={(e) => onChange(descriptor.key, e.target.value)}
        placeholder={descriptor.placeholder}
        dir={descriptor.dir}
        aria-invalid={error ? "true" : "false"}
        className={error ? s.formModal.inputError : s.formModal.input}
      />
      {error && (
        <p className={s.formModal.errorMsg} role="alert">
          {error.key ? t(error.key) : error}
        </p>
      )}
    </div>
  );
};

/**
 * A labeled fieldset containing a 2-column grid of form fields.
 * @param {{ legend: string, fields: Array, form: object, errors: object, onChange: Function }} props
 */
const FormSection = ({ legend, fields, form, errors, onChange }) => (
  <fieldset className="space-y-4">
    <legend className={s.formModal.sectionTitle}>{legend}</legend>
    <div className={s.formModal.grid2}>
      {fields.map((descriptor) => (
        <FormField
          key={descriptor.key}
          descriptor={descriptor}
          value={form[descriptor.key]}
          error={errors[descriptor.key]}
          onChange={onChange}
        />
      ))}
    </div>
  </fieldset>
);

// ─── Root Component ───────────────────────────────────────────────────────────

/**
 * Branch create / edit form modal.
 * All state and validation logic lives in `useFormModal` — this component is UI-only.
 *
 * @param {{
 *   mode: "create"|"edit",
 *   branch: object|null,
 *   loading: boolean,
 *   onClose: Function,
 *   onSubmit: Function
 * }} props
 */
const FormModal = ({ mode, branch, onClose, onSubmit, loading }) => {
  const { t } = useTranslation();
  const { form, errors, handleFieldChange, handleSubmit } = useFormModal({
    mode,
    branch,
    onSubmit,
  });

  const isEdit = mode === formModes.edit;
  const allFields = getFieldDescriptors(t);
  const bySection = (sec) => allFields.filter((f) => f.section === sec);

  return (
    <aside
      className={s.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={s.formModal.wrapper} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={s.formModal.header}>
          <h2 className={s.formModal.title}>
            {isEdit ? t(branchKeys.titleEdit) : t(branchKeys.titleCreate)}
          </h2>
          <button
            className={s.formModal.closeBtn}
            onClick={onClose}
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <main className={s.formModal.body}>
            <FormSection
              legend={t(branchKeys.sectionIdentity)}
              fields={bySection("identity")}
              form={form}
              errors={errors}
              onChange={handleFieldChange}
            />

            <div className="mt-6">
              <FormSection
                legend={t(branchKeys.sectionLocation)}
                fields={bySection("location")}
                form={form}
                errors={errors}
                onChange={handleFieldChange}
              />
            </div>

            <div className="mt-6">
              <FormSection
                legend={t(branchKeys.sectionGps)}
                fields={bySection("gps")}
                form={form}
                errors={errors}
                onChange={handleFieldChange}
              />
            </div>
          </main>

          {/* Footer */}
          <footer className={s.formModal.footer}>
            <button
              type="button"
              className={s.formModal.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              {t(ltk.cancel)}
            </button>
            <PrimaryButton
              type="submit"
              className={buttonStyles.roundedDisabled}
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit
                ? t(branchKeys.btnSave)
                : t(branchActionsKeys.createBranch)}
            </PrimaryButton>
          </footer>
        </form>
      </div>
    </aside>
  );
};

export default FormModal;
