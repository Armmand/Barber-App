import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Get stored customers
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    // Find matching user
    const user = storedCustomers.find(
      (customer) => customer.username === credentials.username && customer.password === credentials.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      navigate("/services"); // Redirect to services page
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Customer Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  );
};

export default Login;