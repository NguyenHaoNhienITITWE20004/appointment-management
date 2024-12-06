const db = require('../config/db');

// Get all histories
exports.getAllHistories = (req, res) => {
  const query = 'SELECT * FROM histories';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a history entry
exports.createHistory = (req, res) => {
  const { patientId, doctorId, description } = req.body;
  const query = `INSERT INTO histories (patientId, doctorId, description, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())`;
  db.query(query, [patientId, doctorId, description], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'History entry created successfully' });
  });
};
