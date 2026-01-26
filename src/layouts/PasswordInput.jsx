import { useTranslation } from "react-i18next";
import { loginStyles } from "../utils/styles";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import localeKeys from "../utils/localeKeys.js";

const PasswordInput = ({
  value,
  onChange,
  showPassword,
  onTogglePassword,
  placeholder,
  required = false,
  ...props
}) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t(localeKeys.enterYourPassword);

  return (
    <div className={loginStyles.form.inputContainer}>
      <div className={loginStyles.form.inputWrapper}>
        <div className={loginStyles.form.inputIcon}>
          <FaLock />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          defaultValue={value}
          onChange={onChange}
          placeholder={defaultPlaceholder}
          required={required}
          className={loginStyles.form.input}
          {...props}
        />
        <div
          className={loginStyles.form.passwordToggle}
          onClick={onTogglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    </div>
  );
};
export default PasswordInput;
