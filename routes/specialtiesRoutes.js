const express = require('express');
const router = express.Router();
const specialtiesController = require('../controllers/specialtiesController');
const { upload, handleUploadErrors } = require('../middlewares/upload');

// Routes for specialties
router.post('/', upload.single('image'), handleUploadErrors, specialtiesController.addSpecialty);
router.post('/', specialtiesController.addSpecialty); // Add a new specialty
router.get('/', specialtiesController.getSpecialties); // Get all specialties
router.put('/:id', specialtiesController.updateSpecialty); // Update a specialty
router.delete('/:id', specialtiesController.deleteSpecialty); // Delete a specialty
// Get a single specialty by ID
router.get('/:id', specialtiesController.getSpecialtyById);

module.exports = router;
