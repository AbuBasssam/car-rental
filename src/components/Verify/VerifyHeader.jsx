import { verifyStyles } from "../../utils/styles";
import { HiOutlineMail } from "react-icons/hi";

/**
 * Header Component
 *
 * @param {Object} props
 * @param {string} props.email - User's email address
 * @param {Object} props.translations - Translation object
 */
function VerifyHeader({ email, translations }) {
  return (
    <header className={verifyStyles.header.container}>
      <figure className={verifyStyles.header.iconWrapper} aria-hidden="true">
        <HiOutlineMail className={verifyStyles.header.icon} />
      </figure>

      <h1 className={verifyStyles.header.title}>{translations.title}</h1>

      <p className={verifyStyles.header.description}>
        {translations.description}
        <br />
        <strong className={verifyStyles.header.email}>{email}</strong>
      </p>
    </header>
  );
}
export default VerifyHeader;
