import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing customers from local storage
    const existingCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    // Check if username already exists
    const usernameExists = existingCustomers.some(customer => customer.username === formData.username);
    if (usernameExists) {
      alert("Username already exists. Please choose another one.");
      return;
    }

    // Add new customer to storage
    existingCustomers.push(formData);
    localStorage.setItem("customers", JSON.stringify(existingCustomers));

    setSubmitted(true);

    // Redirect to login page
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className="container">
      <h1>New Customer Registration</h1>
      {submitted ? (
        <p className="success-message">Registration successful! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit" className="btn">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
