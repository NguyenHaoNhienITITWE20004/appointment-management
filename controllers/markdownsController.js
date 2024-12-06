const db = require('../config/db');

// Get all markdown entries
exports.getAllMarkdowns = (req, res) => {
  const query = 'SELECT * FROM markdowns';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a markdown entry
exports.createMarkdown = (req, res) => {
  const { contentHTML, contentMarkdown, description, doctorId, specialtyId, clinicId } = req.body;
  const query = `INSERT INTO markdowns (contentHTML, contentMarkdown, description, doctorId, specialtyId, clinicId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
  db.query(query, [contentHTML, contentMarkdown, description, doctorId, specialtyId, clinicId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Markdown entry created successfully' });
  });
};
