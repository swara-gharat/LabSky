import React, { useState } from "react";
import "animate.css";
import AOS from "aos";

const FeaturesSection = () => {
  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Function to open modal and set the video source
  const openModal = (url) => {
    const embedUrl = url.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/");
    setVideoUrl(embedUrl);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  return (
<section className="container-fluid my-3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/featuress.avif")' }}>
<div className="container">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section with Text */}
          <div className="lg:w-1/2 pt-5">
            <div className="bg-white p-5 mt-5">
              <h1 className="text-3xl font-semibold mb-4">The Best Medical Test & Laboratory Solution</h1>
              <p className="mb-4 text-gray-700">
At Labsky, we offer the best in medical testing and laboratory solutions, combining advanced technology with expert care to deliver accurate, reliable results. Our state-of-the-art facilities and dedicated team ensure that you receive top-quality diagnostics for better health outcomes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 mb-5">
                <div className="flex flex-col items-center">
                  {/* <div className="bg-primary text-white p-4 rounded-full mb-4"> */}
                    {/* Replace with your image icon */}
                    <img src="/bluedoctor.jpg" alt="Experience Doctors" className="w-20 h-20 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
                  {/* </div> */}
                  <h5 className="text-xl mb-3">Experience Doctors</h5>
                  <span className="text-gray-600">
                  Our experienced doctors provide top-notch care and accurate diagnoses to ensure your health and well-being.</span>
                </div>
                <div className="flex flex-col items-center">
                  {/* <div className="bg-primary text-white p-4 rounded-full mb-4"> */}
                    {/* Replace with your image icon */}
                    <img src="/bluemicroscope.jpg" alt="Advanced Microscopy" className="w-20 h-20 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
                  {/* </div> */}
                  <h5 className="text-xl mb-3">Advanced Microscopy</h5>
                  <span className="text-gray-600">
                  We use advanced microscopy techniques to provide precise and detailed analysis for accurate test results.</span>
                </div>
              </div>
              <a href="/about" className="bg-blue-500 text-white py-3 px-5 rounded-md hover:bg-blue-600 transition duration-300 no-underline">Explore More</a>
            </div>
          </div>

          {/* Right Section with Video & Progress */}
          <div className="lg:w-1/2 mt-5 lg:mt-0">
            {/* <div className="flex flex-col h-full items-center justify-end"> */}
              {/* Play Button */}
              <div className="w-full flex justify-center items-center mb-4 h-[300px]">
  <button
    type="button"
    className="relative w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-white"
    onClick={() => openModal("https://youtu.be/SdeFRsByGMw")}  >
    <span className="absolute inset-0 flex items-center justify-center">
      <div className="justify-center w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-white transform rotate-90" />
    </span>
  </button>
</div>
{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative max-w-3xl w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-xl"
            >
              &times;
            </button>

            {/* YouTube Video */}
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src={videoUrl}
                title="YouTube video"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
              <div className="bg-blue-500 p-5 w-200 bottom-0">
                {/* Progress Bars */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-white">
                    <span>Sample Preparation</span>
                    <span>90%</span>
                  </div>
                  <div className="relative w-[90%] bg-gray-300 rounded-full h-2">
                    <div className="absolute bottom-0 left-0 h-full bg-gray-800" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="mb-4">
  <div className="flex justify-between mb-2 text-white">
    <span>Result Accuracy</span>
    <span>95%</span>
  </div>
  <div className="relative w-[90%] bg-gray-300 rounded-full h-2">
    <div
      className="absolute top-0 left-0 h-full bg-gray-800 transition-all duration-1000 ease-out"
      style={{ width: "95%" }}
    />
  </div>
</div>
<div>
  <div className="flex justify-between mb-2 text-white">
    <span>Lab Equipment</span>
    <span>90%</span>
  </div>
  <div className="relative w-[90%] bg-gray-300 rounded-full h-2">
    <div
      className="absolute top-0 left-0 h-full bg-gray-800 transition-all duration-1000 ease-out"
      style={{ width: "90%" }}
    />
  </div>
</div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg max-w-3xl w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Youtube Video</h3>
              <button className="text-xl font-bold" onClick={closeModal}>×</button>
            </div>
            <div className="mt-4">
              <div className="relative pb-9/16">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoSrc}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Video"
                />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
};

export default FeaturesSection;
