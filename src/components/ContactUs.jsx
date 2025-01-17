import React from "react";
import { useState } from "react";

const ContactUs = () => {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error || "Failed to send message"}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred. Please try again later.");
  }
};

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div
          className="text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="display-6 mb-3 text-primary">Have Any Query? Feel Free To Contact Us</h1>
          <p className="mb-5">
          Our team is here to assist you with any questions or concerns you may have. Whether it's about our services, appointments, or anything else, don't hesitate to reach out. We're committed to providing the best support and ensuring your experience with us is seamless and stress-free.
          </p>
        </div>
        <div className="row contact-info position-relative g-0 mb-5">
          <div className="col-lg-6">
          <div className="d-flex justify-content-lg-center bg-primary p-4">
  <div className="icon-box-light flex-shrink-0">
    <i className="bi bi-phone text-white"></i>
  </div>
  <div className="ms-3">
    <h5 className="text-white">Call Us</h5>
    <h2 className="text-white mb-0">+012 345 67890</h2>
  </div>
</div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-content-lg-center bg-primary p-4">
              <div className="icon-box-light flex-shrink-0">
                <i className="bi bi-envelope text-white"></i>
              </div>
              <div className="ms-3">
                <h5 className="text-white">Mail Us</h5>
                <h2 className="text-white mb-0">info@example.com</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
<p className="mb-4">
    Please provide your details, and we'll get back to you as soon as possible.  
            </p>
            <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
            <label htmlFor="name">Your Name</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
            <label htmlFor="email">Your Email</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Your Contact"
            />
            <label htmlFor="email">Your Contact</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
            <label htmlFor="subject">Subject</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <textarea
              className="form-control"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave a message here"
              style={{ height: "200px" }}
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary py-3 px-5" type="submit">
            Send Message
          </button>
        </div>
      </div>
    </form>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
    <iframe
        className="w-100 h-100"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.844118410849!2d72.85007421471602!3d19.192441987961097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8ffdc8b57b1%3A0x229a1f9a823a52d0!2sMalad%2C%20Mumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sbd!4v1688904051024!5m2!1sen!2sbd"
        frameBorder="0"
        style={{ minHeight: "300px", border: "0" }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
    ></iframe>
</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
