import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home_Services = () => {
  const [selectedTest, setSelectedTest] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleInquiryClick = (testName) => {
    setSelectedTest(testName);
    setFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, test_name: selectedTest }),
      });
      if (response.ok) {
        alert('Inquiry submitted successfully!');
        setFormData({ name: '', email: '', query: '' });
        setFormVisible(false);
      } else {
        alert('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  const serviceDescriptions = {
    "Pathology Testing": "Analyzes tissues, cells, and fluids to diagnose diseases and conditions. It includes a wide range of diagnostic and monitoring tests.",
    "Microbiology Tests": "Identifies bacteria, viruses, and fungi in body samples like blood or sputum. It helps diagnose infections and guides treatment.",
    "Biochemistry Tests": "Examines chemical processes in the body through blood and urine samples. Commonly measures glucose, cholesterol, enzymes, etc.",
    "Histopathology Tests": "Microscopic examination of tissues obtained from biopsies or surgeries. It helps detect cancer and other tissue abnormalities.",
  };

  return (
    <div className="container-fluid container-service mt-4">
            <h2 className='text-center text-primary  text-2xl font-bold my-4'>Services</h2>
      <div className="container py-2">
      <div className="row g-4">
          {/* Service Items */}
          {['Pathology Testing', 'Microbiology Tests', 'Biochemistry Tests', 'Histopathology Tests'].map((service, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="service-item bg-blue-500 text-white p-4 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
                  <i className="bi bi-clipboard2-pulse"></i>
                </div>
                <h5 className="mb-3 text-center font-bold">{service}</h5>
                <p className="mb-4 text-center">{serviceDescriptions[service]}</p>
                <button
                  className="btn btn-light px-3 text-blue-900"
                  onClick={() => handleInquiryClick(service)}
                >
                  Inquiry <i className="bi bi-chevron-double-right ms-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        {formVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 className="text-center text-xl font-bold mb-4">Inquiry for {selectedTest}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
  <input
    type="tel"
    id="mobile"
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
    required
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>
        <div className="mb-4">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700">Query</label>
          <textarea
            id="query"
            name="query"
            rows="3"
            value={formData.query}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Submit Inquiry
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => setFormVisible(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      </div>
      <div className="flex items-center justify-center">
  <p 
        className="text-2xl font-bold text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition duration-200"
        onClick={() => navigate("/service")}
  >
    More Services
  </p>
</div>
<div className="flex items-center justify-center">
  <button
    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
    onClick={() => navigate("/login")}
  >
    Book Appointment
  </button>
</div>
    </div>
  );
};

export default Home_Services;