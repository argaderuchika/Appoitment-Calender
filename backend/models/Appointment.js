const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
