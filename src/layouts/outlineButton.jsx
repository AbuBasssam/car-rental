const OutlineButton = ({ title }) => {
  return (
    <button
      className="
        relative overflow-hidden
        inline-flex items-center justify-center
        px-7 py-3
        rounded-lg
        text-base font-semibold
        border-2 border-gray-900
        dark:border-gray-300
        text-gray-900 dark:text-mercury
        transition-all duration-200
        group
      "
    >
      {/* Hover Fill Effect */}
      <span
        className="
          absolute right-0 bottom-0
          w-full h-0
          bg-gray-900 dark:bg-mercury
          transition-all duration-200 ease-out
          group-hover:h-full
        "
      />

      {/* Button Text */}
      <span className="relative group-hover:text-white  dark:group-hover:text-gray-900 transition-colors duration-200">
        {title}
      </span>
    </button>
  );
};

export default OutlineButton;
