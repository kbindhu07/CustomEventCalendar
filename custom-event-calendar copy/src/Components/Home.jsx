import React from "react";
import { Link } from "react-router-dom";
import CenteredLayout from "./CenteredLayout";
import calendarImage from "./calendar.jpg"; // Adjust path if your image is in Components folder

function Home() {
  return (
    <CenteredLayout>
      <div className="bg-white rounded shadow p-5 text-center">
        <h1 className="mb-4 fw-bold" style={{ color: "#1976d2" }}>
          Welcome to Event Calendar
        </h1>
        <img
          src={calendarImage}
          alt="Calendar"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <p style={{ fontWeight: 500, marginBottom: "30px" }}>
          <b>Event Calendar</b> helps you organize your life and work with ease. Quickly add, view, and manage events—never miss an important date again!
        </p>
        <Link to="/calendar" className="btn btn-primary">
          Go to My Calendar
        </Link>
      </div>
    </CenteredLayout>
  );
}

export default Home;
