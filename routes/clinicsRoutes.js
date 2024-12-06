const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Clinic = require('../models/Clinic'); // Sequelize model

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});
const upload = multer({ storage });

// Create clinic endpoint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, address, descriptionMarkdown, descriptionHTML } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    // Save clinic data to the database
    const newClinic = await Clinic.create({
      name,
      address,
      descriptionMarkdown,
      descriptionHTML,
      image: `/uploads/${req.file.filename}`, // Save file path
    });

    res.status(201).json({ success: true, data: newClinic });
  } catch (error) {
    console.error('Error saving clinic:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Get all clinics
router.get('/', async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.status(200).json({ success: true, data: clinics });
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Get featured clinics
router.get('/featured', async (req, res) => {
  try {
    // Example: Fetch top 5 clinics marked as "featured" (customize query as needed)
    const featuredClinics = await Clinic.findAll({
      limit: 5, // Fetch only the top 5 clinics
      order: [['createdAt', 'DESC']], // Order by latest created
    });

    res.status(200).json({ success: true, data: featuredClinics });
  } catch (error) {
    console.error('Error fetching featured clinics:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
