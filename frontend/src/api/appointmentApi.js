import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

// Fetch all appointments
export const fetchAppointments = () => axios.get(API_URL);

// Add a new appointment
export const addAppointment = (data) => axios.post(API_URL, data);

// Delete an appointment
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);

// Update an existing appointment
export const updateAppointment = async (id, updatedData) => {
    console.log("Request to update:", id, updatedData);
    return await axios.put(`${API_URL}/${id}`, updatedData);
};

