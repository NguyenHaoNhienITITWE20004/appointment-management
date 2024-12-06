const express = require('express');
const schedulesController = require('../controllers/schedulesController');
const router = express.Router();

// Routes for schedules
router.get('/', schedulesController.getAllSchedules); // Get all schedules
router.post('/', schedulesController.createSchedule); // Create a new schedule
router.put('/:id', schedulesController.updateSchedule); // Update an existing schedule
router.delete('/:id', schedulesController.deleteSchedule); // Delete a schedule

// Get schedules for a specific doctor and date
router.get('/doctor/:doctorId', schedulesController.getSchedulesByDoctorAndDate);

module.exports = router;
