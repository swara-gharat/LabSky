import React from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-secondary">
      <div
        id="carouselExample"
        className="relative w-full carousel slide"
        data-bs-ride="carousel"
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>

        {/* Carousel Slides */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div
            className="carousel-item active"
            style={{
              backgroundImage: "url('/carousel-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white bg-opacity-50 bg-black">
              <div>
                <h1 className="text-4xl font-bold">
                  Award Winning Laboratory Center
                </h1>
                <p className="mt-4">
                  Recognized for excellence in diagnostics, equipped with
                  cutting-edge technology.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
                                onClick={() => navigate("/about")}>
                  Explore More
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url('/carousel-2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white bg-opacity-50 bg-black">
              <div>
                <h1 className="text-4xl font-bold">
                  Expert Doctors & Lab Assistants
                </h1>
                <p className="mt-4">
                  Experienced professionals ensuring reliable diagnostics and
                  guidance.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
                                onClick={() => navigate("/about")}>
                  Explore More
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url('/carousel-3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white bg-opacity-50 bg-black">
              <div>
                <h1 className="text-4xl font-bold">
                  Location-Aware Appointment Booking
                </h1>
                <p className="mt-4">
                  Find the nearest lab location with integrated maps or book home visit.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
                                onClick={() => navigate("/contact")}>
                  Explore More
                </button>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url('/carousel-4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white bg-opacity-50 bg-black">
              <div>
                <h1 className="text-4xl font-bold">
                  Comprehensive Digital Report Access
                </h1>
                <p className="mt-4">
                  View, download, and share test reports online with ease.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
                onClick={() => navigate("/login")}
                >
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
