const express = require("express");
const router = express.Router();
const {
  getAppointments,
  addAppointment,
  deleteAppointment,
  updateAppointment 
} = require("../controllers/appointmentController");

router.get("/", getAppointments);
router.post("/", addAppointment);
router.delete("/:id", deleteAppointment);
router.put("/:id", updateAppointment);

module.exports = router;
