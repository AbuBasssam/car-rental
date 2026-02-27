import { useState } from "react";
import { formModes } from "../../utils/constants";
import { validateBranchForm } from "../../utils/validators";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  nameEN: "",
  nameAR: "",
  cityEN: "",
  cityAR: "",
  latitude: "",
  longitude: "",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages all state and submission logic for the branch form modal.
 * Keeps the FormModal component responsible only for rendering.
 *
 * @param {{ mode: "create"|"edit", branch: object|null, onSubmit: Function }} options
 * @returns {{
 *   form: object,
 *   errors: object,
 *   handleFieldChange: (key: string, value: string) => void,
 *   handleSubmit: (e: Event) => void
 * }}
 */
const useFormModal = ({ mode, branch, onSubmit }) => {
  const [form, setForm] = useState(
    mode === formModes.edit && branch ? { ...branch } : INITIAL_FORM,
  );

  const [errors, setErrors] = useState({});

  /**
   * Updates a single form field and clears its error if present.
   * @param {string} key   - Field key (e.g. "nameEN")
   * @param {string} value - New field value
   */
  const handleFieldChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  /**
   * Validates the form and calls onSubmit if valid.
   * Populates errors state if validation fails.
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

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

  return { form, errors, handleFieldChange, handleSubmit };
};

export default useFormModal;
