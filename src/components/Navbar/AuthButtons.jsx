import PrimaryButton from "../../layouts/primaryButton.jsx";
const AuthButtons = ({ isMobile = false, onLogin }) => {
  if (isMobile) {
    return (
      <>
        <a
          href="#login"
          className="font-heading interactive-text transition"
          onClick={onLogin}
        >
          Login
        </a>
        <a
          href="#register"
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
        href="#login"
        className="font-heading text-eerie-black interactive-text transition"
        onClick={onLogin}
      >
        Login
      </a>
      <PrimaryButton title="Register" onClick={() => console.log("Hello")} />
    </>
  );
};
export default AuthButtons;
