import { buttonStyles } from "../utils/styles.js";

const DangerButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`${buttonStyles.danger} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default DangerButton;
