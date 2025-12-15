import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className="header-spacing flex items-center justify-center  gap-2 sm:gap-3">
      <img
        src={logo}
        alt="Rento Logo"
        className="h-auto w-28 md:w-32 lg:w-36 object-contain"
      />

      <h1 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-premium-orange">
        Rento
      </h1>
    </div>
  );
};
export default Logo;
