import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const DateInput = ({
  label,
  value,
  onChange,
  name,
  min,
  lang = "en-US",
  placeholderText = "dd-mm-yyyy",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-mercury dark:border-pickled-bluewood rounded-lg px-3 py-2 bg-white dark:bg-mirage focus-within:border-premium-orange focus-within:ring-2 focus-within:ring-premium-orange/20 transition-all">
        <DatePicker
          className="w-full text-sm outline-none bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          selected={value}
          name={name}
          onChange={onChange}
          locale={lang}
          dateFormat="dd-MM-yyyy"
          minDate={min}
          placeholderText={placeholderText}
          todayButton="Today"
        />
      </div>
    </div>
  );
};
export default DateInput;
