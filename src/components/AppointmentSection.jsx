import React from 'react';
import { useState } from "react";

const AppointmentSection = () => {

    const [visitType, setVisitType] = useState("lab");
  
    const handleVisitTypeChange = (event) => {
      setVisitType(event.target.value);
    };

    return (
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="display-6 mb-4 text-blue-600 font-bold">
                We Ensure You Will Always Get The Best Result
              </h1>
              <p>
              Our team of skilled professionals is dedicated to providing top-notch laboratory services. We prioritize accuracy, efficiency, and patient satisfaction in every test we perform
              </p>
              <p className="mb-4">
              We understand the importance of timely results. That's why we use the latest technology and adhere to the highest standards to ensure you receive the best possible care and reliable test outcomes.
              </p>
              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.3s">
                <div className="icon-box-primary">
                  <i className="bi bi-geo-alt text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5 className="font-bold">Office Address</h5>
                  <span>Malad, Mumbai</span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.4s">
                <div className="icon-box-primary">
                  <i className="bi bi-clock text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5 className="font-bold">Office Time</h5>
                  <span>Mon-Sun 9am-5pm</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <h2 className="mb-4">Online Appointment</h2>
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="mail"
                      placeholder="Your Email"
                    />
                    <label htmlFor="mail">Your Email</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Your Mobile"
                    />
                    <label htmlFor="mobile">Your Mobile</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <select className="form-select" id="service">
                      <option selected>Pathology Testing</option>
                      <option value="">Microbiology Tests</option>
                      <option value="">Biochemistry Tests</option>
                      <option value="">Histopathology Tests</option>
                      <option value="">Urine Tests</option>
                      <option value="">Blood Tests</option>
                      <option value="">Fever Tests</option>
                      <option value="">Allergy Tests</option>
                    </select>
                    <label htmlFor="service">Choose A Service</label>
                  </div>
                </div>
                <div className="col-sm-6">
  <div className="form-floating">
    <select className="form-select" id="visitType" onChange={handleVisitTypeChange}>
      <option value="lab">Visit Lab</option>
      <option value="home">Home Visit</option>
    </select>
    <label htmlFor="visitType">Select Visit Type</label>
  </div>
</div>

{visitType === "home" && (
  <div className="col-12">
    <div className="form-floating">
      <input
        type="text"
        className="form-control"
        id="homeAddress"
        placeholder="Your Address"
      />
      <label htmlFor="homeAddress">Your Address</label>
    </div>
  </div>
)}
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a message here"
                      id="message"
                      style={{ height: "130px" }}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Submit Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AppointmentSection;
  