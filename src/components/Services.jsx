// import React from 'react';
// // import { useHistory } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const Services = () => {

    
//   return (
//     <div className="container-fluid container-service py-5">
//       <div className="container py-5">
//         <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
//         <h1 className="display-6 mb-3 text-blue-500 font-extrabold">
//   Reliable & High-Quality Laboratory Service
// </h1>
//           <p className="mb-5">
//           At our state-of-the-art laboratory, we prioritize accuracy, efficiency, and customer satisfaction. Our team of experienced professionals ensures that every test is performed with the utmost care and precision. We offer a wide range of diagnostic services tailored to meet your healthcare needs, providing reliable results that you can trust. With cutting-edge technology and a commitment to excellence, we are here to support your health and wellness journey.
//           </p>
//         </div>
//         <div className="row g-4">
//         <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//                 <i className="bi bi-heart-pulse text-white"></i>
//               </div>
//               <h5 className="mb-3 text-center font-bold">Pathology Testing</h5>
//               <p className="mb-4  text-center text-justify">
//               A broad range of tests to diagnose diseases, evaluate organ function, and assess overall health by analyzing blood, urine, or tissue samples.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//                 <i className="bi bi-lungs text-white"></i>
//               </div>
//               <h5 className="mb-3 text-center font-bold">Microbiology Tests</h5>
//               <p className="mb-4  text-center text-justify">
//               These tests are used to detect and identify microorganisms such as bacteria, viruses, fungi, and parasites that may be causing infections in the body.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//                 <i className="bi bi-virus text-white"></i>
//               </div>
//               <h5 className="mb-3 text-center font-bold">Biochemistry Tests</h5>
//               <p className="mb-4  text-center text-justify">
//               Tests that measure chemical substances in blood or urine, helping to diagnose conditions like diabetes, liver disorders, and kidney diseases.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>

//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//       <i className="bi bi-capsule-pill text-white"></i>
//     </div>
//     <h5 className="mb-3 text-center font-bold">Histopathology Tests</h5>
//     <p className="mb-4  text-center text-justify">
//     A laboratory test that involves examining tissue samples under a microscope to identify abnormalities, such as cancer, infections, or inflammatory diseases.
//     </p>
//     <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//   </div>
// </div>

// <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//       <i className="bi bi-capsule-pill text-white"></i>
//     </div>
//               <h5 className="mb-3 text-center font-bold">Urine Tests</h5>
//               <p className="mb-4  text-center text-justify">
//               These tests analyze urine samples to detect a wide range of conditions, including urinary tract infections, kidney diseases, diabetes, and dehydration.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//                 <i className="bi bi-prescription2 text-white"></i>
//               </div>
//               <h5 className="mb-3 text-center font-bold">Blood Tests</h5>
//               <p className="mb-4  text-center text-justify">
//               Blood tests are used to assess overall health and diagnose a variety of conditions, including infections, anemia, cholesterol levels, and organ function.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//                 <i className="bi bi-clipboard2-pulse text-white"></i>
//               </div>
//               <h5 className="mb-3 text-center font-bold">Fever Tests</h5>
//               <p className="mb-4 text-center text-justify">
//               Tests that help identify the cause of a fever, such as infections, inflammation, or other medical conditions, by analyzing blood and other samples.
//               </p>
//               <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
//   <div className="service-item bg-blue-500 text-white p-4 rounded-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//     <div className="icon-box-primary mb-4 text-white text-5xl flex justify-center">
//       <i className="bi bi-file-medical"></i>
//     </div>
//     <h5 className="mb-3 text-center font-bold">Allergy Tests</h5>
//     <p className="mb-4  text-center text-justify">
//     These tests are used to identify allergens that may be causing allergic reactions, such as pollen, food, dust, or medications, through blood tests or skin prick tests.
//     </p>
//     <div className="flex justify-center">
//     <a className="btn btn-light px-3 text-blue-900" href={`/inquiry?testName=Pathology Testing`}>Inquiry
//   <i className="bi bi-chevron-double-right ms-1"></i></a>
//     </div>
//   </div>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;


import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const Services = () => {
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
    "Urine Tests" : "Analyzes a urine sample to detect infections, kidney issues, and metabolic disorders. Provides insights into overall health.",
    "Blood Tests" : "A small blood sample is taken to assess components like glucose, hemoglobin, etc. Also diagnoses different health conditions.",
    "Fever Tests" : "Detects the cause of unexplained fever through blood and other samples. Helps diagnose infections like typhoid, malaria, or dengue.",
    "Allergy Tests" : "Identifies allergens by analyzing blood or conducting skin tests. Helps pinpoint triggers for allergic reactions like pollen or food."
  };

  return (
    <div className="container-fluid container-service py-5">
      <div className="container py-5">
        <div className="text-center mx-auto" style={{ maxWidth: '600px' }}>
          <h1 className="display-6 mb-3 text-blue-500 font-extrabold">
            Reliable & High-Quality Laboratory Service
          </h1>
          <p className="mb-5">
          At our state-of-the-art laboratory, we prioritize accuracy, efficiency, and customer satisfaction. Our team of experienced professionals ensures that every test is performed with the utmost care and precision. We offer a wide range of diagnostic services tailored to meet your healthcare needs, providing reliable results that you can trust. With cutting-edge technology and a commitment to excellence, we are here to support your health and wellness journey.          </p>
        </div>
        <div className="row g-4">
          {/* Service Items */}
          {['Pathology Testing', 'Microbiology Tests', 'Biochemistry Tests', 'Histopathology Tests','Urine Tests','Blood Tests','Fever Tests','Allergy Tests'].map((service, index) => (
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

export default Services;

