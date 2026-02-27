import { buttonStyles } from "../utils/styles.js";

const FullWidthButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`${buttonStyles.fullWidth} ${className}`} {...props}>
      <span className={buttonStyles.fullWidthInner}>{children}</span>
      <div className={buttonStyles.fullWidthHover} />
    </button>
  );
};
export default FullWidthButton;
