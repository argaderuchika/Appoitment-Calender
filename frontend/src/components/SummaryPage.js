import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../api/appointmentApi";
import "./SummaryPage.css"; 

const SummaryPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const res = await fetchAppointments();
      const sortedAppointments = res.data.sort((a, b) => {
        const aDate = new Date(`${a.date}T${a.startTime}`);
        const bDate = new Date(`${b.date}T${b.startTime}`);
        return aDate - bDate; 
      });
      setAppointments(sortedAppointments);
    };
    loadAppointments();
  }, []);

  return (
    <div className="summary-container">
      <h2 className="summary-title">Upcoming Appointments</h2>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <h3 className="appointment-title">{appt.title}</h3>
              <p className="appointment-time">
                {appt.date} {appt.startTime} - {appt.endTime}
              </p>
              {/* <button className="appointment-button">View Details</button> */}
            </div>
          ))
        ) : (
          <p className="no-appointments">No upcoming appointments</p>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
