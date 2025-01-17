import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton"
import InquiryForm from "../components/InquiryForm";

const Inquiry = () => {
  return (
    <main> 
      <Header />
      <InquiryForm />
<div className="bg-white" style={{ height: "40px" }}></div>
<Footer /> 
<ScrollToTopButton /> 
    </main>
  );
};

export default Inquiry;
