import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import MostRentedCars from "../components/mostRentedCars/MostRentedCars.jsx";
import WyChooseUs from "../components/whyChooseUs/WhyChooseUs.jsx";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WyChooseUs />
      <MostRentedCars />
    </>
  );
};
export default HomePage;
