import React from "react";
import { Link } from "react-router-dom";
import CenteredLayout from "./CenteredLayout";

function About() {
  return (
    <CenteredLayout>
      <div className="bg-white rounded shadow p-5 text-center">
        <h1 className="mb-4 fw-bold text-primary">About Event Calendar</h1>
        <p className="mb-4">
          <strong>Event Calendar</strong> is a modern, friendly tool designed to help you organize life’s important moments with ease.
          Whether you need to keep track of work meetings, personal appointments, or recurring reminders, this application makes it simple and enjoyable.
          You can click on any day in the calendar to quickly add or view events, personalize each event, and even set up flexible recurring schedules—daily, weekly, monthly, or something uniquely your own.
          All your events are saved securely in your browser, so your schedule is always there when you need it.
        </p>
        <p className="mb-4">
          We built Event Calendar to be intuitive and visually pleasing, making planning your days a delight.
          The interface is responsive and works beautifully on both desktop and mobile devices.
          Our goal is to help you stay organized and stress-free, no matter how busy life gets.
        </p>
        <Link to="/calendar" className="btn btn-primary mb-3">
          Try the Calendar Now
        </Link>
        <p className="text-muted" style={{ fontSize: "0.95em" }}>
          Made By <b>Kuruva HimaBindhu</b>
        </p>
      </div>
    </CenteredLayout>
  );
}

export default About;
