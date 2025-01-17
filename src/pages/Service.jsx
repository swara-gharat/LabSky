import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Services from "../components/Services";
import AppointmentSection from "../components/AppointmentSection";
import ScrollToTopButton from "../components/ScrollToTopButton"


const Service = () => {
  return (
    <main> 
      <Header />
<Services/>
{/* <AppointmentSection /> */}
<Footer /> 
<ScrollToTopButton /> 
    </main>
  );
};

export default Service;
