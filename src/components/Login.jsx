import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // if (data.role === "admin") {
  //   localStorage.setItem("isAdminLoggedIn", true);
  // }

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      navigate("/user-dashboard"); // Redirect to user dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Send login request
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, user_type }),
    });
  
    if (response.ok) {
      const data = await response.json(); // Parse the response body
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("user_id", data.user_id); // Store userId in localStorage
  
      alert("Login successful");
  
      // Navigate based on the role
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };  

  return (
    <div>
            <div className="flex items-center justify-center mt-3">
  <p className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200">
Please login before booking appointment!  </p>
</div>
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3" style={{ position: "relative" }}>
  <label htmlFor="password">Password</label>
  <input
    type={showPassword ? "text" : "password"} // Toggle between text and password
    id="password"
    className="form-control"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
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
          <div className="form-group mb-3">
            <label htmlFor="userType">I am a:</label>
            <select
              id="userType"
              className="form-control"
              value={user_type}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p className="mt-3 text-center">
            New User? <a href="/register">Register Here</a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
