import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored customers
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Find the customer with matching credentials
    const validUser = customers.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", credentials.username); // Save logged-in user
      navigate("/services"); // Redirect to Services page
    } else {
      setError("Invalid username or password. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Customer Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
