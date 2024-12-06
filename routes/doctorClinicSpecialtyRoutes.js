const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model stores doctors
const DoctorClinicSpecialty = require('../models/DoctorClinicSpecialty'); // Relation model

// Get all doctors
router.get('/', async (req, res) => {
  try {
    // Fetch all doctors based on their roleId or other criteria
    const doctors = await User.findAll({ where: { roleId: 'Doctor' } });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Additional endpoints for specialty-clinic-doctor relationships (if needed) can go here

module.exports = router;
