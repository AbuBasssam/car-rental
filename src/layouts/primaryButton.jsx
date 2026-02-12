import { buttonStyles } from "../utils/styles.js";

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`${buttonStyles.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default PrimaryButton;
