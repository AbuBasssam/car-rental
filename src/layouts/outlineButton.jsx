import { buttonStyles } from "../utils/styles.js";

const OutlineButton = ({ title }) => {
  return (
    <button className={buttonStyles.outline.container}>
      {/* Hover Fill Effect */}
      <span className={buttonStyles.outline.hoverFill} />

      {/* Button Text */}
      <span className={buttonStyles.outline.text}>{title}</span>
    </button>
  );
};

export default OutlineButton;
