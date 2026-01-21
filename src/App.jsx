import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
