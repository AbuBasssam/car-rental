const HeroIntro = () => {
  return (
    <>
      <h2
        className="text-premium-orange font-semibold text-sm tracking-widest uppercase mt-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Find Your Perfect Ride
      </h2>
      <h3
        className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Rent The Best Quality{" "}
        <span className="text-premium-orange">Car's </span>
        With Us
      </h3>
      <p
        className="text-gray-600 dark:text-gray-400 max-w-xl"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        We provide top-notch car rental services with affordable pricing and
        flexible options. Whether you're going on a trip or need a ride in town
        – we got you covered.
      </p>
    </>
  );
};

export default HeroIntro;
