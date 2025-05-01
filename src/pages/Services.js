import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Services = () => {
  const navigate = useNavigate();

  const handleBook = (serviceName, price) => {
    localStorage.setItem("selectedService", serviceName);
    localStorage.setItem("selectedPrice", price);
    navigate("/appointment");
  };

  const services = [
    { name: "Shear Styling", price: 45 },
    { name: "Fades / Tapers / Blends", price: 30 },
    { name: "Steam Facial", price: 20 },
    { name: "Buzz Cut w/ Shape-Up", price: 15 },
    { name: "Shampoo & Conditioning", price: 20 },
    { name: "Head & Face Razor Shave (Steam Towel)", price: 30 },
    { name: "Face Shave (Steam Towel)", price: 15 },
    { name: "Head Shave (Steam Towel)", price: 20 },
    { name: "Eyebrow Arching (Razor)", price: 10 },
    { name: "Spray Enhancement", price: 10 },
    { name: "Beard Shape-Up & Trim", price: 8 },
  ];

  return (
    <div className="container">
      <h1>Our Services</h1>
      <h2>YOU LOOK GREAT, NOW MAKE IT PERFECT</h2>

      <div className="service-card-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.name}</h3>
            <p>${service.price}</p>
            <button className="btn" onClick={() => handleBook(service.name, service.price)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      <div className="booking-notes">
        <h3>📌 Booking Policy</h3>
        <p>• 50% Non-Refundable Deposit for Appointments</p>
        <p>• 10-Minute Grace Period After Scheduled Appointment Time</p>
        <p>• Deposit Transferable If Rescheduled 30 min Prior To Appointment Time</p>
      </div>
    </div>
  );
};

export default Services;

