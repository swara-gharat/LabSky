import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  const isLoggedIn = localStorage.getItem("user_id") !== null;

  return (
    <header className="bg-primary text-white">
      <div>
  {/* Contact Details Bar */}
  <div className="bg-white text-gray-800 py-2 border-b">
  <div className="container mx-auto flex justify-between items-center text-sm">

    {/* Address Section */}
    <div className="flex flex-col items-center">
      <span className="flex items-center">
        <i className="fas fa-map-marker-alt mr-2"></i>
        📍 Address : Malad, Mumbai
      </span>
    </div>

    {/* Lab Timings */}
    <div>
      <span className="flex items-center">
        <i className="fas fa-clock mr-2"></i>
        🕒 Mon-Sun: 9am-5pm
      </span>
    </div>
  </div>
</div>

  {/* Main Navbar */}
  <nav className="bg-blue-600">
    <div className="container mx-auto flex justify-between items-center">
  <img src="/LabSky.png" alt="My Logo" className="w-40 h-20 object-contain"/>
      {/* <a href="/" className="text-white text-xl font-bold  no-underline">
        Lab<span className="text-gray-200">sky</span>
      </a> */}
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      <div className="flex space-x-6">
        <a href="/" className="text-white hover:text-gray-300 no-underline">Home</a>
        <Link to="/about" className="text-white hover:text-gray-300 no-underline">About</Link>  
        <Link to="/service" className="text-white hover:text-gray-300 no-underline">Services</Link>      
        <Link to="/contact" className="text-white hover:text-gray-300 no-underline">Contact</Link>
         
        {!isLoggedIn ? (
            <Link to="/login" className="text-white hover:text-gray-300 no-underline">Login</Link>
          ) : (
            <Link to="/user-dashboard" className="text-white hover:text-gray-300 no-underline">User Dashboard</Link>
          )}
      </div>
    </div>
     {/* Mobile Menu */}
     {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="flex flex-col space-y-4 p-4">
            <a href="/" className="text-white hover:text-gray-300 no-underline">
              Home
            </a>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 no-underline"
            >
              About
            </Link>
            <Link
              to="/service"
              className="text-white hover:text-gray-300 no-underline"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 no-underline"
            >
              Contact
            </Link>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-white hover:text-gray-300 no-underline"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/user-dashboard"
                className="text-white hover:text-gray-300 no-underline"
              >
                User Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
  </nav>
</div>
    </header>
  );
};

export default Header;
