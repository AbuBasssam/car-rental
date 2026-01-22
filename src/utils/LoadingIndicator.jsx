import logo from "../assets/Logo.svg";

const LoadingIndicator = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mercury dark:bg-mirage">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with Fade Animation */}
        <div className="relative">
          <img
            src={logo}
            alt="Rento Logo"
            className="h-32 w-auto animate-pulse"
            style={{
              animation: "fadeInOut 1.4s ease-in-out infinite",
            }}
            loading="eager"
          />
        </div>

        {/* Company Name */}

        <h2 className="text-2xl font-black text-premium-orange font-heading">
          Rento
        </h2>

        {/* Loading Dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full bg-premium-orange"
            style={{ animation: "bounce 1.2s ease-in-out infinite" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-premium-orange"
            style={{ animation: "bounce 1.2s ease-in-out 0.2s infinite" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-premium-orange"
            style={{ animation: "bounce 1.2s ease-in-out 0.4s infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        } `}</style>
    </div>
  );
};

export default LoadingIndicator;
