import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  fetchAppointments,
  addAppointment,
  deleteAppointment,
  updateAppointment,
} from "../api/appointmentApi";

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await fetchAppointments();
      setEvents(
        res.data.map((appt) => ({
          id: appt.id,
          title: appt.title,
          start: `${appt.date}T${appt.startTime}`,
          end: `${appt.date}T${appt.endTime}`,
        }))
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleEventDrop = async (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      startTime: format(info.event.start, "HH:mm"),
      endTime: format(info.event.end, "HH:mm"),
      date: format(info.event.start, "yyyy-MM-dd"),
    };

    try {
      await updateAppointment(info.event.id, updatedEvent);
      loadAppointments();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleSelectSlot = async (info) => {
    const title = prompt("Enter Appointment Title:");
    if (title) {
      const newAppointment = {
        title,
        date: format(info.start, "yyyy-MM-dd"),
        startTime: format(info.start, "HH:mm"),
        endTime: format(info.end, "HH:mm"),
      };

      try {
        await addAppointment(newAppointment);
        loadAppointments();
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (confirmed) {
      try {
        await deleteAppointment(id);
        loadAppointments();
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        eventDrop={handleEventDrop}
        select={handleSelectSlot}
        eventClick={(info) => handleDelete(info.event.id)}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "09:00",
          endTime: "17:00",
        }}
        validRange={{
          start: "2024-01-01",
          end: "2024-12-31",
        }}
        eventConstraints={{
          start: "09:00",
          end: "17:00",
        }}
        selectAllow={(selectInfo) => {
          const startHour = selectInfo.start.getHours();
          return startHour >= 9 && startHour < 17;
        }}
      />
    </div>
  );
};

export default MyCalendar;
