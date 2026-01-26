import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import enUS from "date-fns/locale/en-US";
import ar from "date-fns/locale/ar-SA";
import { keys } from "../../utils/constants";

registerLocale(keys.kEN, enUS);
registerLocale(keys.kAR, ar);

const DateInput = ({
  label,
  value,
  onChange,
  name,
  min,
  lang = keys.kEN,
  placeholderText = "dd-MM-yyyy",
}) => {
  const safeDate = value instanceof Date && !isNaN(value) ? value : null;

  return (
    <div
      className="flex flex-col gap-1"
      dir={lang === keys.kAR ? "rtl" : "ltr"}
    >
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </label>

      <div className="flex items-center gap-2 border border-mercury dark:border-pickled-bluewood rounded-lg px-3 py-2 bg-white dark:bg-mirage focus-within:border-premium-orange focus-within:ring-2 focus-within:ring-premium-orange/20 transition-all">
        <DatePicker
          className="w-full text-sm outline-none bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          selected={safeDate}
          onChange={onChange}
          name={name}
          locale={lang}
          dateFormat="dd-MM-yyyy"
          minDate={min}
          placeholderText={placeholderText}
          todayButton={lang === keys.kAR ? "اليوم" : "Today"}
        />
      </div>
    </div>
  );
};

export default DateInput;
