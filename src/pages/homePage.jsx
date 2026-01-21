import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import MostRentedCars from "../components/mostRentedCars/MostRentedCars.jsx";
import WyChooseUs from "../components/whyChooseUs/WhyChooseUs.jsx";
import HowItWorks from "../components/howItWorks/HowItWorks.jsx";
import Footer from "../components/footer/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WyChooseUs />
      <MostRentedCars />
      <HowItWorks />
      <Footer />
    </>
  );
};
export default HomePage;
