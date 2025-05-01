import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles.css";

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceName, servicePrice } = location.state || {};

  const timeSlots = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    const appointment = {
      date: selectedDate.toDateString(),
      time: selectedTime,
      service: serviceName || "General Service",
      price: servicePrice || 20,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "appointments"), appointment);
      setAppointmentBooked(true);
      setTimeout(() => navigate("/services"), 2000);
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Error booking appointment. Please try again.");
    }
  };

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      await handleBooking();
    } finally {
      setIsPaying(false);
    }
  };

  const depositAmount = servicePrice ? (servicePrice * 0.5).toFixed(2) : "10.00";

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>

      <h3>Select a Date:</h3>
      <div className="calendar-wrapper">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      {selectedDate && (
        <>
          <h3>Select a Time:</h3>
          <div className="time-card-container">
            {timeSlots.map((time, i) => (
              <div
                key={i}
                className={`time-card ${selectedTime === time ? "selected-card" : ""}`}
                onClick={() => setSelectedTime(time)}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTime && !appointmentBooked && (
        <div className="payment-section">
          <h3>Confirm Appointment</h3>
          <p>{`Date: ${selectedDate.toDateString()} | Time: ${selectedTime}`}</p>
          <p className="payment-info">
            A <strong>50% deposit</strong> of <strong>${depositAmount}</strong> is required to confirm your appointment.
          </p>
          <button
            className="btn"
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? "Processing..." : `Pay $${depositAmount} & Book`}
          </button>
        </div>
      )}

      {appointmentBooked && (
        <div className="success-message">
          <h3>Appointment booked successfully!</h3>
          <p>See you soon!</p>
        </div>
      )}
    </div>
  );
};

export default Appointment;


