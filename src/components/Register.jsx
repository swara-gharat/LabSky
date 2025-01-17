import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Validate name field
    if (id === "name") {
      setErrors({
        ...errors,
        name: validateName(value) ? "" : "Name should contain only alphabets.",
      });
    }

    // Validate email field
    if (id === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Please enter a valid email address.",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateName(formData.name)) {
      alert("Enter a valid name. Name should contain only alphabets.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (!formData.password) {
      alert("Password cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
  
        // Automatically log in the user
        const loginResponse = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
  
        if (loginResponse.ok) {
          const data = await loginResponse.json(); // Parse the response body
          localStorage.setItem("token", data.token); // Store token in localStorage
          localStorage.setItem("user_id", data.user_id); // Store userId in localStorage
          alert("Login successful!");
  
          // Navigate to the dashboard
          navigate("/user-dashboard");
        } else {
          alert("Invalid credentials. Please login manually.");
          navigate("/login"); // Redirect to the login page in case of failure
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3" style={{ position: "relative" }}>
  <label htmlFor="password">Password</label>
  <input
    type={showPassword ? "text" : "password"} // Toggle between text and password
    id="password"
    className="form-control"
    value={formData.password}
              onChange={handleInputChange}
              required
    style={{ paddingRight: "2.5rem" }} // Add padding for the icon
  />
  <span
    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
    style={{
      position: "absolute",
      right: "10px",
      top: "70%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
  >
    {showPassword ? "🐵" : "🙈"} 
  </span>
</div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </form>
      </div>
    </div>

  );
}

export default Register;
