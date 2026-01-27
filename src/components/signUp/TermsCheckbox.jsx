import React from "react";
import { signupStyles } from "../../utils/styles";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";

const TermsCheckbox = ({ checked, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start relative z-10">
      <input
        type="checkbox"
        name="acceptedTerms"
        checked={checked}
        onChange={onChange}
        className={signupStyles.form.checkbox}
        required
      />
      <label className={signupStyles.form.checkboxLabel}>
        {t(localeKeys.iAgreeTo)}{" "}
        <a href="#" className={signupStyles.form.checkboxLink}>
          {t(localeKeys.termsOfService)}
        </a>{" "}
        {t(localeKeys.and)}{" "}
        <a href="#" className={signupStyles.form.checkboxLink}>
          {t(localeKeys.privacyPolicyLink)}
        </a>
      </label>
    </div>
  );
};

export default TermsCheckbox;
