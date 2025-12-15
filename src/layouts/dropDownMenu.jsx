const DropdownMenu = ({ isOpen, items, align = "right" }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        absolute ${align}-0 mt-2 w-48 rounded-lg py-2 z-50
        bg-authentic-white 
        dark:bg-pickled-bluewood
        border border-soft-gray
         dark:border-charcoal
        shadow-lg animate-fadeIn
      `}
    >
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={item.onClick}
            className={`
              w-full px-4 py-3 flex items-center gap-3 text-left transition
              hover:bg-seashell dark:hover:bg-charcoal
              group dark:hover:bg-red-950/40"
                                           `}
          >
            {item.icon && (
              <item.icon
                size={18}
                className={`
                  text-deep-gray dark:text-slate-400
                  ${
                    item.variant === "danger"
                      ? "group-hover:text-red-600"
                      : "group-hover:text-premium-orange"
                  }
                `}
              />
            )}

            <span
              className={`
                text-sm font-medium
                text-eerie-black dark:text-white
                ${
                  item.variant === "danger"
                    ? "group-hover:text-red-600"
                    : "group-hover:text-premium-orange"
                }
              `}
            >
              {item.label}
            </span>
          </button>

          {item.divider && (
            <div className="h-px bg-soft-gray dark:bg-charcoal my-1" />
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
