import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <section className="py-10 px-6 bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/feature.jpg')" }}>
  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-10">
    {/* Introduction Section */}
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold text-white">Welcome to Labsky</h2>
      <p className="mt-4 text-white">
        Labsky is a cutting-edge laboratory website designed to make diagnostic services more accessible, efficient, and user-friendly. Combining modern technology with expert healthcare professionals, Labsky provides seamless online appointment booking, accurate test results, and comprehensive health packages. With a focus on innovation and trust, Labsky is your reliable partner for all your diagnostic needs.
      </p>
    </div>

    {/* Contact Details Section with Emojis */}
    <div className="w-full md:w-1/2">
      <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
      <p className="mt-4 flex items-center text-white">
        <span className="mr-2">📍</span> Malad, Mumbai
      </p>
      <p className="mt-2 flex items-center text-white">
        <span className="mr-2">📞</span> +012 345 67890
      </p>
      <p className="mt-2 flex items-center text-white">
        <span className="mr-2">✉️</span> info@example.com
      </p>

      {/* Social Media Icons */}
      <div className="mt-6 flex space-x-6">
        <a href="https://www.youtube.com/" className="text-2xl  no-underline" target="_blank" rel="noopener noreferrer">
        <span>
  <img 
    src="/youtuben.png" 
    alt="LinkedIn Icon" 
    width="30" 
    height="30" 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
</span>
        </a>
        <a href="https://twitter.com/" className="text-2xl  no-underline" target="_blank" rel="noopener noreferrer">
        <span>
  <img 
    src="/twittern.png" 
    alt="LinkedIn Icon" 
    width="30" 
    height="30" 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
</span>
        </a>
        <a href="https://www.facebook.com/" className="text-2xl  no-underline" target="_blank" rel="noopener noreferrer">
        <span>
  <img 
    src="/facebook.png" 
    alt="LinkedIn Icon" 
    width="30" 
    height="30" 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
</span>
        </a>
        <a href="https://www.linkedin.com/" className="text-2xl  no-underline" target="_blank" rel="noopener noreferrer">
        <span>
  <img 
    src="/linkedinn.png" 
    alt="LinkedIn Icon" 
    width="30" 
    height="30" 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
</span>

        </a>
      </div>
    </div>
  </div>
</section>
      <div className=" py-2 px-6 text-center">
        <p>&copy; 2024 Labsky. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
