import React, { useEffect } from "react";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import { initCsrfToken } from "./services/authService";
import { defaultToastConfig } from "./config/toastConfig";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    const initializeSecurity = async () => await initCsrfToken();

    initializeSecurity();
  }, []);

  return (
    <div className="App">
      <ToastContainer {...defaultToastConfig} />

      <Outlet />
    </div>
  );
}

export default App;
