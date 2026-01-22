import PrimaryButton from "../../layouts/primaryButton.jsx";
import { ROUTES } from "../../routes/paths.js";
const AuthButtons = ({ isMobile = false, onLogin }) => {
  if (isMobile) {
    return (
      <>
        <a
          href={ROUTES.LOGIN}
          className="font-heading interactive-text transition"
          onClick={onLogin}
        >
          Login
        </a>
        <a
          href={ROUTES.SIGNUP}
          className="font-heading interactive-text transition"
        >
          Register
        </a>
      </>
    );
  }
  // Desktop view
  return (
    <>
      <a
        href={ROUTES.LOGIN}
        className="font-heading text-eerie-black interactive-text transition"
        onClick={onLogin}
      >
        Login
      </a>
      <PrimaryButton type="button" onClick={() => console.log("Hello")}>
        Register
      </PrimaryButton>
    </>
  );
};
export default AuthButtons;
