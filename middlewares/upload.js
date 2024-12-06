// upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists dynamically
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the dynamically created uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (file.mimetype.startsWith('image/') && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (PNG, JPG, JPEG, GIF).'), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // Other errors (e.g., file type validation)
    res.status(400).json({ success: false, message: err.message });
  } else {
    next();
  }
};

module.exports = { upload, handleUploadErrors };
