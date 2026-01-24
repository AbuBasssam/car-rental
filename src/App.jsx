import { useEffect, useRef } from "react";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import { initCsrfToken } from "./services/authService";
import { defaultToastConfig } from "./config/toastConfig";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isInitialized = useRef(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (!isInitialized.current) {
      const initializeSecurity = async () => {
        await initCsrfToken();
        isInitialized.current = true;
      };
      initializeSecurity();
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer {...defaultToastConfig} />

      <Outlet />
    </div>
  );
}

export default App;
