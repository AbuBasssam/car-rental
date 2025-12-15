import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HomePage from "./components/homePage.jsx";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // run animation only once
    });
  }, []);
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
