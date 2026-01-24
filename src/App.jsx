import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import { initCsrfToken } from "./services/authService";

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
    <>
      <Outlet />
    </>
  );
}

export default App;
