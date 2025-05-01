import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarberLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded barber credentials (replace with backend validation later)
    if (credentials.username === "barber" && credentials.password === "barber123") {
      localStorage.setItem("barberLoggedIn", "true"); // Store barber login
      navigate("/admin"); // Redirect to Admin Panel
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Barber Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default BarberLogin;