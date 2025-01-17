import React from "react";
import Carousel from "../components/Carousel";
import Home_Services from "../components/Home_Services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import ScrollToTopButton from "../components/ScrollToTopButton"

const Home = () => {
  return (
    <main> 
      <Header />
      <Carousel />
<Home_Services />
<FeaturesSection/>
<Footer />
<ScrollToTopButton /> 
    </main>
  );
};

export default Home;
