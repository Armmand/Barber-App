import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles.css";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
      const fetchedAppointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(fetchedAppointments);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteDoc(doc(db, "appointments", id));
        alert("Appointment deleted!");
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEdit = async (id, currentDate, currentTime) => {
    const newDate = prompt("Enter new date (e.g., May 5, 2025):", currentDate);
    const newTime = prompt("Enter new time (e.g., 2:00 PM):", currentTime);

    if (newDate && newTime) {
      try {
        await updateDoc(doc(db, "appointments", id), {
          date: newDate,
          time: newTime,
        });
        alert("Appointment updated!");
      } catch (error) {
        console.error("Error updating:", error);
      }
    }
  };

  // Convert appointments for FullCalendar
  const calendarEvents = appointments.map((appt) => ({
    title: `${appt.service} - ${appt.customerName || "N/A"} (${appt.time})`,
    date: appt.date,
  }));

  return (
    <div className="container">
      <h2>Barber Admin Panel</h2>

      {/* Full Calendar View */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="auto"
        />
      </div>

      {/* Card Layout View */}
      <div className="card-container">
        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <h3>{appt.customerName || "N/A"}</h3>
              <p><strong>Service:</strong> {appt.service || "N/A"}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <div className="card-actions">
                <button
                  className="btn small-btn"
                  onClick={() => handleEdit(appt.id, appt.date, appt.time)}
                >
                  Edit
                </button>
                <button
                  className="btn small-btn delete-btn"
                  onClick={() => handleDelete(appt.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

