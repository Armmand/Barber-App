import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Logo only on Home screen */}
      <img 
        src={logo} 
        alt="Logo" 
        className="home-logo" 
      />

      <div className="button-group">
        <button className="btn" onClick={() => navigate("/register")}>New Customer</button>
        <button className="btn" onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    </div>
  );
};

export default Home;