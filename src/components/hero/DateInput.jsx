import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import enUS from "date-fns/locale/en-US";
import ar from "date-fns/locale/ar-SA";
import { keys } from "../../utils/constants";
import { formInputStyles } from "../../utils/styles";
import { bookingKeys } from "../../utils/localeKeys";

registerLocale(keys.kEN, enUS);
registerLocale(keys.kAR, ar);

const DateInput = ({ label, value, onChange, name, min, placeholderText }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === keys.kAR ? keys.kAR : keys.kEN;
  const safeDate = value instanceof Date && !isNaN(value) ? value : null;

  return (
    <div className={formInputStyles.container}>
      <label className={formInputStyles.label}>{label}</label>

      <div className={formInputStyles.inputWrapper}>
        <DatePicker
          className={formInputStyles.input}
          selected={safeDate}
          onChange={onChange}
          name={name}
          locale={currentLang}
          dateFormat="dd-MM-yyyy"
          minDate={min}
          placeholderText={placeholderText || t(bookingKeys.dateFormat)}
          todayButton={t(bookingKeys.today)}
        />
      </div>
    </div>
  );
};
export default DateInput;
