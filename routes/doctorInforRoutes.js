const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctorInforController');

// Route for all doctor information
router
  .route('/')
  .get(controller.getAll) // Get all doctor information
  .post(controller.create); // Create new doctor information


// Route for featured doctors
router.get('/featured', controller.getFeatured);

// Route for available times of a doctor based on date
router.get('/:id/available-times', controller.getAvailableTimes);
router.get('/:id', controller.getDoctorById);
router.post('/', controller.createDoctorInfor);

module.exports = router;
