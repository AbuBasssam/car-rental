import { useEffect } from "react";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import { defaultToastConfig } from "./config/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer {...defaultToastConfig} />
      <Outlet />
    </div>
  );
}

export default App;
