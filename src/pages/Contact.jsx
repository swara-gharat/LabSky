import React from "react";
import ScrollToTopButton from "../components/ScrollToTopButton"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";

const Contact = () => {
  return (
    <main> 
      <Header />
<ContactUs />
<div className="bg-white" style={{ height: "40px" }}></div>
<Footer /> 
<ScrollToTopButton /> 
    </main>
  );
};

export default Contact;
