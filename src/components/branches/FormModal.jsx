import React, { useState } from "react";
import { branchesPageStyles as s } from "../../utils/styles";
import { X, Loader2 } from "lucide-react";
import { formModes } from "../../utils/constants";
import { validateBranchForm } from "../../utils/validators";

//
/**
 * Create / Edit Form Modal
 * @param {*} param0
 * @returns
 */
const FormModal = ({ mode, branch, onClose, onSubmit, loading }) => {
  const INITIAL_FORM = {
    nameEN: "",
    nameAR: "",
    cityEN: "",
    cityAR: "",
    latitude: "",
    longitude: "",
  };

  const [form, setForm] = useState(
    mode === formModes.edit && branch ? { ...branch } : INITIAL_FORM,
  );
  const [errors, setErrors] = useState({});

  // const validate = () => {
  //   const e = {};
  //   const exceedMax = (val) => val.trim().length > 75;

  //   if (!form.nameEN.trim()) e.nameEN = "Name (EN) is required";
  //   else if (exceedMax(form.nameEN)) e.nameEN = "Maximum 75 characters allowed";

  //   if (!form.nameAR.trim()) e.nameAR = "الاسم العربي مطلوب";
  //   else if (exceedMax(form.nameAR)) e.nameAR = "الحد الأقصى 75 حرفاً";

  //   if (!form.cityEN.trim()) e.cityEN = "City (EN) is required";
  //   if (!form.cityAR.trim()) e.cityAR = "المدينة مطلوبة";

  //   const lat = parseFloat(form.latitude);
  //   const lng = parseFloat(form.longitude);
  //   if (isNaN(lat) || lat < -90 || lat > 90)
  //     e.latitude = "Invalid Latitude (-90 to 90)";
  //   if (isNaN(lng) || lng < -180 || lng > 180)
  //     e.longitude = "Invalid Longitude (-180 to 180)";

  //   return e;
  // };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateBranchForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
    });
  };

  const renderField = (key, label, placeholder, dir = "ltr", type = "text") => {
    const fieldId = `field-${key}`;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className={s.formModal.fieldLabel}>
          {label} <span className="text-red-500">*</span>
        </label>
        <input
          id={fieldId}
          type={type}
          value={form[key]}
          onChange={(e) => {
            setForm((p) => ({ ...p, [key]: e.target.value }));
            if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
          }}
          placeholder={placeholder}
          dir={dir}
          aria-invalid={errors[key] ? "true" : "false"}
          className={errors[key] ? s.formModal.inputError : s.formModal.input}
        />
        {errors[key] && (
          <p className={s.formModal.errorMsg} role="alert">
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  return (
    <aside
      className={s.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={s.formModal.wrapper} onClick={(e) => e.stopPropagation()}>
        {/* 1. Header */}
        <header className={s.formModal.header}>
          <h2 className={s.formModal.title}>
            {mode === formModes.edit ? "Edit Branch" : "Add New Branch"}
          </h2>
          <button
            className={s.formModal.closeBtn}
            onClick={onClose}
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <form onSubmit={onFormSubmit} noValidate>
          <main className={s.formModal.body}>
            <fieldset className="space-y-4">
              <legend className={s.formModal.sectionTitle}>
                Identity Information
              </legend>
              <div className={s.formModal.grid2}>
                {renderField("nameEN", "Name (English)", "e.g. Riyadh Main")}
                {renderField(
                  "nameAR",
                  "الاسم (عربي)",
                  "مثال: فرع الرياض",
                  "rtl",
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-4 mt-6">
              <legend className={s.formModal.sectionTitle}>
                Location Details
              </legend>
              <div className={s.formModal.grid2}>
                {renderField("cityEN", "City (English)", "e.g. Riyadh")}
                {renderField("cityAR", "المدينة (عربي)", "مثال: الرياض", "rtl")}
              </div>
            </fieldset>

            <fieldset className="space-y-4 mt-6">
              <legend className={s.formModal.sectionTitle}>
                GPS Coordinates
              </legend>
              <div className={s.formModal.grid2}>
                {renderField(
                  "latitude",
                  "Latitude",
                  "24.7136",
                  "ltr",
                  "number",
                )}
                {renderField(
                  "longitude",
                  "Longitude",
                  "46.6753",
                  "ltr",
                  "number",
                )}
              </div>
            </fieldset>
          </main>

          {/* Footer */}
          <footer className={s.formModal.footer}>
            <button
              type="button" // مهم جداً: لكي لا يقوم بعمل Submit
              className={s.formModal.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit" // هذا هو الزر الذي يطلق الـ onFormSubmit
              className={s.formModal.submitBtn}
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === formModes.edit ? "Save Changes" : "Create Branch"}
            </button>
          </footer>
        </form>
      </div>
    </aside>
  );
};
export default FormModal;
