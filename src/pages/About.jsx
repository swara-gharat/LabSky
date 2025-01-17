import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutInfo from "../components/AboutInfo";
import ScrollToTopButton from "../components/ScrollToTopButton"


const About = () => {
  return (
    <main> 
      <Header />
      <AboutInfo />
<div className="bg-white" style={{ height: "40px" }}></div>
<Footer /> 
<ScrollToTopButton /> 
    </main>
  );
};

export default About;
