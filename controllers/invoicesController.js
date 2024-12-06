const db = require('../config/db');

// Get all invoices
exports.getAllInvoices = (req, res) => {
  const query = 'SELECT * FROM invoices';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create an invoice
exports.createInvoice = (req, res) => {
  const { doctorId, patientId, specialtyId, totalCost } = req.body;
  const query = `INSERT INTO invoices (doctorId, patientId, specialtyId, totalCost, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`;
  db.query(query, [doctorId, patientId, specialtyId, totalCost], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Invoice created successfully' });
  });
};
