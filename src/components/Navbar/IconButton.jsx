const IconButton = ({ onClick, children }) => {
  const buttonClass =
    "p-2 rounded-lg bg-authentic-white dark:bg-big-stone hover:bg-soft-gray dark:hover:bg-fiord flex items-center justify-center transition";
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
export default IconButton;
