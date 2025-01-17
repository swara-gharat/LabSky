import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const InquiryForm = () => {
  const [testName, setTestName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setTestName(queryParams.get('testName') || '');
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inquiryData = {
      testName,
      name,
      email,
      query
    };

    // Send inquiry data to the backend
    try {
      const response = await fetch('http://localhost:5000/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (response.ok) {
        alert('Inquiry submitted successfully');
        history.push('/');
      } else {
        alert('Error submitting inquiry');
      }
    } catch (error) {
      alert('Error submitting inquiry');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Inquiry Form</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="testName" className="form-label">Test Name</label>
          <input
            type="text"
            className="form-control"
            id="testName"
            value={testName}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="query" className="form-label">Your Query</label>
          <textarea
            className="form-control"
            id="query"
            rows="3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Inquiry</button>
      </form>
    </div>
  );
};

export default InquiryForm;
