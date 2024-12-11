const Appointment = require("../models/Appointment");
const { v4: uuidv4 } = require("uuid");
//Get all appointments
exports.getAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find(); 
      res.json(appointments); 
    } catch (error) {
      res.status(500).send("Server Error");
    }
  };

//Add a new appointment
exports.addAppointment = async (req, res) => {
    const { title, startTime, endTime, date } = req.body;
  
    try {
      
      const newAppointment = new Appointment({
        id: uuidv4(), 
        title,
        startTime,
        endTime,
        date,
      });
  
      await newAppointment.save(); 
      res.json(newAppointment); 
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  };

//Delete an appointment
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const appointment = await Appointment.findOneAndDelete({ id }); 
      if (!appointment) {
        return res.status(404).send("Appointment not found");
      }
      res.json({ message: "Appointment Deleted" }); 
    } catch (error) {
      res.status(500).send("Error: " + error.message); 
    }
  };

//Update an appointment's times 
exports.updateAppointment = async (req, res) => {
    const { id } = req.params; 
    const { title, startTime, endTime, date } = req.body;
  
    try {
      const updatedAppointment = await Appointment.findOneAndUpdate(
        { id }, 
        { title, startTime, endTime, date },
        { new: true } 
      );
  
      if (!updatedAppointment) {
        return res.status(404).send("Appointment not found");
      }
  
      res.json(updatedAppointment); // Return the updated appointment
    } catch (error) {
      res.status(400).send("Error: " + error.message); // Handle errors
    }
  };
  
  