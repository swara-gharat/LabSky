import React from "react";
import "animate.css"; // Import for animations like fadeIn
import CountUp from 'react-countup';

const AboutInfo = () => {
  return (
    <>
      <section id="about" className="bg-light py-10">
        <div className="container mx-auto">
          <div className="row g-5">
            {/* Left Section with Images */}
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="row g-0">
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src="/about-1.jpg"
                    alt="Lab Image 1"
                  />
                </div>
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src="/about-2.jpg"
                    alt="Lab Image 2"
                  />
                </div>
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src="/about-3.jpg"
                    alt="Lab Image 3"
                  />
                </div>
                <div className="col-6">
                  <div className="bg-primary w-100 h-100 mt-n5 ms-n5 d-flex flex-column align-items-center justify-content-center">
                    {/* <div className="icon-box-light">
                      <i className="bi bi-award text-dark w-20 h-20"></i>
                    </div> */}
                    <h1 className="text-4xl font-bold text-white">
                      <CountUp start={0} end={25} duration={2} />
                    </h1>
                    <small className="fs-5 text-white">Years Experience</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section with Text and Stats */}
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-6 mb-4">
                Trusted Lab Experts and Latest Lab Technologies
              </h1>
              <p className="mb-4">
                Our team of trusted lab experts combines years of experience with
                a commitment to precision, ensuring accurate diagnostics. Equipped
                with state-of-the-art laboratory technologies, we deliver fast,
                reliable results while adhering to the highest industry standards
                for quality and innovation.
              </p>
              <div className="relative flex justify-center items-center py-20">
                {/* Container for overlapping circles */}
                <div className="relative flex justify-center items-center">
                  {/* Circle 1 - Blue, Smaller */}
                  <div
                    className="absolute bg-blue-600 text-white w-48 h-48 flex flex-col justify-center items-center rounded-full"
                    style={{ left: "10px", top: "-90px", zIndex: 3 }}
                  >
                    <p className="mb-0 text-lg font-semibold">Complete Cases</p>
                    <h1 className="text-4xl font-bold">
                      <CountUp start={0} end={9999} duration={2} />
                    </h1>
                  </div>
                  {/* Circle 2 - Blue, Medium */}
                  <div
                    className="absolute bg-gray-500 text-white w-48 h-48 flex flex-col justify-center items-center rounded-full"
                    style={{ left: "-200px", zIndex: 2 }}
                  >
                    <p className="mb-0 text-lg font-semibold">Awards</p>
                    <h1 className="text-4xl font-bold">
                      <CountUp start={0} end={25} duration={2} />
                    </h1>
                  </div>
                  {/* Circle 3 - Blue, Larger */}
                  <div
                    className="absolute bg-dark text-white w-48 h-48 flex flex-col justify-center items-center rounded-full"
                    style={{ left: "-100px", top: "50px", zIndex: 1 }}
                  >
                    <p className="mb-0 text-lg font-semibold">Happy Clients</p>
                    <h1 className="text-4xl font-bold">
                      <CountUp start={0} end={9999} duration={2} />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="container-fluid container-team py-5">
        <div className="container pb-5">
          <div className="row g-5 align-items-center mb-5">
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <img
                className="img-fluid w-100"
                src="/team-1.jpg"
                alt="Dr. John Martin"
              />
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-6 mb-3">Dr. John Martin</h1>
              <p className="mb-1">CEO & Founder</p>
              <p className="mb-5">Labsky, Mumbai</p>
              <h3 className="mb-3">Biography</h3>
              <p className="mb-4">
              Dr. John Martin is a seasoned healthcare leader and the CEO & Founder of Labsky, Mumbai, with over 20 years of experience in the medical and laboratory field. With a strong background in Medical Science, Dr. Martin is committed to transforming healthcare by providing high-quality, reliable diagnostic services. Under his leadership, Labsky has become a trusted name in the industry, known for its focus on innovation, precision, and patient care. His vision continues to drive the company’s growth and commitment to excellence in laboratory diagnostics.
              </p>
              <div className="d-flex">
              <a className="btn btn-lg-square me-2" href="https://www.facebook.com/">
                <img src="/facebook.png" alt="Facebook" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
                </a>
                <a className="btn btn-lg-square me-2" href="https://x.com/">
                <img src="/twitter.png" alt="Facebook" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
                </a>
                <a className="btn btn-lg-square me-2" href="https://www.youtube.com/">
                <img src="/youtube.png" alt="Facebook" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
                </a>
                <a className="btn btn-lg-square me-2" href="https://www.instagram.com/">
                <img src="/instagram.png" alt="Facebook" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100 transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:shadow-lg" src="/team-2.jpg" alt="Alex Robin" />
                  <div className="team-social">
                    <a className="btn btn-square mx-1" href="https://www.facebook.com/">
                    <img src="/facebook.png" alt="Facebook" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://x.com/">
                    <img src="/twitter.png" alt="Twitter" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.youtube.com/">
                    <img src="/youtube.png" alt="YouTube" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.instagram.com/">
                    <img src="/instagram.png" alt="Instagram" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">Alex Robin</h5>
                  <span>Lab Assistant</span>
                </div>
              </div>
            </div>

            {/* Add other team members in similar fashion */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100 transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:shadow-lg" src="/team-3.jpg" alt="Andrew Bon" />
                  <div className="team-social">
                    <a className="btn btn-square mx-1" href="https://www.facebook.com/">
                    <img src="/facebook.png" alt="Facebook" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://x.com/">
                    <img src="/twitter.png" alt="Twitter" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.youtube.com/">
                    <img src="/youtube.png" alt="YouTube" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.instagram.com/">
                    <img src="/instagram.png" alt="Instagram" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">Andrew Bon</h5>
                  <span>Lab Assistant</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100 transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:shadow-lg" src="/team-4.jpg" alt="Andrew Bon" />
                  <div className="team-social">
                    <a className="btn btn-square mx-1" href="https://www.facebook.com/">
                    <img src="/facebook.png" alt="Facebook" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://x.com/">
                    <img src="/twitter.png" alt="Twitter" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.youtube.com/">
                    <img src="/youtube.png" alt="YouTube" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.instagram.com/">
                    <img src="/instagram.png" alt="Instagram" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">Clarabelle Samber</h5>
                  <span>Lab Assistant</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100 transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:shadow-lg" src="/team-5.jpg" alt="Andrew Bon" />
                  <div className="team-social">
                    <a className="btn btn-square mx-1" href="https://www.facebook.com/">
                    <img src="/facebook.png" alt="Facebook" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://x.com/">
                    <img src="/twitter.png" alt="Twitter" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.youtube.com/">
                    <img src="/youtube.png" alt="YouTube" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a className="btn btn-square mx-1" href="https://www.instagram.com/">
                    <img src="/instagram.png" alt="Instagram" className="w-7 h-7 transition-transform duration-300 hover:scale-110" />
                    </a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">Martin Tompson</h5>
                  <span>Lab Assistant</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
