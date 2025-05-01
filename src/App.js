import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import BarberLogin from "./pages/BarberLogin";
import Admin from "./pages/admin"; // ✅ Add this import

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/barber-login" element={<BarberLogin />} />
        <Route path="/admin" element={<Admin />} /> {/* ✅ Add the Admin panel route */}
      </Routes>
    </div>
  );
};

export default App;
