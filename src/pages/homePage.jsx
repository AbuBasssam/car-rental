import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import MostRentedCars from "../components/mostRentedCars/MostRentedCars.jsx";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MostRentedCars />
    </>
  );
};
export default HomePage;
