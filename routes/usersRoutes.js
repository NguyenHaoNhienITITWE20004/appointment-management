const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const { upload, handleUploadErrors } = require('../middlewares/upload');

// Role mappings (string to number) for consistency with the backend
const roleMapping = {
  Admin: 1,
  Doctor: 2,
  Patient: 3,
};

// Middleware to validate role
const validateRole = (req, res, next) => {
  const { role } = req.body;
  if (role && !roleMapping[role]) {
    return res.status(400).json({ success: false, message: 'Invalid role. Must be Admin, Doctor, or Patient.' });
  }
  next();
};

// Helper function to wrap async controllers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Route to get all users
router.get('/', asyncHandler(getAllUsers));

// Route to create a new user
router.post(
  '/',
  validateRole,           // Validate the role before creating the user
  upload.single('image'),  // Handle image uploads (multer single file upload)
  handleUploadErrors,      // Middleware for handling upload errors
  asyncHandler(createUser) // Create user in the database
);

// Route to update an existing user by ID
router.put(
  '/:id',
  validateRole,           // Validate the role before updating the user
  upload.single('image'),  // Handle image uploads (multer single file upload)
  handleUploadErrors,      // Middleware for handling upload errors
  asyncHandler(updateUser) // Update user in the database
);

// Route to delete a user by ID
router.delete('/:id', asyncHandler(deleteUser));

module.exports = router;
