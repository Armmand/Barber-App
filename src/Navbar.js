import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const barberLoggedIn = localStorage.getItem("barberLoggedIn");

  useEffect(() => {
    if (!loggedInUser && !barberLoggedIn && !["/", "/register", "/signin", "/barber-login"].includes(window.location.pathname)) {
      navigate("/");
    }
  }, [loggedInUser, barberLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("barberLoggedIn");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={menuOpen ? "menu active" : "menu"}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        {loggedInUser && (
          <>
            <li>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            </li>
          </>
        )}
        {barberLoggedIn && (
          <li>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
          </li>
        )}
        {loggedInUser || barberLoggedIn ? (
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register" onClick={() => setMenuOpen(false)}>New Customer</Link>
            </li>
            <li>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
            </li>
            <li>
              <Link to="/barber-login" onClick={() => setMenuOpen(false)}>Barber Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;